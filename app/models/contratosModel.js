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

    static async adicionarContrato(conn, contratoData) {
        const connection = await conn.promise();
        try {
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
            
            const [result] = await connection.query(sql, [
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
            ]);

            return result.insertId;
        } catch (error) {
            console.error('Erro SQL:', error);
            throw error;
        }
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

    static async getContratoById(connection, id) {
        const promiseConn = connection.promise();
        const sql = `
            SELECT 
                c.*,
                u.nome as usuario_nome,
                ct.nome as contratante_nome
            FROM contrato c
            JOIN usuario u ON c.idUsuario = u.idUsuario
            JOIN contratante ct ON c.idContratante = ct.idContratante
            WHERE c.idContrato = ?`;

        const [rows] = await promiseConn.query(sql, [id]);
        return rows[0];
    }

    static async getContratanteById(connection, id) {
        const promiseConn = connection.promise();
        const sql = "SELECT * FROM contratante WHERE idContratante = ?";
        const [rows] = await promiseConn.query(sql, [id]);
        return rows[0];
    }

    static async getAllContratantes(connection) {
        const promiseConn = connection.promise();
        const sql = "SELECT * FROM contratante";
        const [rows] = await promiseConn.query(sql);
        return rows;
    }

    static async getGruposEItens(connection) {
        const promiseConn = connection.promise();
        
        // Buscar todos os grupos
        const sqlGrupos = "SELECT * FROM grupo";
        const [grupos] = await promiseConn.query(sqlGrupos);

        // Buscar todos os itens
        const sqlItens = "SELECT * FROM itens";
        const [itens] = await promiseConn.query(sqlItens);

        // Combinar itens com seus respectivos grupos
        const gruposComItens = grupos.map(grupo => {
            const itensDoGrupo = itens.filter(item => item.idGrupo === grupo.idGrupo);
            return {
                ...grupo,
                itens: itensDoGrupo,
                quantidadeItens: itensDoGrupo.length
            };
        });

        return gruposComItens;
    }
}

module.exports = ContratoModel;
