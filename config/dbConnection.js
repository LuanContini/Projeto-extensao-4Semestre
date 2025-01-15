const mysql = require("mysql2");

require("dotenv").config({ path: "../.env" });

const host = process.env.HOST;
const database = process.env.DB;
const user = process.env.USUARIO;
const password = process.env.SENHA;

module.exports = () => {
  return (dbConn = mysql.createPool({
    connectionLimit: 50,
    host: host,
    user: user,
    password: password,
    database: database,
  }));
};
