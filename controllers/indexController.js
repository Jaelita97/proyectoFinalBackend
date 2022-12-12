const { User } = require("../models/users");
const { Flowerpot } = require("../models/flowerpots");
const { Log } = require("../models/logs");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const generateJWT = require("../helpers/generateJWT");

const controllers = {
    myIndex(req, res) {
        res.render('index');
    },
    userRegister: async (req, res) => {
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                const emailExist = await User.findOne({ email: req.body.email });
                if (emailExist) {
                    return res.status(400).json({ error: "El email ya está registrado" });
                }
                let salt = bcrypt.genSaltSync(10);
                const saveUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, salt),
                });
                await saveUser.save();
                res.status(201).json({ saveUser });
            } else {
                res.status(501).json({ err })
            }

        } catch (error) {
            res.status(501).json({
                msg: "No ha sido posible el registro, intente más tarde", error,
            });
        }
    },
    readUsers: async (req, res) => {
        const users = await User.find();
        res.status(200).json({ users });
    },
    user: async (req, res) => {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user });
    },
    editPassword: async (req, res) => {
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                let salt = bcrypt.genSaltSync(10);
                let newPassword = bcrypt.hashSync(req.body.password, salt);

                await User.findByIdAndUpdate(id, { password: newPassword });

                res.status(202).json({ msg: "Contraseña actualizada" });

            } else {
                res.status(501).json({ err });
            }

        } catch (err) {
            res.status(501).json({ msg: "Error al intentar actualizar la contraseña", err });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deletePerson = await User.findByIdAndDelete(req.params.id);
            res.status(202).json({ msg: "El usuario fue eliminado", deletePerson });
        } catch (error) {
            res.status(400).json({ msg: "El usuario no pudo ser eliminado" });
        }
    },
    login: async (req, res) => {
        const err = validationResult(req);
        if (err.isEmpty()) {
            const usuario = await User.findOne({ email: req.body.email });

            usuario == null && res.status(401).json({ msg: "El usuario o la contraseña es incorrecto" });

            !bcrypt.compareSync(req.body.password, usuario.password) && res.status(401).json({ msg: "El usuario o la contraseña es incorrecto" });

            const token = await generateJWT({
                id: usuario._id,
                name: usuario.name,
            });

            const userSession = {
                _id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: token,
            };

            res.cookie("personaEnSession", userSession, { maxAge: 60000 * 24 * 30, });

            req.session.user = userSession;

            const saveLogs = new Log({
                type: "login",
                userId: usuario._id,
                email: usuario.email,
            });
            await saveLogs.save();

            res.status(201).json({ userSession, log: true, msg: "Usuario logueado" });

        } else {
            res.status(501).json({ err });
        }
    },
    readCookie: (req, res) => {
        res.json(req.cookies.personaEnSession);
    },
    allLogs: async (req, res) => {
        const logs = await Log.find();
        res.status(200).json({ logs });
    },
    userLog: async (req, res) => {
        const userLogs = await Log.find({ userId: req.params.id });
        res.status(200).json({ userLogs });
    },
    logout: async (req, res) => {
        const usuario = req.cookies.personaEnSession;
        const saveLogs = new Log({
            type: "logout",
            userId: usuario._id,
            email: usuario.email,
        });
        await saveLogs.save();

        res.clearCookie("personaEnSession");
        req.session.destroy();
        res.status(200).json({ log: false, msg: "Se cerró la session" });
    },
     consultaAxios : async(req, res) => {
        try {
            const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/")
            res.json({data: respuesta.data, status: respuesta.status})
        } catch (error) {
            res.json({data: error.response.data, status: error.response.status})
        }
    },
    createFlowerPot: async (req, res) => {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const item = new Flowerpot(req.body)
                await item.save()
                res.status(201).json({ item })
            } else {
                res.status(501).json({ err })
            }

        } catch (error) {
            res.status(501).json({ msg: "Error al intentar crear el producto." })
        }
    },
    readFlowerPot: async (req, res) => {

        const items = await Flowerpot.find()
        res.status(201).json({ items })

    },
    idFlowerPot: async (req, res) => {

        const item = await Flowerpot.findById(req.params.id)
        res.status(200).json({ item })

    },
    editFlowerPot: async (req, res) => {
        try {
            const err = validationResult(req)

            if (err.isEmpty()) {
                await Flowerpot.findByIdAndUpdate(req.params.id, req.body)
                res.status(201).json({ msg: "actualización exitosa" })
            } else {
                res.status(501).json({ err })
            }

        } catch (error) {
            res.status(501).json({ error })
        }
    },
    deleteFlowerPot: async (req, res) => {
        try {
            const item = await Flowerpot.findByIdAndDelete(req.params.id);
            res.status(204).json({ msg: "El siguiente ítem fue eliminado", item });
        } catch (error) {
            res.status(400).json({ msg: "El ítem no pudo ser eliminado" })
        }
    },
};

module.exports = controllers;  