const express = require("express");
const session = require('express-session');
const methodOverride = require('method-override');
const path = require("path");
const https = require('https');
const fs = require('fs');
require("dotenv").config({ path: ".env" });

async function getSecret() {
  return { 
      JWT_SECRET: process.env.JWT_SECRET 
  };
}

async function startServer() {
  const secret = await getSecret();
  const routes = require("./routes/index"); 
  const app = express();
  const jwtSecret = secret.JWT_SECRET; 

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/certificate.pem'))
  };

  app.use(session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
  }));

  app.set("view engine", "ejs");
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  app.use("/", routes);

  const httpsServer = https.createServer(options, app);

  httpsServer.listen(443, () => {
    console.log("Servidor HTTPS rodando na porta 443");
  });

  httpsServer.on('error', (err) => {
    console.error('Erro no servidor HTTPS:', err);
  });

  const http = require('http');
  const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
  });

  httpServer.listen(80, () => {
    console.log("Servidor HTTP rodando na porta 80 e redirecionando para HTTPS");
  });

  httpServer.on('error', (err) => {
    console.error('Erro no servidor HTTP:', err);
  });
}

startServer().catch(error => {
  console.error("Erro ao iniciar o servidor:", error);
});