const jwt = require('jsonwebtoken');

require("dotenv").config({ path: ".env" });


module.exports.checarAuthComum = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(token);
            return res.status(403).json({ message: "Token inválido" });
        }

        req.user = decoded;
        console.log("user",req.user);
        next();
    });
};

module.exports.checarAuthAdmin = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(token);
            return res.status(403).json({ message: "Token inválido" });
        }

        
        if(decoded.tipo === 'Administrador'){
            req.user = decoded;
            console.log("user",req.user);
            next();
        }
        else{
            return res.status(403).json({message: "Usuário não tem permissão"});
        }
        
    });
};