const bcrypt = require("bcrypt");

const dbConnection = require("../../config/dbConnection");

const { getUsuarios, adicionarUsuario, updateUsuario, deleteUsuario } = require("../models/usuariosModel");

require("dotenv").config({ path: ".env" });

module.exports.getUsuarios = async (req, res) => {
  const dbConn = dbConnection();

 try{
  const usuarios = await getUsuarios(dbConn);

  res.status(200).send({"usuarios": usuarios});
 } catch (err){
  res.status(400).send({"err": err});
 }
};

module.exports.postUsuario = async (req, res) => {
  const { nome, cpf, telefone, email, senha, nasc, tipo } = req.params;

  try {
    const dbConn = dbConnection();

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

    const senhaEncriptada = await bcrypt.hash(senha, salt);

    const usuario = await adicionarUsuario(
      dbConn,
      nome,
      cpf,
      telefone,
      email,
      senhaEncriptada,
      nasc,
      tipo
    );

    res.status(200).send({ message: "Usuário adicionado com sucesso!", usuario });

  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

module.exports.putUsuario = async (req, res) => {
  const { idUsuario, nome, cpf, telefone, email, senha, nasc, tipo } = req.params;
  
  try{
    const dbConn = dbConnection();

    const result = await updateUsuario(dbConn, idUsuario,
      nome,
      cpf,
      telefone,
      email,
      senha,
      nasc,
      tipo);

      res.status(200).send({"Sucesso": result});
  } catch (err) {
    res.status.send({"err": err});
  }
};

module.exports.deleteUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try{
    const dbConn = dbConnection();

    const result = await deleteUsuario(dbConn, idUsuario);

    res.status(200).send({"result": result});
  } catch (err) {
    res.status(400).send({"err": err});
  }
}
