const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers/indexController');
const authSession = require(("../middlewares/authSession"))
const authJWT = require("../middlewares/authJWT");
const { check } = require("express-validator");
const { validateUserID } = require('../middlewares/validateUserId');

userRouter.post('/registrarUsuario', [
    check("name").not().isEmpty().withMessage("Debe ingresar un nombre"),
    check("email").not().isEmpty().withMessage("No se rellenó el campo").isEmail().withMessage("se debe ingresar un email"),
    check("password").not().isEmpty().withMessage("No se rellenó el campo").isLength({ min: 8, max: 15 }).withMessage("La contraseña debe contener entre 8 a 15 caracteres."),
], controllers.userRegister);

userRouter.post('/login', [
    check("email").not().isEmpty().withMessage("No se rellenó el campo").isEmail().withMessage("se debe ingresar un email"),
    check("password").not().isEmpty().withMessage("No se rellenó el campo"),
], controllers.login);

userRouter.get('/verUsuarios', authSession, authJWT, controllers.readUsers);

userRouter.get('/verUnUsuario/:id', authSession, authJWT, validateUserID, controllers.user);


userRouter.get('/verCookie', controllers.readCookie);

userRouter.get('/logs', authSession, authJWT, controllers.allLogs);

userRouter.get('/userLog/:id', authSession, authJWT, controllers.userLog);

userRouter.put('/editarPassword/:id', authSession, authJWT, validateUserID, [check("password").not().isEmpty().withMessage("No se rellenó el campo").isLength({ min: 8, max: 15 }).withMessage("La contraseña debe contener entre 8 a 15 caracteres."),
], controllers.editPassword);


userRouter.delete('/borrarUsuario/:id', authSession, authJWT, validateUserID, controllers.deleteUser);


userRouter.delete('/logout', authSession, authJWT, controllers.logout);

module.exports = userRouter;
