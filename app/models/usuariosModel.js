const bcrypt = require("bcrypt");

module.exports = {
  // GETS
  getUsuarios: (dbConnection) => {
    console.log("[Model usuario]");
    const sql = "SELECT * FROM usuario;";
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, (err, result) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  },

  getUsuarioById: (dbConnection, idUsuario) => {
    const sql = "SELECT * FROM usuario WHERE idUsuario = ?;";
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [idUsuario], (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  },

  // FIND
  findUsuario: (dbConnection, nome, senha) => {
    const sql = "SELECT idUsuario, nome, tipo, senha FROM usuario WHERE nome = ?";

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(sql, [nome], async (err, results) => {
          connection.release(); // Libera a conexão de volta ao pool
          if (err) {
            return reject(err);
          }

          if (results.length === 0) {
            return reject(new Error("Usuário não encontrado"));
          }

          const usuario = results[0];

          try {
            const isMatch = await bcrypt.compare(senha, usuario.senha);

            if (isMatch) {
              resolve({
                idUsuario: usuario.idUsuario,
                nome: usuario.nome,
                tipo: usuario.tipo,
              });
            } else {
              reject(new Error("Usuário ou senha não encontrado"));
            }
          } catch (compareError) {
            reject(compareError);
          }
        });
      });
    });
  },

  // INSERT
  adicionarUsuario: (dbConnection, nome, cpf, telefone, email, senha, nasc, tipo) => {
    console.log("[Model Adicionar Usuario]");

    const sql = `INSERT INTO usuario (nome, cpf, telefone, email, senha, dataNasc, dataCad, tipo) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)`;
    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
          return reject(err); // Retorna erro se não conseguir obter a conexão
        }
        connection.query(
          sql,
          [nome, cpf, telefone, email, senha, nasc, tipo],
          (err, result) => {
            connection.release(); // Libera a conexão de volta ao pool
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  },

  // UPDATE
  updateUsuario: (dbConnection, idUsuario, nome, cpf, telefone, email, senha, nasc, tipo) => {
    console.log("[Model Atualizar Usuario]");
    console.log(idUsuario, nome, cpf, telefone, email, senha, nasc, tipo);

    let sql;
    const params = [nome, cpf, telefone, email, nasc, tipo, idUsuario];

    if (senha && senha.trim() !== "") {
      sql = `
          UPDATE usuario
          SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ?, dataNasc = ?, tipo = ?
          WHERE idUsuario = ?
      `;
      params.splice(4, 0, senha);
    } else {
      sql = `
          UPDATE usuario
          SET nome = ?, cpf = ?, telefone = ?, email = ?, dataNasc = ?, tipo = ?
          WHERE idUsuario = ?
      `;
    }

    return new Promise((resolve, reject) => {
      dbConnection.getConnection((err, connection) => {
        if (err) {
            return reject(err); // Retorna erro se não conseguir obter a conexão
          }
          connection.query(
            sql,
            params,
            (err, result) => {
              connection.release(); // Libera a conexão de volta ao pool
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      });
    },

    // DELETE
    deleteUsuario: (dbConnection, idUsuario) => {
      console.log("[Model usuario]");
      const sql = "DELETE FROM usuario WHERE idUsuario = ?;";
      return new Promise((resolve, reject) => {
        dbConnection.getConnection((err, connection) => {
          if (err) {
            return reject(err); // Retorna erro se não conseguir obter a conexão
          }
          connection.query(sql, [idUsuario], (err, result) => {
            connection.release(); // Libera a conexão de volta ao pool
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });
    },
  };