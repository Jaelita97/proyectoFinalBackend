const express = require('express');
const path = require('path');
const cookieParser=require("cookie-parser");
const logger = require('morgan');
const session= require("express-session");
const cors = require("cors");
require("dotenv").config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const flowerpotsRouter= require('./routes/flowerpot');

const { connect } = require ("./db/db")


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
secret:process.env.SECRET_SESSION, 
resave:true, 
saveUninitialized: true
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flowerPots', flowerpotsRouter)

connect();

module.exports = app;
