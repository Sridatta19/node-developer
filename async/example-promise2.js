//
// function doWork(shouldFail){
//   return new Promise(function(resolve, reject){
//       setTimeout(function(){
//           if(typeof shouldFail === 'boolean' && shouldFail === true){
//             reject('error message')
//           }else{
//             resolve('success');
//           }
//       }, 1000)
//   });
// }
//
// doWork(true).then(function(message){
//   console.log(message);
//   return doWork(true);
// }).then(function(message){
//   console.log(message)
// }).catch(function(error){
//   console.log(error);
// });

var request = require('request');

function getLocation() {
  //  return Promise
  //  resolve('Philadelphia')
  var locationURL = 'http://ipinfo.io';
  return new Promise(function(resolve, reject){
    request({
      url: locationURL,
      json: true,
    }, function(error, response, body){
        if(error){
          reject();
        }else{
          console.log('My City: ' + body.city);
          resolve(body.city);
        }
    });
  })
}

function getWeather(city) {
    // return Promise
    // resolve('It\'s 78 in location')
    return new Promise(function(resolve, reject){
      console.log('City: ' + city);
      var encodedLocation = encodeURIComponent(city);
      console.log('Encoded City: ' + encodedLocation);
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&units=metric&appid=2de143494c0b295cca9337e1e96b00e0';
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

// getlocation.then
//     return getWeather(location)
// then
//     console.log(currentWeather)

  getLocation().then(function(city){
      return getWeather(city);
  }).then(function(message){
    console.log(message);
  }).catch(function(error){
    console.log(error);
  })
