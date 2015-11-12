
var request = require('request');
var locationURL = 'http://ipinfo.io';

module.exports = function(){
  return new Promise(function(resolve, reject){
    request({
      url: locationURL,
      json: true,
    }, function(error, response, body){
        if(error){
          reject();
        }else{
          resolve(body);
        }
    });
  })
};
