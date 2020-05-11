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
const session = require("express-session");
const redis = require("./commons/redis");
const RedisStore = require("connect-redis")(session);
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

app.get("/style.css", (req, res) => res.sendFile(`${__dirname}/md/style.css`));
app.get("/favicon.png", (req, res) => res.sendFile(`${__dirname}/favicon.png`));
app.get("/favicon.ico", (req, res) => res.sendFile(`${__dirname}/favicon.png`));
app.get("/login.css", (req, res) => res.sendFile(`${__dirname}/login.css`));

app.post("/login", async (req, res) => {
  const { user, pass } = req.body;
  console.log("req.body", req.body);
  if (req.session.loggedIn) return res.redirect("/");
  if (!user || !pass) return res.redirect(req.path);
  const [User] = (await redis.Find("users", { user, pass })) || [];
  if (User) {
    req.session.loggedIn = true;
    res.redirect(req.session.lastPath);
  } else res.redirect(req.path);
});
app.get("/logout", async (req, res) => {
  req.session.loggedIn = false;
  res.redirect("/login");
});
app.post("/user", async (req, res) => {
  const { user, pass } = req.body;
  console.log("req.body", req.body);
  const { secret } = req.headers;
  if (!user || !pass) return res.status(400).send("Fill user and pass");

  if (secret !== process.env.SECRET)
    return res.status(401).send("Not Authorized");
  res.status(200).json({ result: await redis.Add("users", { user, pass }) });
});

app.use((req, res, next) => {
  console.log("req.path", req.path);
  if (req.path !== "/login" && !req.session.loggedIn) {
    req.session.lastPath = req.path;
    return res.redirect("/login");
  }
  if (req.path === "/login" && req.session.loggedIn) return res.redirect("/");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send(fs.readFileSync(`${__dirname}/index.html`).toString());
});

const define = (utility) => {
  const keys = Object.keys(utility);
  for (let k = 0; k < keys.length; k += 1) {
    const key = keys[k];
    app.get(`/${key}`, (req, res) => {
      res.status(200).sendFile(`${__dirname}/md/${key}.html`);
    });
    utility[key].forEach(
      (t) =>
        console.log(key, t) ||
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
  camuzzi: ["saldo", "tarifa-social"],
  edenor: ["saldo", "consumo", "reclamos", "recarga-mide"],
  edelap: ["saldo", "descarga-factura", "reclamo-tecnico"],
  eden: ["saldo", "ultima-factura"],
  edes: [/*"whatsapp", */ "saldo", "reclamo", "nises", "ultima-factura"],
  "notifications-mailer": [
    "emails",
    "templates",
    "deliveries",
    "model-template",
    "token",
  ],
};
define(t);

app.get("/login", (req, res) => res.sendFile(`${__dirname}/login.html`));

app.listen(process.env.PORT || 1500);
