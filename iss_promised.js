const request = require('request-promise-native');

const nextISSTimesForMyLocation = () => {
 return fetchMyIP()
.then(ip => fetchCoordsByIP(ip)
.then(coords => fetchISSFlyOverTimes(coords)
.then(flyTimes => {
  riseTimes = JSON.parse(flyTimes).response;

  for (const times of riseTimes) {
    let dateTime = new Date(times['risetime'] * 1000)
    console.log('Next pass at ' + dateTime.toString() + ` for ${times.duration} seconds!`);
  }
  return flyTimes;
})));
}

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(ip) {
  ip = JSON.parse(ip).ip
  return request(`https://ipvigilante.com/json/${ip}`)
};

const fetchISSFlyOverTimes = function(coords) {
  flyTimes = JSON.parse(coords).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${flyTimes.latitude}&lon=${flyTimes.longitude}`)
}

module.exports = { nextISSTimesForMyLocation };