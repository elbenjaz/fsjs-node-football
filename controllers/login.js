const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils");

const admin = {
    username : "admin",
    password : "1234"
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (username === admin.username && password === admin.password) {
            const token = jwt.sign({ username: admin.username }, secretKey, {
                expiresIn: "1m" 
            });
            
            return res.status(200).send({ token });
        }
    
        return res.status(400).send({ error: "Usuario y/o contraseña incorrecta." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { login };
