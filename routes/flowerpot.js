const express = require('express');
const flowerPotRouter = express.Router();
const controllers = require('../controllers/indexController');
const { validarID } = require('../middlewares/validarId');
const { check } = require("express-validator");


flowerPotRouter.post('/crearMaceta', [
    check("modelo").not().isEmpty().withMessage("indicar el modelo del producto"),
    check("color").not().isEmpty().withMessage("indicar el color del producto"),
    check("material").not().isEmpty().withMessage("indicar el material del producto"),
    check("precioEnARS").not().isEmpty().withMessage("indicar el precio del producto").isLength({ min: 3, max: 5 }).withMessage("mínimo 3 y máximo 5 dígitos"),
    check("medidaEnCMS").not().isEmpty().withMessage("indicar la medida en centímetros del producto").isLength({ min: 2, max: 3 }).withMessage("mínimo 2 y máximo 3 dígitos"),
], controllers.createFlowerPot);

flowerPotRouter.get('/verMaceta', controllers.readFlowerPot);

flowerPotRouter.get('/verIdMaceta/:id', validarID, controllers.idFlowerPot);

flowerPotRouter.put('/editarMaceta/:id', validarID, [
    check("modelo").not().isEmpty().withMessage("indicar el modelo del producto"),
    check("color").not().isEmpty().withMessage("indicar el color del producto"),
    check("material").not().isEmpty().withMessage("indicar el material del producto"),
    check("precioEnARS").not().isEmpty().withMessage("indicar el precio del producto").isLength({ min: 3, max: 5 }).withMessage("mínimo 3 y máximo 5 dígitos"),
    check("medidaEnCMS").not().isEmpty().withMessage("indicar la medida en centímetros del producto").isLength({ min: 2, max: 3 }).withMessage("mínimo 2 y máximo 3 dígitos"),
], controllers.editFlowerPot);

flowerPotRouter.delete('/eliminarMaceta/:id', validarID, controllers.deleteFlowerPot);

module.exports = flowerPotRouter;