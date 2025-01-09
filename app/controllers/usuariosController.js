const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnection = require("../../config/dbConnection");

const { getUsuarios, adicionarUsuario, updateUsuario, deleteUsuario, findUsuario } = require("../models/usuariosModel");

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

module.exports.getUsuarioById = async (req, res) => {
  const dbConn = dbConnection();

  try{

    const idUsuario = req.params.id;

    const usuario = await getUsuarios(dbConn);

    const usuarioById = usuario.find((usuario) => usuario.idUsuario == idUsuario);

    res.status(200).send({"Usuario": usuarioById});

  } catch (err) {

    res.status(400).send({"err": err});
  }
}

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

module.exports.login = async (req, res) => {
  const {nome, senha} = req.params;

  try{

    const dbConn = dbConnection();
    const usuario = await findUsuario(dbConn, nome, senha);

    const token = jwt.sign(
      { idUsuario: usuario.idUsuario, nome: usuario.nome, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    req.session.token = token;


    res.status(200).send({"token": token});

  }catch(err) {
    res.status(400).send({"err": err.message});
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ message: 'Erro ao encerrar a sessão.' });
    }
    res.clearCookie('connect.sid'); // Limpa o cookie de sessão
    res.status(200).send({ message: 'Logout realizado com sucesso.' });
  });
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
