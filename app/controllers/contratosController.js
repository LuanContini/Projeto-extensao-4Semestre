const dbConnection = require("../../config/dbConnection");

const { getContratosModel, putContrato, deleteContrato, adicionarContrato, getContratoStatus } = require("../models/contratosModel");

module.exports.getContratos = async (req, res) => {
  const dbConn = dbConnection();
  console.log("Entrou no controller");

  try {
    const contratos = await getContratosModel(dbConn); // Espera a função retornar os contratos
    //console.log("Contratos:", contratos);
    res.render("./telas_contrato/tela_contrato_inicial.ejs", {
      contratos: contratos,
      selectedClient: "",
      usuario: req.user,
    });
  } catch (err) {
    console.error("Erro ao buscar contratos:", err);
    return res.status(400).send({ err });
  }
};

module.exports.getContratoStatus = async (req, res) => {
  const dbConn = dbConnection();
  
  try {
      const contratosStatus = await getContratoStatus(dbConn);
      console.log("Contratos por status:", contratosStatus);
      
      // Achar os contratos por status
      const andamento = contratosStatus.find(item => item.status === 'Andamento')?.totalContratos || 0;
      const pendente = contratosStatus.find(item => item.status === 'Pendente')?.totalContratos || 0;
      const concluido = contratosStatus.find(item => item.status === 'Concluído')?.totalContratos || 0;

      // Calcular o lucro previsto
      const lucroPrevisto = contratosStatus.reduce((acc, item) => acc + item.totalContratos, 0);
      console.log("Dados passados para a view:", { andamento, pendente, concluido, lucroPrevisto, total: andamento + pendente + concluido });

      // Passar os valores para a view
      res.render("./telas_contrato/tela_contrato_inicial.ejs", {
        andamento: andamento,
        pendente: pendente,
        concluido: concluido,
        lucroPrevisto: lucroPrevisto,
        total: andamento + pendente + concluido,  // Total de contratos
        usuario: req.user,
      });
  } catch (err) {
    console.error("Erro ao buscar contratos por status:", err);
    return res.status(400).send({ err });
  }
};




module.exports.getContratoById = async (req, res) => {
  const dbConn = dbConnection();

  try{
    const idContrato = req.params.id;

    const contrato = await getContratoById(dbConn, idContrato);

    res.status(200).send({ 'contrato': contrato});
  }catch (err) {
    res.status(400).send({ 'err': err});
  }
};

module.exports.postContrato = (req, res) => {
  const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;

    const dbConn = dbConnection();

    adicionarContrato(
      dbConn,
      tipo,
      localEven,
      cep,
      apelido,
      idUsuario,
      idContratante,
      (error, result) => {
        if (error) {
          console.log("Error, ", error.message);
        } else {
          console.log(result);
        }
        res.redirect("/contratos");
      }
    );
};

module.exports.putContrato = (req, res) => {
  const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;

  const idContrato = req.params.idContrato;

  try {
    const dbConn = dbConnection();

    
  } catch (error) {
    
  }
};

module.exports.deleteContrato = async (req, res) => {
  const { idContrato } = req.params;

  try {
    dbConn = dbConnection();

    const result = await deleteContrato(dbConn, idContrato);

    res.status(200).send({"result": result});
  } catch (error) {
    res.stauts(400).send({"err": err});
  }
}

