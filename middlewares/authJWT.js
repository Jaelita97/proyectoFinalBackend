const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/users");

module.exports = authJWT = async (req, res, next) => {
    const token = req.headers["x-token"] || req.cookies.personaEnSession.token;
    if (!token) {
        return res.status(401).json({
            msg: "No se encuentra token en la petición",
        });
    }

    try {
        const { body } = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(body);

        const user = await User.findById(body.id)
        if (user === null) {
            return res.status(401).json({ msg: "Este token no me pertenece" });
        }
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token Inválido", error, });
    }

};
