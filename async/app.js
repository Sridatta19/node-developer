var weather = require('./weather');
var location = require('./location');

var argv = require('yargs')
    .option('location', {
      demand: false,
      type: 'string',
      alias: 'l',
      description: 'indicates the name of city for which weather data needs to be displayed'
    })
    .help('help')
    .argv;


if(argv.l){
  console.log('Location was Provided');
  weather(argv.l).then(function(message){
    console.log(message);
  }).catch(function(error){
    console.log(error);
  });
}else {
  console.log('Location was not Provided');
  location().then(function(body){
      return weather(body.city);
  }).then(function(message){
    console.log(message);
  }).catch(function(error){
    console.log(error);
  });
}
