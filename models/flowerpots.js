const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const flowerpotsSchema = new Schema({

    modelo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    precioEnARS: {
        type: Number,
        required: true
    },
    medidaEnCMS: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true,
    },

);

const Flowerpot = mongoose.model('Flowerpot', flowerpotsSchema);
module.exports = { Flowerpot };