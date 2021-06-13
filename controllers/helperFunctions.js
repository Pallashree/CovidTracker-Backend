function covidLevelGenerator(number) {
  var levelsArray = [];
  for(var i = 0; i < 5; i++) {
     var levelNumber = ((number/5) + (i*number));
     levelsArray.push(levelNumber);
  }

  return levelsArray;
}

function averageCases(Confirmed, Active, Recovered, Death) {
  const averageConfirmedCases = (Confirmed/36)
  const averageActiveCases = (Active/36);
  const averageRecoveredCases = (Recovered/36);
  const averageDeathCases = (Death/36);

  return [
    averageConfirmedCases,
    averageActiveCases,
    averageRecoveredCases,
    averageDeathCases
  ]
}

function covidLevelCalculator(cases, array) {
  if(cases <= array[0]) {

     return 1;

  } else if (cases <= array[1] && cases > array[0]) {

    return 2;

  } else if(cases <= array[2] && cases > array[1]) {

    return 3;

  } else if(cases <= array[3] && cases > array[2]) {

    return 4;

  } else if(cases <= array[4] && cases > array[3]) {

    return 5;

  } else if(cases > array[4]) {

    return 6;
  }

}

module.exports = { covidLevelGenerator, averageCases, covidLevelCalculator };