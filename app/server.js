let express = require("express");
const session = require('express-session');
const methodOverride = require('method-override')
const path = require("path");

require("dotenv").config({ path: ".env" });

let routes = require("./routes/index");

let app = express();
let port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use("/", routes);
app.listen(port, function () {
  console.log("Servidor rodando com express na porta", port);
});
