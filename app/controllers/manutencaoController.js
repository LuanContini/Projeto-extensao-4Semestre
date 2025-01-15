const dbConnection = require("../../config/dbConnection");

const {
  getManutencao,
  inserirHistoricoManutencao,
  inserirManutencao,
  deleteManutencao,
  putManutencao,
  getManutencaoById,
} = require("../models/manutencaoModel");

const { getItens, getGrupos } = require("../models/itensModel");

module.exports.getManutencao = async (req, res) => {
  const dbConn = await dbConnection();

  try {
    const itensEmManutencao = await getManutencao(dbConn);
    const itensAgrupados = agruparPorGrupo(itensEmManutencao);

    console.log(itensEmManutencao[0], itensAgrupados);
    res.render("./telas_manutencao/tela_manutencao_principal.ejs", {
      "itensEmManutencao": itensAgrupados,
      usuario: req.user,
    });
  } catch (err) {
    res.status(500).send({ "erro": err.message });
  }
};

module.exports.getManutencaoById = async (req, res) => {
  const idManutencao = req.params.id;

  const dbConn = await dbConnection();

  try {
    const itensEmManutencao = await getManutencaoById(dbConn, idManutencao);
    const itensAgrupados = agruparPorGrupo(itensEmManutencao);
    res.status(200).send({ "itensEmManutencao": itensAgrupados });
  } catch (err) {
    res.status(500).send({ "erro": err.message });
  }
};

module.exports.telaAdicionar = async (req, res) => {
  try {
    const dbConn = await dbConnection();
    const itens = await getItens(dbConn);
    const grupos = await getGrupos(dbConn);

    const itensComGrupos = grupos.map((grupo) => {
      const itensDoGrupo = itens.filter(
        (item) => item.idGrupo === grupo.idGrupo
      );
      return {
        ...grupo,
        itens: itensDoGrupo,
        quantidadeItens: itensDoGrupo.length,
      };
    });
    res.render("./telas_manutencao/tela_manutencao_adicionar.ejs", {
      "grupoComItens": itensComGrupos,
      usuario: req.user,
    });
  } catch (err) {
    res.status(500).send({ "err": err.message });
  }
};

module.exports.postManutencao = async (req, res) => {
  const { motivo, dataInic, dataRetorno, responsavel, selectedItems } =
    req.body;
  const dbConn = await dbConnection();

  try {
    const idManutencao = await inserirManutencao(dbConn, {
      motivo,
      dataInic,
      dataRetorno,
      responsavel,
    });

    for (const item of selectedItems) {
      await inserirHistoricoManutencao(dbConn, {
        dataInic,
        dataTerm: dataRetorno,
        idManutencao,
        idItens: item.id,
      });
    }

    res
      .status(201)
      .send({
        mensagem: "Itens adicionados à manutenção com sucesso.",
        idManutencao,
      });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

module.exports.putManutencao = async (req, res) => {
  const { idManutencao, motivo, dataInic, dataRetorno, responsavel } =
    req.params;

  const dbConn = await dbConnection();
  try {
    const result = await putManutencao(dbConn, {
      idManutencao,
      motivo,
      dataInic,
      dataRetorno,
      responsavel,
    });

    if (result.affectedRows === 0) {
      return res.status(404).send({ erro: "Manutenção não encontrada." });
    }

    res.status(200).send({ mensagem: "Manutenção atualizada com sucesso." });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

module.exports.deleteManutencao = async (req, res) => {
  const idManutencao = req.params.id;
  try {
    const dbConn = await dbConnection();

    const result = await deleteManutencao(dbConn, idManutencao);

    res.status(200).send({ "result": result });
  } catch (err) {
    res.status(400).send({ "err": err });
  }
};

const agruparPorGrupo = (itens) => {
  console.log(itens); // Para depuração
  return itens.reduce((acc, item) => {
    const {
      idManutencao,
      idGrupo,
      nomeGrupo,
      categoria,
      precoGrupo,
      motivo,
      dataInic,
      dataRetorno,
      responsavel,
      ...itemDetalhes
    } = item;

    // Verifica se a manutenção já existe no acumulador
    if (!acc[idManutencao]) {
      acc[idManutencao] = {
        idManutencao,
        idGrupo,
        nomeGrupo,
        categoria,
        precoGrupo,
        motivo,
        dataInic,
        dataRetorno,
        responsavel,
        itens: [], // Inicializa a lista de itens
      };
    }

    // Adiciona o item detalhado ao grupo correspondente
    acc[idManutencao].itens.push(itemDetalhes);
    return acc;
  }, {});
};
