const dbConnection = require("../../config/dbConnection");

const { getManutencao, inserirHistoricoManutencao, inserirManutencao, deleteManutencao, putManutencao, getManutencaoById } = require("../models/manutencaoModel");

module.exports.getManutencao = async (req, res) => {
  const dbConn = dbConnection();

  try {

    const itensEmManutencao = await getManutencao(dbConn);
    const itensAgrupados = agruparPorGrupo(itensEmManutencao);
    res.render("./telas_manutencao/tela_manutencao_principal.ejs", { 'itensEmManutencao': itensAgrupados, usuario: req.user });
  } catch (err) {
    res.status(500).send({ 'erro': err.message });
  }
};

module.exports.getManutencaoById = async (req, res) => {
  const idManutencao = req.params.id;
  
  const dbConn = dbConnection();

  try {

    const itensEmManutencao = await getManutencaoById(dbConn, idManutencao);
    const itensAgrupados = agruparPorGrupo(itensEmManutencao);
    res.status(200).send({ 'itensEmManutencao': itensAgrupados });
  } catch (err) {
    res.status(500).send({ 'erro': err.message });
  }
};

module.exports.postManutencao = async (req, res) => {
  const { idItens, motivo, dataInic, dataRetorno, responsavel } = req.params;
  const dbConn = dbConnection();

  try {
    const idManutencao = await inserirManutencao(dbConn, { motivo, dataInic, dataRetorno, responsavel });

    // Inserir dados na tabela historicoManutencao
    await inserirHistoricoManutencao(dbConn, { dataInic, dataTerm: dataRetorno, idManutencao, idItens });

    res.status(201).send({ mensagem: "Item adicionado à manutenção com sucesso.", idManutencao });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }};

module.exports.putManutencao = async (req, res) => {
  const {idManutencao, motivo, dataInic, dataRetorno, responsavel } = req.params;

  const dbConn = dbConnection();
  try {
    const result = await putManutencao(dbConn, {idManutencao, motivo, dataInic, dataRetorno, responsavel });

    if (result.affectedRows === 0) {
      return res.status(404).send({ erro: 'Manutenção não encontrada.' });
    }

    res.status(200).send({ mensagem: 'Manutenção atualizada com sucesso.' });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }  
};

module.exports.deleteManutencao = async (req, res) => {
  const idManutencao = req.params.id;
  try {
    const dbConn = dbConnection();

    const result = await deleteManutencao(dbConn, idManutencao);

    res.status(200).send({'result': result});
  } catch (err) {
    res.status(400).send({'err': err});
  }
};


const agruparPorGrupo = (itens) => {
  return itens.reduce((acc, item) => {
    const { idGrupo, nomeGrupo, categoria, precoGrupo, ...itemDetalhes } = item;
    if (!acc[idGrupo]) {
      acc[idGrupo] = {
        idGrupo,
        nomeGrupo,
        categoria,
        precoGrupo,
        itens: []
      };
    }
    acc[idGrupo].itens.push(itemDetalhes);
    return acc;
  }, {});
};