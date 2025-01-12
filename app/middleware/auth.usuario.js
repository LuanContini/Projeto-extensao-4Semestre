const jwt = require('jsonwebtoken');

require("dotenv").config({ path: ".env" });


module.exports.checarAuthComum = (req, res, next) => {
    const token = req.session.token;
    
    if (!token) {
        req.session.returnTo = req.originalUrl; 
        return res.render('telas_logins/tela_login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        req.user = decoded;
        next();
    });
};

module.exports.checarAuthAdmin = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        req.session.returnTo = req.originalUrl;
        return res.render('telas_logins/tela_login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        if (decoded.tipo === 'Administrador') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: "Usuário não tem permissão" });
        }
    });
};
