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

module.exports.getContratos = async (req, res) => {
    let dbConn;
    try {
        dbConn = await dbConnection().promise();
        
        const contratos = await ContratoModel.getAllContratos(dbConn);
        const statusCount = await ContratoModel.getStatusCount(dbConn);

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

    } catch (err) {
        handleError(res, err, "Erro ao buscar dados dos contratos");
    } finally {
        if (dbConn) await dbConn.end();
    }
};

module.exports.getContratoById = async (req, res) => {
    const id = req.params.id;
    const dbConn = dbConnection();

    try {
        console.log('Fetching contract with ID:', id); // Debug log
        
        if (!id) {
            throw new Error('ID não fornecido');
        }

        const contrato = await ContratoModel.getContratoById(dbConn, id);
        
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato não encontrado' });
        }

        console.log('Contract found:', contrato); // Debug log
        res.status(200).json(contrato);

    } catch (err) {
        console.error('Error fetching contract:', err); // Error log
        res.status(400).json({ error: err.message });
    } finally {
        if (dbConn) dbConn.end();
    }
};

module.exports.postContrato = async (req, res) => {
    let dbConn;
    try {
        const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;
        
        // Input validation
        if (!tipo || !localEven || !cep || !idUsuario || !idContratante) {
            return res.status(400).json({
                success: false,
                message: "Dados incompletos para criar contrato"
            });
        }

        dbConn = dbConnection();
        const result = await ContratoModel.adicionarContrato(
            dbConn,
            tipo,
            localEven, 
            cep,
            apelido,
            idUsuario,
            idContratante
        );

        res.status(201).json({
            success: true,
            message: "Contrato criado com sucesso",
            data: result
        });
    } catch (err) {
        handleError(res, err, "Erro ao criar contrato");
    } finally {
        if (dbConn) await dbConn.end();
    }
};

module.exports.putContrato = async (req, res) => {
    const idContrato = req.params.id;
    const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;
    const dbConn = dbConnection();

    try {
        const result = await ContratoModel.putContrato(
            dbConn,
            idContrato,
            tipo,
            localEven,
            cep,
            apelido,
            idUsuario,
            idContratante
        );
        res.status(200).send({ message: "Contrato atualizado com sucesso", result });
    } catch (err) {
        res.status(400).send({ error: err.message });
    } finally {
        if (dbConn) dbConn.end();
    }
};

module.exports.deleteContrato = async (req, res) => {
    const idContrato = req.params.id; // Usar 'params' para capturar o id da URL
    
    const dbConn = dbConnection();

    try {
        const result = await ContratoModel.deleteContrato(dbConn, idContrato);
        res.redirect('/contratos');
    } catch (err) {
        res.status(400).send({ error: err.message });
    } finally {
        if (dbConn) dbConn.end();
    }
};
