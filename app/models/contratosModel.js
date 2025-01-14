const dbConnection = require("../../config/dbConnection");

module.exports = {
    getContratosModel: async (conn) => {
        console.log("[Model contrato]");
        const sql = "SELECT * FROM contrato;";
        return await conn.query(sql);
    },

    adicionarContrato: async (
        conn,
        tipo,
        localEven,
        cep,
        apelido,
        idUsuario,
        idContratante
    ) => {
        const sql = `
            INSERT INTO contrato 
            (tipo, localEvento, cep, apelido, idUsuario, idContratante) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        return await conn.query(
            sql,
            [tipo, localEven, cep, apelido, idUsuario, idContratante]
        );
    },

    putContrato: (dbConnection, idContrato, contratoData) => {
        return new Promise((resolve, reject) => {
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
            
            dbConnection.query(
                sql,
                [
                    contratoData.tipo,
                    contratoData.localEven,
                    contratoData.cep,
                    contratoData.apelido,
                    contratoData.idUsuario,
                    contratoData.idContratante,
                    idContrato
                ],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });
    },

    deleteContrato: (dbConnection, idContrato) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM contrato WHERE idContrato = ?";
            dbConnection.query(sql, [idContrato], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    getStatusCount: (dbConnection, callback) => {
        const query = `
            SELECT 
                SUM(CASE WHEN status = 'Concluido' THEN 1 ELSE 0 END) AS concluidos,
                SUM(CASE WHEN status = 'Em andamento' THEN 1 ELSE 0 END) AS em_andamento,
                SUM(CASE WHEN status = 'Pendente' THEN 1 ELSE 0 END) AS pendentes,
                COUNT(status) AS 'totalContrato',
                SUM(valorTotal) AS 'lucroPrevisto' 
            FROM contrato;
        `;

        dbConnection.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }

            const statusCount = {
                pendentes: results[0].pendentes || 0,
                concluidos: results[0].concluidos || 0,
                em_andamento: results[0].em_andamento || 0,
                totalContrato: results[0].totalContrato || 0,
                lucroPrevisto: results[0].lucroPrevisto || 0
            };

            callback(null, statusCount);
        });
    }
};
