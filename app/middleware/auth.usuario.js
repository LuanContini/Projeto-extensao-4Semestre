const jwt = require('jsonwebtoken');

require("dotenv").config({ path: ".env" });

// const {
//     SecretsManagerClient,
//     GetSecretValueCommand,
//   } = require("@aws-sdk/client-secrets-manager");
  
//   const secret_name = "Projeto-extensao-4Semestre/.env";
  
//   const client = new SecretsManagerClient({
//     region: "us-east-2",
//   });
  
//   // Função assíncrona para obter o segredo
//   async function getSecret() {
//     let response;
//     try {
//       response = await client.send(
//         new GetSecretValueCommand({
//           SecretId: secret_name,
//           VersionStage: "AWSCURRENT",
//         })
//       );
//       return JSON.parse(response.SecretString); // Retorna o segredo como um objeto
//     } catch (error) {
//       console.error("Erro ao obter o segredo:", error);
//       throw error;
//     }
//   }

async function getSecret() {
  return { 
      SALT_ROUNDS: process.env.SALT_ROUNDS,
      JWT_SECRET: process.env.JWT_SECRET,
  }
}

module.exports.checarAuthComum = async (req, res, next) => {

    const secret = await getSecret();

    const token = req.session.token;
    
    if (!token) {
        req.session.returnTo = req.originalUrl; 
        return res.render('telas_logins/tela_login', {error: null});
    }

    jwt.verify(token, secret.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        req.user = decoded;
        next();
    });
};

module.exports.checarAuthAdmin = async (req, res, next) => {

    const secret = await getSecret();

    const token = req.session.token;

    if (!token) {
        req.session.returnTo = req.originalUrl;
        return res.render('telas_logins/tela_login', {error: null});
    }

    jwt.verify(token, secret.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        if (decoded.tipo === 'Administrador') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: "Usuário não tem permissão" });
        }
    });
};
