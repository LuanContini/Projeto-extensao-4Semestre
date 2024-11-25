const express = require("express");

//ITENS
const itens = require("../controllers/itensController");

//CONTRATOS
const {
  contratos,
  adicionarContrato,
} = require("../controllers/contratosController");

//CLIENTES
const {
  clientes,
  adicionarCliente,
} = require("../controllers/clientesControllers");

//USUARIOS
const {
  usuarios,
  adicionarUsuario,
} = require("../controllers/usuariosController");

//MANUTENCAO
const { manutencao } = require("../controllers/manutencaoController");

//RESERVA
const { reserva } = require("../controllers/reservaController");

const router = express.Router();

router.get("/itens", itens.getItens);

module.exports = {
  //ITENS
  // itens: (app) => {
  //   app.get("/itens", function (req, res) {
  //     console.log("[Route itens]");

  //     itens(app, req, res);
  //   });
  // },

  //CONTRATOS
  contratos: (app) => {
    app.get("/contratos", function (req, res) {
      console.log("[Route itens]");

      contratos(app, req, res);
    });
  },
  adicionarContrato: (app) => {
    app.post("/adicionarContrato", function (req, res) {
      console.log("[Route Adicionar Contrato]");

      adicionarContrato(app, req, res);
    });
  },
  reserva: (app) => {
    app.get("/reserva", function (req, res) {
      console.log("[Route Reservas]");

      reserva(app, req, res);
    });
  },

  //CLIENTES
  clientes: (app) => {
    app.get("/clientes", function (req, res) {
      console.log("[Route itens]");

      clientes(app, req, res);
    });
  },
  adicionarCliente: (app) => {
    app.post("/adicionarCliente", function (req, res) {
      console.log("[Route Adicionar Cliente]");

      adicionarCliente(app, req, res);
    });
  },

  //MANUTENCAO
  manutencao: (app) => {
    app.get("/manutencao", function (req, res) {
      console.log("[Route Manutenção]");

      manutencao(app, req, res);
    });
  },

  //USUARIOS
  usuarios: (app) => {
    app.get("/usuarios", function (req, res) {
      console.log("[Route usuarios]");

      usuarios(app, req, res);
    });
  },
  adicionarUsuario: (app) => {
    app.post("/adicionarUsuario", function (req, res) {
      console.log("[Route Adicionar Usuario]");

      adicionarUsuario(app, req, res);
    });
  },
};

module.exports = router;

