const mysql = require("mysql2");

require("dotenv").config({ path: "../.env" });

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secret_name = "Projeto-extensao-4Semestre/.env";

const client = new SecretsManagerClient({
  region: "us-east-2",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

const secret = response.SecretString;



const host = secret.HOST;
const database = secret.DB;
const user = secret.USUARIO;
const password = secret.SENHA;

module.exports = () => {
  return (dbConn = mysql.createPool({
    connectionLimit: 50,
    host: host,
    user: user,
    password: password,
    database: database,
  }));
};
