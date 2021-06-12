const path = require('path');
const csvtojson = require('csvtojson');
const createError = require('http-errors');
const CovidData = require('../models/covidDataSchema');
const stateCodeMappingObject = require('./dataMapping');

const routes = [
  {
     path: '/postCovidData',
     method: 'POST',
     handler: handlePostCovidData
  },
  {
    path: '/getDataAll',
    method: 'GET',
    handler: handleGetDataAll
  },
  {
    path: '/getDataAllStateWise',
    method: 'GET',
    handler: handleGetDataAllStateWise
  },
  {
    path: '/getDataStateWiseDaily',
    method: 'GET',
    handler: handleGetDataStateWiseDaily
  },

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

async function handlePostCovidData(req, res) {

  try {
      const dataSetPath = path.resolve(__dirname, "../datasets/state_wise_daily.csv");

      const covidJsonData = await csvtojson().fromFile(dataSetPath);

      const covidData = new CovidData({
             data: covidJsonData
         });

      covidData.save().then((data) => {
        if(!data) throw error;
        res.json(data);
      })
      .catch(error => {
        res.send(new createError.ExpectationFailed());
      });

  } catch (error) {
    res.send(new createError.InternalServerError());
  }

}

function handleGetDataAll(req, res) {
   try {

    var totalConfirmedCases = 0;
    var totalRecoveredCases = 0;
    var totalDeathCases = 0;
    
     CovidData.findOne({}).lean().then(async (result) => {


       const getConfirmedCasesArray = await result.data.filter(obj => obj.Status === "Confirmed");
       getConfirmedCasesArray.forEach((obj) => {
        totalConfirmedCases += Number(obj.TT);
        });

       
      const getRecoveredCasesArray = await result.data.filter(obj => obj.Status === "Recovered");
      getRecoveredCasesArray.forEach((obj) => {
          totalRecoveredCases += Number(obj.TT);
        });


      const getDeathCasesArray = await result.data.filter(obj => obj.Status === "Deceased");
      getDeathCasesArray.forEach((obj) => {
          totalDeathCases += Number(obj.TT);
      });

       
    const totalActiveCases = totalConfirmedCases - (totalRecoveredCases + totalDeathCases);
    const totalActivePercentage = (totalActiveCases/totalConfirmedCases) * 100;
    const totalRecoveredPercentage = (totalRecoveredCases/totalConfirmedCases) * 100; 
    const totalDeathPercentage = (totalDeathCases/totalConfirmedCases) * 100;


     res.json([
       {
         status: "Confirmed",
         data: {
          totalConfirmedCases
         },
       },
       {
        status: "Active",
        data: {
         totalActiveCases,
         totalActivePercentage
        }
       },
       {
        status: "Recovered",
        data: {
          totalRecoveredCases,
          totalRecoveredPercentage
        }
       },
       {
        status: "Deceased",
        data: {
          totalDeathCases,
         totalDeathPercentage
        }
       }
     ]);
         
     })
     .catch(error => {
      res.send(new createError.ExpectationFailed());
    });
     
   } catch (error) {
    res.send(new createError.InternalServerError());
   }
}


function handleGetDataAllStateWise(req, res) {
  try {
    var GetDataAllArrayStateWise = [];
    
     CovidData.findOne({}).lean().then((result) => {

    
        stateCodeMappingObject.forEach((state) => {

          var ConfirmedCases = 0;
          var RecoveredCases = 0;
          var DeathCases = 0;
  
          const getConfirmedCasesArray = result.data.filter(obj => obj.Status === "Confirmed");
            getConfirmedCasesArray.forEach((obj) => {
              ConfirmedCases += Number(obj[state.code]);
            });

            const getRecoveredCasesArray = result.data.filter(obj => obj.Status === "Recovered");
            getRecoveredCasesArray.forEach((obj) => {
               RecoveredCases += Number(obj[state.code]);
            });

            const getDeathCasesArray = result.data.filter(obj => obj.Status === "Deceased");
            getDeathCasesArray.forEach((obj) => {
               DeathCases += Number(obj[state.code]);
            });

           GetDataAllArrayStateWise.push({
             name: state.name,
             ConfirmedCases,
             RecoveredCases,
             DeathCases
           })
            
          });

      res.json(GetDataAllArrayStateWise);
    
         
     })
     .catch(error => {
      res.send(new createError.ExpectationFailed());
    });
    
    
  } catch (error) {
    res.send(new createError.InternalServerError());
  }
}

function handleGetDataStateWiseDaily(req, res) {
  try {
    if(!req.query) throw new createError.BadRequest();
    else {

      const { stateCode, timeSpan } = req.query;

      const GetDataStateWiseDaily = [
        {
          status: "Confirmed",
          data: []
        },
        {
          status: "Recovered",
          data: []
        },
        {
          status: "Deceased",
          data: []
        }
      ];

      CovidData.findOne({}).lean().then((result) => {


          const getConfirmedCasesArray = result.data.filter(obj => obj.Status === "Confirmed").slice(-Number(timeSpan));
          getConfirmedCasesArray.forEach((obj) => {
            const Date = obj.Date;
            const count = obj[stateCode];
            GetDataStateWiseDaily[0].data.push({
              Date,
              count
            });
          });

          const getRecoveredCasesArray = result.data.filter(obj => obj.Status === "Recovered").slice(-Number(timeSpan));
            getRecoveredCasesArray.forEach((obj) => {
              const Date = obj.Date;
              const count = obj[stateCode];
              GetDataStateWiseDaily[1].data.push({
                Date,
                count
              });
            });

            const getDeathCasesArray = result.data.filter(obj => obj.Status === "Deceased").slice(-Number(timeSpan));
            getDeathCasesArray.forEach((obj) => {
              const Date = obj.Date;
              const count = obj[stateCode];
              GetDataStateWiseDaily[2].data.push({
                Date,
                count
              });
            });


            res.json(GetDataStateWiseDaily);

      }).catch((error) => {
        res.send(new createError.ExpectationFailed());
      })
    } 
    
  } catch (error) {
    res.send(new createError.InternalServerError());
  }
}
module.exports = {routes, setRoutes};


