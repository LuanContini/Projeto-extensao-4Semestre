const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secret_name = "Projeto-extensao-4Semestre/.env";

const client = new SecretsManagerClient({
  region: "us-east-2",
});

async function getSecret() {
  let response;
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );
    return JSON.parse(response.SecretString); 
  } catch (error) {
    console.error("Erro ao obter o segredo:", error);
    throw error;
  }
}

// Função para criar a conexão com o banco de dados
async function createDbConnection() {
  const secret = await getSecret(); 

  const host = secret.HOST;
  const database = secret.DB;
  const user = secret.USUARIO;
  const password = secret.SENHA;

  return mysql.createPool({
    connectionLimit: 50,
    host: host,
    user: user,
    password: password,
    database: database,
  });
}

module.exports = createDbConnection;