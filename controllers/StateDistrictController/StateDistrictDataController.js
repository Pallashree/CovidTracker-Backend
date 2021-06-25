const csvtojson = require('csvtojson');
const createError = require('http-errors');
const path = require('path');
const CovidDistrictData = require('../../models/StateDistrictModel/covidDataStateDistrictSchema');
const { stateCodeMappingObject } = require('../IndiaStateController/dataMapping');

const routes = [
    {
       path: '/postCovidDataDistrictWise',
       method: 'POST',
       handler: handlePostCovidDataDistrictWise
    },
    {
        path: '/test',
        method: 'GET',
        handler: handleGetData
     }
  
  ];
  
  function setRoutes(routes, router) {
  
    routes.forEach((route) => {
      switch(route.method) {
        case 'GET': 
           router.get(route.path, route.handler);
           break;
        case 'POST':
          router.post(route.path, route.handler);
          break;
        case 'PUT': 
          router.put(route.path, route.handler);
          break;
        case 'DELETE':
          router.delete(route.path, route.handler);
          break;
        default:
          break;
      }
    });
    return router;
  }

  async function handlePostCovidDataDistrictWise(req, res) {
    try {
        const dataSetPath = path.resolve(__dirname,"../../datasets/districts.csv");
  
        const covidJsonData = await csvtojson().fromFile(dataSetPath);
        
        var districtData = [];
        var covidDistrictData = [];

        stateCodeMappingObject.forEach(async (state) => {
          covidJsonData.forEach((obj) => {
            if(state.name === obj.State) {
               districtData.push({
                 Date: obj.Date,
                 District: obj.District,
                 Confirmed: obj.Confirmed,
                 Recovered: obj.Recovered,
                 Deceased: obj.Deceased
               });
            }
          });

          // covidDistrictData.push({
          //   state: state.name,
          //   districtData: districtData
          // });

          new CovidDistrictData({
              state: state.name,
              districtData: districtData
          }).save();

          districtData = [];
          
        });

        res.json("Inserted!");
  
    } catch (error) {
      res.send(new createError.InternalServerError())
    } 
  }

  function handleGetData(req, res) {
      res.send("Hello!");
  }

  module.exports = {routes, setRoutes};