
module.exports = {
    // Função para buscar todos os contratos
    getAllContratos: (dbConnection) => {
        console.log("[Model contratos]");
        const sql = `
            SELECT 
                c.*,
                u.nome as usuario_nome,
                ct.nome as contratante_nome,
                c.status,
                c.valorTotal
            FROM contrato c
            JOIN usuario u ON c.idUsuario = u.idUsuario
            JOIN contratante ct ON c.idContratante = ct.idContratante
        `;
        return new Promise((resolve, reject) => {
            dbConnection.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, (err, results) => {
                    connection.release(); // Libera a conexão de volta ao pool
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });
    },

    // Função para contar o status dos contratos
    getStatusCount: (dbConnection) => {
        const sql = `
            SELECT 
                COALESCE(SUM(CASE WHEN status = 'Concluido' THEN 1 ELSE 0 END), 0) AS concluidos,
                COALESCE(SUM(CASE WHEN status = 'Em andamento' THEN 1 ELSE 0 END), 0) AS em_andamento,
                COALESCE(SUM(CASE WHEN status = 'Pendente' THEN 1 ELSE 0 END), 0) AS pendentes,
                COUNT(status) AS totalContrato,
                COALESCE(SUM(valorTotal), 0) AS lucroPrevisto 
            FROM contrato
        `;
        return new Promise((resolve, reject) => {
            dbConnection.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, (err, results) => {
                    connection.release(); // Libera a conexão de volta ao pool
                    if (err) {
                        return reject(err);
                    }
                    resolve(results[0]);
                });
            });
        });
    },

    // Função para adicionar um contrato
    adicionarContrato: (dbConnection, contratoData) => {
        const sql = `
            INSERT INTO contrato (
                tipo,
                valorTotal,
                cep,
                localEvento,
                localRetirada,
                dataHoraIni,
                dataHoraTerm,
                descEmpregados,
                idUsuario,
                idContratante
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            dbConnection.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, [
                    contratoData.tipo,
                    contratoData.valorTotal || 0,
                    contratoData.cep,
                    contratoData.localEvento,
                    contratoData.localRetirada,
                    contratoData.dataHoraIni,
                    contratoData.dataHoraTerm,
                    contratoData.descEmpregados,
                    contratoData.idUsuario,
                    contratoData.idContratante
                ], (err, result) => {
                    connection.release(); // Libera a conexão de volta ao pool
                    if (err) {
                        console.error('Erro SQL:', err);
                        return reject(err);
                    }
                    resolve(result.insertId);
                });
            });
        });
    },

    // Função para atualizar um contrato
    putContrato: (dbConnection, idContrato, contratoData) => {
        const sql = `
            UPDATE contrato 
            SET tipo = ?, 
                localEvento = ?, 
                cep = ?, 
                apelido = ?,
                idUsuario = ?, 
                idContratante = ?
            WHERE idContrato = ?
        `;
        return new Promise((resolve, reject) => {
            dbConnection.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, [
                    contratoData.tipo,
                    contratoData.localEvento,
                    contratoData.cep,
                    contratoData.apelido,
                    contratoData.idUsuario,
                    contratoData.idContratante,
                    idContrato
                ], (err, results) => {
                    connection.release(); // Libera a conexão de volta ao pool
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });
    },

    // Função para deletar um contrato
    deleteContrato: (dbConnection, idContrato) => {
        const sql = "DELETE FROM contrato WHERE idContrato = ?";
        return new Promise((resolve, reject ) => {
            dbConnection.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, [idContrato], (err, results) => {
                    connection.release(); // Libera a conexão de volta ao pool
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });
    },

    // Função para buscar um contrato pelo ID
    getContratoById: (dbConnection, id) => {
        const sql = `
            SELECT 
                c.*,
                u.nome as usuario_nome,
                ct.nome as contratante_nome
            FROM contrato c
            JOIN usuario u ON c.idUsuario = u.idUsuario
            JOIN contratante ct ON c.idContratante = ct.idContratante
            WHERE c.idContrato = ?
        `;
        return new Promise((resolve, reject) => {
            dbConnection.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, [id], (err, results) => {
                    connection.release(); // Libera a conexão de volta ao pool
                    if (err) {
                        return reject(err);
                    }
                    resolve(results[0]);
                });
            });
        });
    }
};