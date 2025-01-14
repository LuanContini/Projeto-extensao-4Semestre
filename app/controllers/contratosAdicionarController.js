const contratosModel = require('../models/contratosModel');
const dbConnection = require('../../config/dbConnection');

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
            res.render('tela_contrato_adicionar', {
                title: 'Adicionar Contrato',
                message: 'Erro ao adicionar contrato'
            });
        } finally {
            if (conn) await conn.end();
        }
    },

    getContratoByUrl: async (req, res) => {
        console.log("Rota '/contratos/adicionar' foi acessada.");
        
        const { tipo } = req.query;

        try {
            res.render('telas_contrato/tela_contrato_adicionar', {
                title: 'Adicionar Contrato',
                message: '',
                tipo: tipo || ''
            });
        } catch (error) {
            console.error('Erro ao renderizar tela:', error);
            res.status(500).send('Erro ao carregar página');
        }
    }
};