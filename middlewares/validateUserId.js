const { User } = require("../models/users")

const validateUserID = async (req, res, next) => {

    try {

        const item = await User.findById(req.params.id)

        if (item !== null) {
            next()
        } else {
            res.status(404).json({ msg: "El id es inválido" })
        }
    } catch (error) {
        res.status(400).json({ error });
    }

};

module.exports = { validateUserID }