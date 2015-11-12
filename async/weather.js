var request = require('request');

module.exports = function(city){
  return new Promise(function(resolve, reject){
    var encodedLocation = encodeURIComponent(city);
    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&units=metric&appid=2de143494c0b295cca9337e1e96b00e0';

    if(!city){
      return reject('No Location Provided');
    }

    request({
      url: weatherURL,
      json: true,
    }, function(error, response, body){
        if(error){
          reject('Unable to fetch Weather data');
        } else {
          resolve('It\'s ' + body.main.temp + ' in ' + body.name + '!');
        }
    });
  })
}
