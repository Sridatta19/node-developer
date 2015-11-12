
var accounts = [];
var findAccount = '';

var createAccount = function(amount, userName){
  accounts.push({
    balance: amount,
    username: userName
  })
}

function findByUsername(element, index, array) {
  return element.username === findAccount;
}

var getAccount = function(username){
  findAccount = username;
  return accounts.find(findByUsername);
}

var deposit = function(account, amount){
  account.balance += amount;
}
var withdraw = function(account, amount){
  account.balance -= amount;
}
var balance = function(account){
  return account.balancel
}

createAccount(20, 'datta');

var myAccount = getAccount('datta');

deposit(myAccount, 40);

withdraw(myAccount, 30);

console.log(myAccount.balance);
