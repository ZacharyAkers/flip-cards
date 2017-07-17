const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const path = require("path");
const router = require("./routes/router.js");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(session({
  secret: "asfibaiudiuab",
  resave: false,
  saveUninitialized: false
}));

app.set('port', (process.env.PORT || 3000));
app.use(router);

if (require.main === module){
  app.listen(app.get('port'), function () {
    console.log("server running on localhost:" + app.get('port'));
  });
}

module.exports = app;