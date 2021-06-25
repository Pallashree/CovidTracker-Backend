const express = require('express');

const { routes, setRoutes } = require('./IndiaStateDataController');;

const covidDataIndiaStateRouter = express.Router();

module.exports = setRoutes(routes, covidDataIndiaStateRouter);
