/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIP = function(callback) {
  const ipString = 'https://api.ipify.org?format=json';

  request(ipString, (error, response, body) => {
    if (response && response.statusCode === 200) {
      if (!Object.keys(JSON.parse(body)).length) {
        // console.log('Cat breed not found');
        callback(null, null);
      } else {
        callback(null, JSON.parse(body).ip.trim());
      }
    } else {
      callback(Error(error), null);
    }
  });
};

const fetchCoordsByIp = function(ip, callback) {
  const issString = 'https://ipvigilante.com/json/';
  request(issString + ip, (error, response, body) => {
    if (response && response.statusCode === 200) {
      callback(null, JSON.parse(body).data);
    } else {
      callback(JSON.parse(body), null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const flyString = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(flyString, (error, response, body) => {
    if (response && response.statusCode === 200) {
      callback(null, JSON.parse(body).response);
    } else {
      callback(JSON.parse(body), null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP(function(err, ip) {
    if (err) return;
    fetchCoordsByIp(ip, function(err, coords) {
      if (err) return;
      fetchISSFlyOverTimes(coords, function(err, flyString) {
        if (!err) {
          callback(null, flyString);
        } else {
          callback(err, null);
        }
      });
    });
  });
  // empty for now
  // fetchISSFlyOverTimes(fetchCoordsByIp())
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};