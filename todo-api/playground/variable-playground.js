var R = require('ramda');

var person = {
  'name': 'Andrew',
  'age': 21
}

function updatePerson(){
  return {
    'age': 24
  }
}

console.log(R.merge(person, updatePerson()));
