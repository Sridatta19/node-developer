var Sequelize = require('sequelize');
var R = require('ramda');
var sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite',
  'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
  description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 250]
      }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

var printTodo = function(todo){
  console.log(todo.toJSON())
}

sequelize.sync().then(function(){
    console.log('Everything is Synced')

    Todo.findById(2).then(function(todo){
      if(todo){
        printTodo(todo)
      }else{
        console.log('no todo found!');
      }
    }).catch(function(err){
        console.log(err)
    })

    // Todo.create({
    //   description: 'Read a Book'
    // }).then(function(todo){
    //   return Todo.create({
    //     description: 'Walk the Dog'
    //   })
    // }).then(function(){
    //   // return Todo.findById(1)
    //   return Todo.findAll({
    //     where: {
    //       description: {
    //           $like: '%Book%'
    //       }
    //     }
    //   })
    // }).then(function(todos){
    //   if(todos){
    //       R.forEach(printTodo)(todos)
    //   }else{
    //       console.log('no todos found!');
    //   }
    //
    // }).catch(function(e){
    //   console.log(e);
    // })
});
