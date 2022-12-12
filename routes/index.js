const express = require('express');
const indexRouter = express.Router();
const controllers = require('../controllers/indexController');

indexRouter.get('/', controllers.myIndex);

module.exports = indexRouter;
