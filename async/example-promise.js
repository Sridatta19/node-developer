//
// function doWork(data, callback){
//   callback('done');
// }
//
// function doWorkPromise(data){
//   return new Promise(function(resolve, reject){
//     setTimeout(function(){
//         reject('everything is broken!');
//     },1000)
//       // reject({
//       //   error: 'something bad happened'
//       // });
//   });
// }
//
// doWorkPromise('some data').then(function(data){
//   console.log(data);
// }, function(error){
//   console.log(error);
// });
var request = require('request');

function getWeather(city){
    return new Promise(function(resolve, reject){
      console.log('City: ' + city);
      var encodedLocation = encodeURIComponent(city);
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&units=metric&appid=2de143494c0b295cca9337e1e96b00e0';
      request({
        url: url,
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

getWeather('Pune').then(function(currentWeather){
  console.log(currentWeather);
}, function(error){
  console.log(error);
})
