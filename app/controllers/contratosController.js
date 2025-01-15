const dbConnection = require("../../config/dbConnection");
const ContratoModel = require("../models/contratosModel");

const handleError = (res, err, message) => {
    console.error(`${message}:`, err);
    res.status(500).json({
        success: false,
        message: message,
        error: err.message
    });
};

module.exports.getContratos = (req, res) => {
    let dbConn;
    dbConnection().then(connection => {
        dbConn = connection;
        return Promise.all([
            ContratoModel.getAllContratos(dbConn),
            ContratoModel.getStatusCount(dbConn)
        ]);
    }).then(([contratos, statusCount]) => {
        const viewData = {
            contratos,
            em_andamento: statusCount.em_andamento || 0,
            pendentes: statusCount.pendentes || 0,
            concluidos: statusCount.concluidos || 0,
            totalContrato: statusCount.totalContrato || 0,
            lucroPrevisto: statusCount.lucroPrevisto || 0,
            usuario: req.user
        };
        res.render("./telas_contrato/tela_contrato_inicial.ejs", viewData);
    }).catch(err => {
        handleError(res, err, "Erro ao buscar dados dos contratos");
    }).finally(() => {
        if (dbConn) dbConn.end();
    });
};

module.exports.getContratoById = (req, res) => {
    const id = req.params.id;
    dbConnection().then(dbConn => {
        console.log('Fetching contract with ID:', id); // Debug log
        
        if (!id) {
            throw new Error('ID não fornecido');
        }

        return ContratoModel.getContratoById(dbConn, id);
    }).then(contrato => {
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato não encontrado' });
        }

        console.log('Contract found:', contrato); // Debug log
        res.status(200).json(contrato);
    }).catch(err => {
        console.error('Error fetching contract:', err); // Error log
        res.status(400).json({ error: err.message });
    });
};

module.exports.postContrato = (req, res) => {
    let dbConn;
    const { tipo, localEvento, cep, apelido, idUsuario, idContratante } = req.body;
    
    // Input validation
    if (!tipo || !localEvento || !cep || !idUsuario || !idContratante) {
        return res.status(400).json({
            success: false,
            message: "Dados incompletos para criar contrato"
        });
    }

    dbConnection().then(connection => {
        dbConn = connection;
        return ContratoModel.adicionarContrato(dbConn, {
            tipo,
            localEvento,
            cep,
            apelido,
            idUsuario,
            idContratante
        });
    }).then(result => {
        res.status(201).json({
            success: true,
            message: "Contrato criado com sucesso",
            data: result
        });
    }).catch(err => {
        handleError(res, err, "Erro ao criar contrato");
    }).finally(() => {
        if (dbConn) dbConn.end();
    });
};

module.exports.putContrato = (req, res) => {
    const idContrato = req.params.id;
    const { tipo, localEvento, cep, apelido, idUsuario, idContratante } = req.body;

    dbConnection().then(dbConn => {
        return ContratoModel.putContrato(dbConn, idContrato, {
            tipo,
            localEvento,
            cep,
            apelido,
            idUsuario,
            idContratante
        });
    }).then(result => {
        res.status(200).send({ message: "Contrato atualizado com sucesso", result });
    }).catch(err => {
        res.status(400).send({ error: err.message });
    });
};

module.exports.deleteContrato = (req, res) => {
    const idContrato = req.params.id; // Usar 'params' para capturar o id da URL
    
    dbConnection().then(dbConn => {
        return ContratoModel.deleteContrato(dbConn, idContrato);
    }).then(result => {
        res.redirect('/contratos');
    }).catch(err => {
        res.status(400).send({ error: err.message });
    });
};