
var person = {
  name: 'Datta',
  age: '26'
};

var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

var personObject = JSON.parse(personJSON);

console.log(personObject.name);
console.log(typeof personObject);

var comet = '{"name":"Halley"}';

var cometObject = JSON.parse(comet);

cometObject.age = 24;

console.log(JSON.stringify(cometObject));
