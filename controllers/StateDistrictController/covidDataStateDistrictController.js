const express = require('express');

const { routes, setRoutes } = require('./StateDistrictDataController');;

const covidDataStateDistrictRouter = express.Router();

module.exports = setRoutes(routes, covidDataStateDistrictRouter);