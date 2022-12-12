const { Flowerpot } = require("../models/flowerpots")

const validarID = async (req, res, next) => {

    try {
        const item = await Flowerpot.findById(req.params.id)
        if (item !== null) {
            next()
        } else {
            res.status(404).json({ msg: "El id es inválido" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

};

module.exports = { validarID }