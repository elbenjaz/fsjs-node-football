const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils");

const checkAuthentication = (req, res, next) => {
    try {
        //validate headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ error: "Token requerido." });
        }

        //validate token
        req.auth = jwt.verify(token, secretKey);
        
        next();
    } catch (error) {
        return res.status(401).send({ error: `Token es inválido: ${error.message}` });
    }
};

module.exports = { 
    auth: { checkAuthentication }
};
