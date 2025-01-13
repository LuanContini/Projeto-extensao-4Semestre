const express = require("express");
const session = require('express-session');
const methodOverride = require('method-override');
const path = require("path");
const https = require('https');
const fs = require('fs');

require("dotenv").config({ path: ".env" });

let routes = require("./routes/index");

let app = express();
let port = process.env.PORT || 3000;

// Carregar o certificado e a chave privada
const options = {
  key: fs.readFileSync(path.join(__dirname, '../certs/privatekey.pem')), // Caminho para a chave privada
  cert: fs.readFileSync(path.join(__dirname, '../certs/certificate.pem')) // Caminho para o certificado
};

// Configuração da sessão
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Para desenvolvimento, defina como false
}));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Definir as rotas
app.use("/", routes);

// Criar o servidor HTTPS
https.createServer(options, app).listen(443, function () {
  console.log("Servidor HTTPS rodando na porta 443");
});

// (Opcional) Criar um servidor HTTP que redireciona para HTTPS
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80, () => {
  console.log("Servidor HTTP rodando na porta 80 e redirecionando para HTTPS");
});