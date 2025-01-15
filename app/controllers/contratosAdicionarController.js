const contratosModel = require('../models/contratosModel');
const dbConnection = require('../../config/dbConnection');
const clientesModel = require('../models/clientesModel');
const ContratoModel = require('../models/contratosModel');

module.exports = {
    renderTelaAdicionar: async (req, res) => {
        try {
            res.render('telas_contrato/tela_contrato_adicionar', {
                title: 'Adicionar Contrato',
                message: ''
            });
        } catch (error) {
            console.error('Erro ao renderizar tela:', error);
            res.status(500).send('Erro ao carregar página');
        }
    },

    postContrato: async (req, res) => {
        let conn;
        try {
            const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;
            conn = await dbConnection();
            
            await contratosModel.adicionarContrato(
                conn,
                tipo,
                localEven,
                cep,
                apelido,
                idUsuario,
                idContratante
            );

            res.redirect('/contratos');
        } catch (error) {
            console.error('Erro ao adicionar contrato:', error);
            res.render('telas_contrato/tela_contrato_adicionar', {
                title: 'Adicionar Contrato',
                message: 'Erro ao adicionar contrato'
            });
        } finally {
            if (conn) await conn.end();
        }
    },

    getContratoByUrl: async (req, res) => {
        let conn;
        try {
            conn = await dbConnection();
            const tipo = req.query.tipo;
            const clients = await contratosModel.getAllContratantes(conn);
            const gruposComItens = await contratosModel.getGruposEItens(conn);

            res.render('telas_contrato/tela_contrato_adicionar', {
                tipo,
                clients,
                grupo: gruposComItens,
                usuario: req.user
            });
        } catch (error) {
            console.error('Erro ao buscar contrato:', error);
            res.status(500).json({ message: 'Erro ao buscar contrato' });
        } finally {
            if (conn) await conn.end();
        }
    },

    getItens: async (req, res) => {
        let conn;
        try {
            conn = await dbConnection();
            const gruposComItens = await ContratoModel.getGruposEItens(conn);

            res.render('telas_contrato/tela_contrato_adicionar', { grupo: gruposComItens, usuario: req.user });
        } catch (err) {
            console.error('Erro ao buscar itens:', err);
            res.status(500).send({ erro: err.message });
        } finally {
            if (conn) await conn.end();
        }
    },   
};