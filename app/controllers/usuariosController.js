const bcrypt = require("bcrypt");

const dbConnection = require("../../config/dbConnection");

const { getUsuarios } = require("../models/usuariosModel");

require("dotenv").config({ path: ".env" });

module.exports.getUsuarios = (app, req, res) => {
  const dbConn = dbConnection();

  getUsuarios(dbConn, (error, usuarios) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(usuarios);
    res.render("usuariosView.ejs", { usuarios: usuarios });
  });
};

module.exports.adicionarUsuario = (req, res) => {
  const { nome, cpf, telefone, email, senha, nasc, tipo } = req.body;

  const checaCampos =
    !nome || !cpf || !telefone || !email || !senha || !nasc || !tipo;

  if (!checaCampos) {
    const hashSenha = async (senha) => {
      try {
        const saltRounds = process.env.SALT_ROUNDS;

        // Gerar o hash da senha
        const hashedPassword = await bcrypt.hash(senha, saltRounds);
        return hashedPassword;
      } catch (err) {
        console.error("Erro ao criptografar a senha", err);
      }
    };

    adicionarUsuario(
      dbConn,
      nome,
      cpf,
      telefone,
      email,
      hashSenha,
      nasc,
      tipo,
      (error, result) => {
        if (error) {
          console.log("Error, ", error.message);
        } else {
          console.log(result);
        }
        res.redirect("/usuarios");
      }
    );
  }
};
