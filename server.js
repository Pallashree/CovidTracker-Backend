const express = require('express');
const cors = require('cors');
const covidDataIndiaStateRouter = require('./controllers/IndiaStateController/covidDataIndiaStateController');
const covidDataStateDistrictRouter = require('./controllers/StateDistrictController/covidDataStateDistrictController');
require('./models/dbConnection');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

app.listen(port, () => {
  console.log(`Express server Running at port: ${port}`);
});

app.use('/Api', covidDataIndiaStateRouter);
app.use('/Api', covidDataStateDistrictRouter);


