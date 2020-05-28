const throng = require("throng");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const hljs = require("highlight.js");
const md = require("markdown-it")({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
const { get: getTable } = require("./utils/table");
const { appendQuery } = require("./utils/query");
const rollbar = require("./commons/rollbar");
const session = require("express-session");
const redis = require("./commons/redis");
const RedisStore = require("connect-redis")(session);
let threadID;
throng((id) => {
  threadID = id;
  const app = express();
  const tableSize = 20;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      secret: "widergysecret",
      saveUninitialized: true,
      resave: false,
    })
  );
  app.use((...args) => {
    const user = args[0].session && args[0].session.user;
    console.log(
      "threadID:",
      threadID,
      ", user:",
      args[0].session && args[0].session.user
    );
    if (user) rollbar.log(`${user} is accessing to ${args[0].path}`);
    args[2]();
  });

  app.get("/style.css", (req, res) =>
    res.sendFile(`${__dirname}/md/style.css`)
  );
  app.get("/favicon.png", (req, res) =>
    res.sendFile(`${__dirname}/favicon.png`)
  );
  app.get("/favicon.ico", (req, res) =>
    res.sendFile(`${__dirname}/favicon.png`)
  );
  app.get("/login.css", (req, res) => res.sendFile(`${__dirname}/login.css`));

  app.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    if (req.session.loggedIn) return res.redirect("/");
    if (!user || !pass) return res.redirect(req.path);
    const [User] = (await redis.Find("users", { user, pass })) || [];
    if (User) {
      req.session.loggedIn = true;
      req.session.user = user;
      req.session.pass = pass;
      res.redirect(req.session.lastPath);
    } else res.redirect(req.path);
  });
  app.get("/logout", async (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    req.session.user = null;
    res.redirect("/login");
  });
  app.post("/user", async (req, res) => {
    const { user, pass } = req.body;
    const { secret } = req.headers;
    if (!user || !pass) return res.status(400).send("Fill user and pass");

    if (secret !== process.env.SECRET)
      return res.status(401).send("Not Authorized");
    res.status(200).json({ result: await redis.Add("users", { user, pass }) });
  });

  const mockFiles = fs.readdirSync(`${__dirname}/mock`);
  for (let k = 0; k < mockFiles.length; k += 1) {
    const file = mockFiles[k];
    const name = file.substr(0, file.length - 5);
    const json = JSON.parse(
      fs.readFileSync(`${__dirname}/mock/${file}`).toString()
    );
    if (!json.method) {
      rollbar.error(`Didn't found 'method' for mock on '${name}'`);
      continue;
    }
    if (!json.path) {
      rollbar.error(`Didn't found 'path' for mock on '${name}'`);
      continue;
    }
    app[json.method](`/mock${json.path}`, (req, res) =>
      res.json(json.response)
    );
  }

  app.use((req, res, next) => {
    if (req.path.startsWith("/mock"))
      return res.status(404).send("mock not found");
    if (req.path !== "/login" && !req.session.loggedIn) {
      req.session.lastPath = req.path;
      return res.redirect("/login");
    }
    if (req.path === "/login" && req.session.loggedIn) return res.redirect("/");
    next();
  });

  app.get("/", (req, res) =>
    res.status(200).send(fs.readFileSync(`${__dirname}/index.html`).toString())
  );

  const define = (utility) => {
    const keys = Object.keys(utility);
    for (let k = 0; k < keys.length; k += 1) {
      const key = keys[k];
      app.get(`/${key}`, (req, res) => {
        res.status(200).sendFile(`${__dirname}/md/${key}.html`);
      });
      utility[key].forEach((t) =>
        app.get(`/${key}/${t}`, (req, res) => {
          const transaction = req.query.transaction || "";
          let tableIndex = req.query.tableIndex || 0;
          tableIndex = parseInt(tableIndex, 10);
          tableIndex = Math.max(0, tableIndex);
          res.status(200).send(
            `<html lang = 'es'>
                 <head>
                   <title>${key} - ${t}</title>
                   <link rel='shortcut icon' href='/favicon.png'>
                   <link href="https://fonts.googleapis.com/css?family=Jost&display=swap" rel="stylesheet">
                   <style>
                     body {
                       background-color: #cdd;
                       font-family: "Jost";
                     }
                     ${fs.readFileSync(`markdown.css`).toString()}
                     ${fs.readFileSync(`hsjs.css`).toString()}
                   </style>
                 </head>
                 <body>
                 ${md.render(
                   `- [Volver](/${key})
  ${fs.readFileSync(`md/${key}/${t}.md`).toString()}
  ${
    (fs.existsSync(`md/${key}/${t}.json`) &&
      `Transacción: **${transaction}**\n\n${getTable(
        JSON.parse(fs.readFileSync(`md/${key}/${t}.json`).toString())[
          transaction
        ],
        tableSize,
        tableIndex
      )}
  [Anterior](${appendQuery(req._parsedUrl.search, {
    tableIndex: tableIndex - 1,
  })}) - [Siguiente](${appendQuery(req._parsedUrl.search, {
        tableIndex: tableIndex + 1,
      })})`) ||
    ""
  }`
                 )}
                 </body>
                 </html>`
          );
        })
      );
    }
  };
  const t = {
    camuzzi: ["saldo", "tarifa-social", "facturas"],
    edenor: ["saldo", "consumo", "reclamos", "recarga-mide"],
    edelap: ["saldo", "descarga-factura", "reclamo-tecnico"],
    eden: ["saldo", "ultima-factura"],
    edes: [/*"whatsapp", */ "saldo", "reclamo", "nises", "ultima-factura"],
    "notifications-mailer": [
      "emails",
      "verifiedEmails",
      "blockedEmails",
      "blockingConfigs",
      "templates",
      "deliveries",
      "model-template",
      "token",
    ],
  };
  define(t);

  app.get("/login", (req, res) => res.sendFile(`${__dirname}/login.html`));

  app.listen(process.env.PORT || 1500);
});
