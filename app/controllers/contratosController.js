const contratosModel = require('../models/contratosModel');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    getContratos: async (req, res) => {
        let conn;
        try {
            conn = await dbConnection();
            const [contratos] = await contratosModel.getContratosModel(conn);
            
            // Calculate status counts and totals
            const statusCount = contratos.reduce((acc, contrato) => {
                const status = calcularStatus(contrato.dataHoraIni, contrato.dataHoraTerm);
                
                // Count by status
                if (status === 'Pendente') acc.pendentes++;
                if (status === 'Concluído') acc.concluidos++;
                if (status === 'Em Andamento') acc.em_andamento++;
                
                // Calculate totals
                acc.totalContrato++;
                acc.lucroPrevisto += Number(contrato.valorTotal) || 0;
                
                return acc;
            }, {
                pendentes: 0,
                concluidos: 0,
                em_andamento: 0,
                totalContrato: 0,
                lucroPrevisto: 0
            });

            // Format contract data
            const contratosFormatados = contratos.map(contrato => ({
                idContrato: contrato.idContrato,
                tipo: contrato.tipo,
                localEvento: contrato.localEvento,
                dataHoraIni: contrato.dataHoraIni,
                dataHoraTerm: contrato.dataHoraTerm,
                status: calcularStatus(contrato.dataHoraIni, contrato.dataHoraTerm),
                valorTotal: contrato.valorTotal || 0
            }));

            res.render('telas_contrato/tela_contrato_inicial', {
                title: 'Lista de Contratos',
                contratos: contratosFormatados,
                pendentes: statusCount.pendentes,
                concluidos: statusCount.concluidos,
                em_andamento: statusCount.em_andamento,
                totalContrato: statusCount.totalContrato,
                lucroPrevisto: statusCount.lucroPrevisto,
                usuario: req.user,
                message: ''
            });
        } catch (error) {
            console.error('Erro ao buscar contratos:', error);
            res.render('telas_contrato/tela_contrato_inicial', {
                title: 'Lista de Contratos',
                contratos: [],
                pendentes: 0,
                concluidos: 0,
                em_andamento: 0,
                totalContrato: 0,
                lucroPrevisto: 0,
                usuario: req.user,
                message: 'Erro ao carregar contratos'
            });
        } finally {
            if (conn) await conn.end();
        }
    },

    getContratoById: async (req, res) => {
        let conn;
        try {
            const { id } = req.params;
            conn = await dbConnection();
            const [contrato] = await contratosModel.findById(conn, id);
            
            if (!contrato || contrato.length === 0) {
                return res.status(404).json({ error: 'Contrato não encontrado' });
            }
            
            res.status(200).json(contrato[0]);
        } catch (error) {
            console.error('Erro ao buscar contrato:', error);
            res.status(500).json({ error: 'Erro ao buscar contrato' });
        } finally {
            if (conn) await conn.end();
        }
    },

    postContrato: async (req, res) => {
        let conn;
        try {
            const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;
            conn = await dbConnection();
            
            const [result] = await contratosModel.adicionarContrato(
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

    putContrato: async (req, res) => {
        try {
            const { tipo, localEven, cep, apelido, idUsuario, idContratante } = req.body;
            const { idContrato } = req.params;

            if (!idContrato) {
                return res.status(400).json({ error: 'ID do contrato não fornecido' });
            }

            const conn = await dbConnection();
            const result = await contratosModel.putContrato(conn, idContrato, {
                tipo,
                localEven,
                cep,
                apelido,
                idUsuario,
                idContratante
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Contrato não encontrado' });
            }

            res.status(200).json({ message: 'Contrato atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar contrato:', error);
            res.status(500).json({ error: 'Erro ao atualizar contrato' });
        }
    },

    deleteContrato: async (req, res) => {
        const { idContrato } = req.params;

        try {
            const dbConn = dbConnection();

            const result = await deleteContrato(dbConn, idContrato);
            if (!result) {
                return res.status(404).send({ err: 'Contrato não encontrado' });
            }

            res.status(200).send({ result });
        } catch (err) {
            console.error("Erro ao deletar contrato:", err);
            res.status(400).send({ err: 'Erro ao deletar contrato' });
        }
    }
};

// Helper function to calculate contract status
function calcularStatus(dataInicio, dataTermino) {
    const hoje = new Date();
    const inicio = new Date(dataInicio);
    const termino = new Date(dataTermino);

    if (hoje < inicio) {
        return 'Pendente';
    } else if (hoje > termino) {
        return 'Concluído';
    } else {
        return 'Em Andamento';
    }
}
