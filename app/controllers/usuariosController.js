const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnection = require("../../config/dbConnection");
const {
  getUsuarios,
  adicionarUsuario,
  updateUsuario,
  deleteUsuario,
  findUsuario,
} = require("../models/usuariosModel");

const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

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

module.exports.getUsuarios = async (req, res) => {
  const dbConn = dbConnection();
  try {
    const usuarios = await getUsuarios(dbConn);
    res.render("./tela_usuario/tela_usuarios.ejs", {
      usuarios: usuarios,
      selectedClient: "",
      usuario: req.user,
    });
  } catch (err) {
    res.status(400).send({ "err": err.message });
  }
};

module.exports.getUsuarioById = async (req, res) => {
  const dbConn = dbConnection();
  try {
    const idUsuario = req.params.id;
    const usuarios = await getUsuarios(dbConn);
    const usuarioById = usuarios.find(
      (usuario) => usuario.idUsuario == idUsuario
    );
    res.status(200).send({ "Usuario": usuarioById });
  } catch (err) {
    res.status(400).send({ "err": err.message });
  }
};

module.exports.postUsuario = async (req, res) => {
  const { nome, cpf, telefone, email, senha, dataNasc, tipo } = req.body;

  try {
    const dbConn = dbConnection();
    const salt = await bcrypt.genSalt(Number(secret.SALT_ROUNDS));
    const senhaEncriptada = await bcrypt.hash(senha, salt);

    const usuario = await adicionarUsuario(
      dbConn,
      nome,
      cpf,
      telefone,
      email,
      senhaEncriptada,
      dataNasc,
      tipo
    );

    res
      .status(200)
      .send({ message: "Usuário adicionado com sucesso!", usuario });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

module.exports.putUsuario = async (req, res) => {
  const { nome, cpf, telefone, email, senha, dataNasc, tipo } = req.body;
  const idUsuario = req.params.idUsuario;

  const secret = await getSecret();

  try {
    const dbConn = dbConnection();
    let senhaEncriptada;

    if (senha) {
      const salt = await bcrypt.genSalt(Number(secret.SALT_ROUNDS));
      senhaEncriptada = await bcrypt.hash(senha, salt);
    }

    const usuario = await updateUsuario(
      dbConn,
      idUsuario,
      nome,
      cpf,
      telefone,
      email,
      senhaEncriptada,
      dataNasc,
      tipo
    );

    res
      .status(200)
      .send({ message: "Usuário atualizado com sucesso!", usuario });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

module.exports.telaPerfil = async (req, res) => {
  const dbConn = dbConnection();
  try {
    const idUsuario = req.params.idUsuario;

    console.log(req.user);

    const usuarios = await getUsuarios(dbConn);
    const usuarioById = usuarios.find(
      (usuario) => usuario.idUsuario == idUsuario
    );
    res.render("./tela_perfil/tela_perfil.ejs", {
      usuario: usuarioById,
    });
  } catch (err) {
    res.status(400).send({ "err": err.message });
  }
};

module.exports.login = async (req, res) => {
  const { nome, senha } = req.body;

  const secret = await getSecret();


  try {
    const dbConn = dbConnection();
    const usuario = await findUsuario(dbConn, nome, senha);

    if (!usuario) {
      return res.render("telas_logins/tela_login", {
        error: "Usuario ou senha não encontrado",
      });
    }

    const token = jwt.sign(
      { idUsuario: usuario.idUsuario, nome: usuario.nome, tipo: usuario.tipo },
      secret.JWT_SECRET,
      { expiresIn: "1d" }
    );

    req.session.token = token;

    const returnTo = req.session.returnTo || "/itens";
    delete req.session.returnTo;
    res.redirect(returnTo);
  } catch (err) {
    console.log(err);
    return res.render("telas_logins/tela_login", {
      error: "Usuario ou senha não encontrado",
    });
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Erro ao encerrar a sessão." });
    }
    res.clearCookie("connect.sid"); // Limpa o cookie de sessão
    res.status(200).send({ message: "Logout realizado com sucesso." });
  });
};

module.exports.deleteUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const dbConn = dbConnection();
    const result = await deleteUsuario(dbConn, idUsuario);
    res.status(200).send({ "result": result });
  } catch (err) {
    res.status(400).send({ "err": err.message });
  }
};
