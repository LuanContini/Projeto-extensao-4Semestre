const dbConnection = require("../../config/dbConnection");

class ContratoModel {
    static async getAllContratos(connection) {
        const [rows] = await connection.query(`
            SELECT 
                c.*,
                u.nome as usuario_nome,
                ct.nome as contratante_nome,
                c.status,
                c.valorTotal
            FROM contrato c
            JOIN usuario u ON c.idUsuario = u.idUsuario
            JOIN contratante ct ON c.idContratante = ct.idContratante
        `);
        return rows;
    }

    static async getStatusCount(connection) {
        const [rows] = await connection.query(`
            SELECT 
                COALESCE(SUM(CASE WHEN status = 'Concluido' THEN 1 ELSE 0 END), 0) AS concluidos,
                COALESCE(SUM(CASE WHEN status = 'Em andamento' THEN 1 ELSE 0 END), 0) AS em_andamento,
                COALESCE(SUM(CASE WHEN status = 'Pendente' THEN 1 ELSE 0 END), 0) AS pendentes,
                COUNT(status) AS totalContrato,
                COALESCE(SUM(valorTotal), 0) AS lucroPrevisto 
            FROM contrato
        `);
        return rows[0];
    }
    
    static async getContratosModel(conn) {
        console.log("[Model contrato]");
        const sql = "SELECT * FROM contrato;";
        return await conn.query(sql);
    }

    static async adicionarContrato(
        conn,
        tipo,
        localEven,
        cep,
        apelido,
        idUsuario,
        idContratante
    ) {
        const sql = `
            INSERT INTO contrato 
            (tipo, localEvento, cep, apelido, idUsuario, idContratante) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        return await conn.query(
            sql,
            [tipo, localEven, cep, apelido, idUsuario, idContratante]
        );
    }

    static putContrato(dbConnection, idContrato, contratoData) {
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
    }

    static deleteContrato(dbConnection, idContrato) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM contrato WHERE idContrato = ?";
            dbConnection.query(sql, [idContrato], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = ContratoModel;
