
var crypto = require('crypto-js');

var newObject = {
  name: 'Ben',
  secretName: '007'
}

var secretKey = 'secret';

var cryptedMessage = crypto.AES.encrypt(JSON.stringify(newObject), secretKey);
console.log('Encrypted Message: ' + cryptedMessage);

var bytes = crypto.AES.decrypt(cryptedMessage, secretKey);
var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log(decryptedMessage);
console.log(decryptedMessage.secretName);
