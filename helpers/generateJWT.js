const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = generateJWT = (body) => {
    return new Promise((resolve, reject) => {
        const payload = { body };
        jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRES_SECRET,
        },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject("No se pudo generar el Token");
                } else {
                    resolve(token);
                }
            }
        );

    });
};