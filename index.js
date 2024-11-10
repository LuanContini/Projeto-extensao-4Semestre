const app = require("./config/server");
const routes = require("./app/routes/routes");

//ITENS
routes.itens(app);

//CONTRATOS
routes.contratos(app);
routes.adicionarContrato(app);

//CLIENTES
routes.clientes(app);
routes.adicionarCliente(app);

//MANUTENCAO
routes.manutencao(app);

//USUARIOS
routes.usuarios(app);
routes.adicionarUsuario(app);
