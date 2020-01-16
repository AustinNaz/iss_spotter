const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIp('207.228.85.169', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coordinates:' , data);
// });

// fetchISSFlyOverTimes({lat: '49.27670', lon: '-123.13000'}, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coordinates:' , data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const times of passTimes) {
    // console.log
    let dateTime = new Date(times['risetime'] * 1000);
    console.log('Next pass at ' + dateTime.toString() + ` for ${times.duration} seconds!`);
  }
});