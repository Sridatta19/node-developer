console.log('starting password manager');

var storage = require('node-persist');
var crypto = require('crypto-js');
var argv = require('yargs')
  .command('create', 'create account with the provided information', function(yargs){
      yargs.options({
        name: {
          demand: true,
          type: 'string',
          alias: 'n',
          description: 'indicates the type of account that need to be persisted'
        },
        username: {
          demand: true,
          type: 'string',
          alias: 'u',
          description: 'indicates the user name of the account'
        },
        password: {
          demand: true,
          type: 'string',
          alias: 'p',
          description: 'indicates the password of the account'
        },
        masterPassword: {
          demand: true,
          type: 'string',
          alias: 'm',
          description: 'indicates the secret key of password manager'
        }
      }).help('help')
  })
  .command('get', 'find the account by user name', function(yargs){
      yargs.options({
        name: {
          demand: true,
          type: 'string',
          alias: 'n',
          description: 'find the account by user name'
        },
        masterPassword: {
          demand: true,
          type: 'string',
          alias: 'm',
          description: 'indicates the secret key of password manager'
        }
      }).help('help')
  })
  .help('help')
  .argv;

storage.initSync();

// storage.setItemSync('accounts', [{
//   username: 'Datta',
//   balance: 0
// }]);
var findByName = '';

var command = argv._[0];

var createAccount = function(accountName, userName, psswd, masterPassword){
  var accounts = getAccounts(masterPassword);
  if(!accounts){
    accounts = [];
  }
  accounts.push({
    name: accountName, username: userName, password: psswd
  });
  var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword)
  storage.setItemSync('accounts', encryptedAccounts.toString());
}

function findAccountByName(element, index, array) {
  return element.name === findByName;
}

var getAccounts = function(masterPassword){
  var encryptedAccounts = storage.getItemSync('accounts');
  if(encryptedAccounts){
    var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return accounts;
  }else{
    return null;
  }
}

var getAccount = function(accountName, masterPassword){

  var accounts = getAccounts(masterPassword);
  if(accounts){
    findByName = accountName;
    return accounts.find(findAccountByName);
  }else{
    return false;
  }
}

 if(command === 'create' && argv.name && argv.username && argv.password && argv.masterPassword){
   try{
     createAccount(argv.name, argv.username, argv.password, argv.masterPassword);
     console.log('Account Created');
   }catch(e){
     console.log('Unable to create account');
   }
 } else if (command === 'get' && argv.name  && argv.masterPassword){
   try{
     var myAccount = getAccount(argv.name, argv.masterPassword);
     if(myAccount){
       console.log('account found');
       console.log(myAccount);
     }else{
       console.log('account not found');
     }
   }catch(e){
     console.log('Unable to fetch account');
   }
 }
