const express = require("express");
const fs = require("fs");
const hljs = require('highlight.js')
const { Converter } = require("showdown");
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
        hljs.highlight(lang, str, true).value +
        '</code></pre>';
      } catch (__) {}
    }
 
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
const app = express();
const converter = new Converter();

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
        fs.readFileSync(`${__dirname}/index.html`).toString()
    );
});

app.get("/camuzzi", (req, res) => {
  res
    .status(200)
    .send(
      md.render(
        fs.readFileSync(`${__dirname}/md/camuzzi.md`).toString()
      )
    );
});

app.listen(process.env.NODE_ENV || 1500);
