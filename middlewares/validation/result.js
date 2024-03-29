const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ error: errors.array().map((error) => ({ field: error.path, message: error.msg }))  });
        //return res.status(400).json({ error: errors.array().map((error) =>  error.msg ) });
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    next();
};
