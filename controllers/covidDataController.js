const express = require('express');

const { routes, setRoutes } = require('./helperController');;

const covidDataRouter = express.Router();

module.exports = setRoutes(routes, covidDataRouter);
