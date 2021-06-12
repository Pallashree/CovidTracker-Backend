const mongoose = require('mongoose');
const dataSetSchemaObject = require('./dataSetSchema');

const covidDataSchema = new mongoose.Schema({
  data: [dataSetSchemaObject]
});

const CovidData = mongoose.model("CovidData", covidDataSchema);

module.exports = CovidData;