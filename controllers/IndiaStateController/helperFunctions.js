function covidLevelGenerator(Diff) {
  var levelsArray = [];
  for(var i = 0; i < 10; i++) {
     var levelNumber = ((Diff/10) + (i*(Diff/10)));
     levelsArray.push(levelNumber);
  }

  return levelsArray;
}

function covidLevelCalculator(ConfirmMax, ActiveMax, RecoveredMax, DeathMax, ConfirmMin, ActiveMin, RecoveredMin, DeathMin ) {
   const ConfirmedDiff = (ConfirmMax - ConfirmMin)
   const ActiveDiff = (ActiveMax - ActiveMin)
   const RecoveredDiff = (RecoveredMax - RecoveredMin)
   const DeathDiff = (DeathMax - DeathMin)
   

   const ConfirmLevels = covidLevelGenerator(ConfirmedDiff);
   const ActiveLevels = covidLevelGenerator(ActiveDiff);
   const RecoveredLevels = covidLevelGenerator(RecoveredDiff);
   const DeathLevels = covidLevelGenerator(DeathDiff);

   return {
    ConfirmLevels,
    ActiveLevels,
    RecoveredLevels,
    DeathLevels
   }

}

function covidLevelSetter(cases, levels) {
  if(cases <= levels[0]) {

    return 1;

 } else if (cases <= levels[1] && cases > levels[0]) {

   return 2;

 } else if(cases <= levels[2] && cases > levels[1]) {

   return 3;

 } else if(cases <= levels[3] && cases > levels[2]) {

   return 4;

 } else if(cases <= levels[4] && cases > levels[3]) {

   return 5;

 } else if(cases <= levels[5] && cases > levels[4]) {

  return 6;

} else if(cases <= levels[6] && cases > levels[5]) {

  return 7;

} else if(cases <= levels[7] && cases > levels[6]) {

  return 8;

} else if(cases <= levels[8] && cases > levels[7]) {

  return 9;

} else if(cases <= levels[9] && cases > levels[8]) {

  return 10;

} else if(cases > levels[9]) {

  return 11;

} 
}


function findMax(ConfirmedArr, ActiveArr, RecoveredArr, DeathArr) {
  const ConfirmMax = Math.max.apply(Math, ConfirmedArr);
  const ActiveMax = Math.max.apply(Math, ActiveArr);
  const RecoveredMax = Math.max.apply(Math, RecoveredArr);
  const DeathMax = Math.max.apply(Math, DeathArr);

  return {
    ConfirmMax,
    ActiveMax,
    RecoveredMax,
    DeathMax
  }
}

function findMin(ConfirmedArr, ActiveArr, RecoveredArr, DeathArr) {
  const ConfirmMin = Math.min.apply(Math, ConfirmedArr);
  const ActiveMin = Math.min.apply(Math, ActiveArr);
  const RecoveredMin = Math.min.apply(Math, RecoveredArr);
  const DeathMin = Math.min.apply(Math, DeathArr);

  return {
    ConfirmMin,
    ActiveMin,
    RecoveredMin,
    DeathMin
  }
}

module.exports = { covidLevelSetter, covidLevelCalculator, findMax, findMin };