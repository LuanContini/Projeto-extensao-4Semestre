const dbConnection = require("../../config/dbConnection");

const { getClientes, adicionarCliente } = require("../models/clientesModel");

module.exports.clientes = (app, req, res) => {
  const dbConn = dbConnection();

  getClientes(dbConn, (error, clientes) => {
    if (error) {
      console.log("erro ", error.message);
    }
    console.log(clientes);
    res.render("clientesView.ejs", { clientes: clientes });
  });
};

module.exports.adicionarCliente = (app, req, res) => {
  const { nome, cpf, telefone, email } = req.body;

  //checa se campos estão preenchidos
  const checaCampos = !nome || !cpf || !telefone || !email;

  if (!checaCampos) {
    const dbConn = dbConnection();

    adicionarCliente(dbConn, nome, cpf, telefone, email, (error, result) => {
      if (error) {
        console.log("Error, ", error.message);
      } else {
        console.log(result);
      }
      res.redirect("/clientes");
    });
  }
};
