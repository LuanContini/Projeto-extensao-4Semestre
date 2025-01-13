const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

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
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
    return JSON.parse(response.SecretString); // Retorna o segredo como um objeto
  } catch (error) {
    console.error("Erro ao obter o segredo:", error);
    throw error;
  }
}

module.exports = () => async function createDbConnection() {
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
