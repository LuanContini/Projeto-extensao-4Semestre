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
                usuario: req.user,
                selectedItems: [], // Adicionado
                error: null
            });
        } catch (error) {
            console.error('Erro ao buscar contrato:', error);
            res.status(500).render('telas_contrato/tela_contrato_adicionar', {
                error: 'Erro ao buscar contrato',
                grupo: [],
                clients: [],
                tipo: req.query.tipo,
                selectedItems: [], // Adicionado
                usuario: req.user
            });
        } finally {
            if (conn) await conn.end();
        }
    },

    getItens: async (req, res) => {
        let conn;
        try {
            conn = await dbConnection();
            const gruposComItens = await ContratoModel.getGruposEItens(conn);

            res.render('telas_contrato/tela_contrato_adicionar', { 
                grupo: gruposComItens, 
                usuario: req.user,
                selectedItems: [], // Adicionado
                error: null
            });
        } catch (err) {
            console.error('Erro ao buscar itens:', err);
            res.status(500).send({ erro: err.message });
        } finally {
            if (conn) await conn.end();
        }
    },

    inserirContratos: (req, res) => {
        const itemIds = req.query.itemIds ? req.query.itemIds.split(',') : [];
        res.render('telas_contrato/tela_contrato_adicionar', { 
            selectedItemIds: itemIds,
            selectedItems: [], // Adicionado
            error: null
        });
    },

    inserirItens: async (req, res) => {
        let conn;
        try {
            conn = await dbConnection();
            const tipo = req.query.tipo || 'Novo';
            
            // Recupera os dados do formulário da URL
            const formData = {
                name: req.query.name || '',
                pickup_location: req.query.pickup_location || '',
                start_date: req.query.start_date || '',
                end_date: req.query.end_date || '',
                cep: req.query.cep || '',
                event_location: req.query.event_location || '',
                tipo_operacao: req.query.tipo_operacao || '',
                observation: req.query.observation || ''
            };
            
            // Pega os IDs existentes e os novos
            const existingIds = req.query.existingIds ? req.query.existingIds.split(',') : [];
            const newIds = req.query.itemIds ? req.query.itemIds.split(',') : [];
            
            // Combina os IDs existentes com os novos, removendo duplicatas
            const allItemIds = [...new Set([...existingIds, ...newIds])];
            
            const clients = await contratosModel.getAllContratantes(conn);
            const gruposComItens = await contratosModel.getGruposEItens(conn);
            
            // Atualize a quantidadeItens para cada grupo baseado nos itens filtrados
            gruposComItens.forEach(grupo => {
                const itensFiltrados = grupo.itens.filter(item => {
                    return !(allItemIds.includes(item.idItens.toString()));
                });
                grupo.quantidadeItens = itensFiltrados.length; // Atualiza para mostrar apenas itens disponíveis
            });
            
            let selectedItems = [];
            if (allItemIds.length > 0) {
                const sql = `
                    SELECT i.*, g.nome as grupoNome, g.categoria 
                    FROM itens i
                    JOIN grupo g ON i.idGrupo = g.idGrupo
                    WHERE i.idItens IN (?)
                `;
                const [items] = await conn.promise().query(sql, [allItemIds]);
                selectedItems = items.map(item => ({
                    id: item.idItens,
                    codigo: item.codBarras,
                    nome: item.nome,
                    categoria: item.categoria,
                    preco: item.preco
                }));
            }

            res.render('telas_contrato/tela_contrato_adicionar', {
                tipo,
                clients,
                grupo: gruposComItens,
                selectedItems,
                usuario: req.user,
                formData, // Adiciona os dados do formulário ao render
                error: null
            });
        } catch (error) {
            console.error('Erro ao processar itens:', error);
            res.status(500).render('telas_contrato/tela_contrato_adicionar', {
                error: 'Erro ao processar itens',
                tipo: req.query.tipo || 'Novo',
                clients: [],
                grupo: [],
                selectedItems: [],
                usuario: req.user
            });
        } finally {
            if (conn) await conn.end();
        }
    },

    criarContrato: async (req, res) => {
        let conn;
        try {
            conn = await dbConnection();
            
            // Get equipment data
            const equipmentList = JSON.parse(req.body.equipmentData || '[]');
            const itemIds = req.body.itemIds ? req.body.itemIds.split(',') : [];
            
            // Ensure we have a user ID either from session or default
            const userId = req.user?.idUsuario || 1; // Fallback to ID 1 if no user in session
            
            const contratoData = {
                tipo: req.body.tipo,
                valorTotal: 0,
                cep: req.body.cep.replace('-', ''),
                localEvento: req.body.event_location, // Updated field name
                localRetirada: req.body.pickup_location, // Updated field name
                dataHoraIni: req.body.start_date + ' 00:00:00', // Updated field name
                dataHoraTerm: req.body.end_date + ' 00:00:00', // Updated field name
                descEmpregados: req.body.descEmpregados, // Use the correct field name
                idUsuario: userId,
                idContratante: req.body.contratante, // Updated field name
                status: 'Pendente'
            };

            // Log para debug
            console.log('Dados do contrato:', contratoData);
            console.log('Dados do formulário:', req.body);
            
            const idContrato = await contratosModel.adicionarContrato(conn, contratoData);

            // Se houver itens selecionados, criar as reservas
            if (itemIds.length > 0) {
                for (const idItem of itemIds) {
                    await conn.promise().query(
                        'INSERT INTO reserva (idGrupo, idContrato) SELECT idGrupo, ? FROM itens WHERE idItens = ?',
                        [idContrato, idItem]
                    );
                }
            }

            res.redirect('/contratos/adicionar?tipo=' + req.body.tipo);
        } catch (error) {
            console.error('Erro ao criar contrato:', error);
            res.status(500).render('telas_contrato/tela_contrato_adicionar', {
                error: 'Erro ao criar contrato: ' + error.message,
                tipo: req.body.tipo,
                clients: [],
                grupo: [],
                selectedItems: [],
                usuario: req.user
            });
        } finally {
            if (conn) await conn.end();
        }
    }
};