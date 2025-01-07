const jwt = require('jsonwebtoken');

require("dotenv").config({ path: ".env" });


module.exports.checarAuth = (req, res, next) => {
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
        console.log(req.user);
        next();
    });
};