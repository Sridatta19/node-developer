
var argv = require('yargs')
    .command('hello', 'Greets the user', function(yargs) {
      yargs.options({
        name: {
          demand: true,
          alias: 'n',
          description: 'Your first name goes here',
          type: 'string'
        },
        lastname: {
          demand: true,
          alias: 'l',
          description: 'Your last name goes here',
          type: 'string'
        }
      }).help('help')
    })
    .help('help')
    .argv;

var command = argv._[0];

if(command === 'hello' && argv.name && argv.lastname){
    console.log('hello ' + argv.name + ' ' + argv.lastname + '!!');
}else if(command){
    console.log('Hello World!');
}
