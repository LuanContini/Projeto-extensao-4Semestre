let express = require("express");
const session = require('express-session');

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
app.set("views", "./views");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);
app.listen(port, function () {
  console.log("Servidor rodando com express na porta", port);
});
