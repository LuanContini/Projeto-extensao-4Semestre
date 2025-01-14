const mysql = require('mysql2/promise');

require("dotenv").config({ path: "../.env" });

const host = process.env.HOST;
const database = process.env.DB;
const user = process.env.USUARIO;
const password = process.env.SENHA;

const dbConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

module.exports = dbConnection;
