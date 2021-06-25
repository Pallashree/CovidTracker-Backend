const mongoose = require('mongoose');
const districtSchemaObject = require('./dataSetSchema');

const covidDataDistrictSchema = new mongoose.Schema({
  state: {
    type: String
  },
  districtData: [districtSchemaObject]
});

const CovidDistrictData = mongoose.model("CovidDistrictData", covidDataDistrictSchema);

module.exports = CovidDistrictData;