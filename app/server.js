const express = require("express");
const session = require('express-session');
const methodOverride = require('method-override');
const path = require("path");
const https = require('https');
const fs = require('fs');
require("dotenv").config({ path: ".env" });

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secret_name = "Projeto-extensao-4Semestre/.env";

const client = new SecretsManagerClient({
  region: "us-east-2",
});

// Função assíncrona para obter o segredo
async function getSecret() {
  let response;
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );
    return JSON.parse(response.SecretString); // Retorna o segredo como um objeto
  } catch (error) {
    console.error("Erro ao obter o segredo:", error);
    throw error;
  }
}

// Função principal para iniciar o servidor
async function startServer() {
  const secret = await getSecret(); // Chama a função assíncrona para obter o segredo
  let routes = require("./routes/index");
  let app = express();
  const jwtSecret = secret.JWT_SECRET;

  // Carregar o certificado e a chave privada
  const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/certificate.pem'))
  };

  // Configuração da sessão
  app.use(session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Para desenvolvimento, defina como false
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

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Definir as rotas
  app.use("/", routes);

  // Criar o servidor HTTPS
  https.createServer(options, app).listen(443, () => {
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
}

// Iniciar o servidor
startServer().catch(error => {
  console.error("Erro ao iniciar o servidor:", error);
});