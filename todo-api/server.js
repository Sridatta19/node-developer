
var R = require('ramda');
var bodyParser = require('body-parser');
var express = require('express');
var db = require('./db');

var app = express();
var port = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
var todoId;

app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send('Todo API root')
});

var incompleteTasks = function(blnValue){
  return R.filter(R.whereEq({completed: blnValue}))
}

var containsStr = function(queryStr, prop){
  return prop.toLowerCase().indexOf(queryStr) != -1
}

var filteredTasks = function(queryStr){
  return R.partition(R.compose(R.curry(containsStr)(queryStr), R.prop('description')))
}

app.get('/todos', function(req, res){
  var queryParams = req.query;
  var filteredTodos;
  if(queryParams.hasOwnProperty('completed')){
      filteredTodos = incompleteTasks(queryParams.completed == 'true' ? true : false)(todos);
  }else{
    filteredTodos = todos;
  }

  if(queryParams.hasOwnProperty('q')){
      filteredTodos = filteredTasks(queryParams.q)(filteredTodos)[0];
  }

  res.json(filteredTodos);
});

app.get('/todo/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10)

  // var matchedTodo = R.find(R.propEq('id', todoId))(todos)
  // if(matchedTodo){
  //   res.json(matchedTodo)
  // }else{
  //   res.status(404).send()
  // }

  var matchedTodo = db.todo.findById(todoId).then(function(todo){
      if(todo){
        res.json(todo.toJSON());
      }else{
        res.status(404).send();
      }
   }, function(err){
      res.status(500).send(err)
   });
});

app.post('/todos', function(req, res){
  var newTodo = R.pick(['description','completed'])(req.body);
  db.todo.create(newTodo).then(function(todo){
    res.json(todo.toJSON());
   }, function(err){
      res.status(404).json(err)
   });

  // newTodo.id = todoNextId++;
  // todos = R.append(newTodo, todos)
  // res.json(todos);
  
});

var isEquals = function(todo){
  return todo.id == todoId;
};

app.delete('/todo/:id', function(req, res){
  todoId = parseInt(req.params.id, 10)
  var matchedTodo = R.find(R.propEq('id', todoId))(todos)
  console.log(matchedTodo)
  if(matchedTodo){
    todos = R.reject(isEquals, todos)
    res.json(matchedTodo)
  }else{
    res.status(404).json({"error":"no todo found with that id"})
  }
});

app.put('/todo/:id', function(req, res){
  todoId = parseInt(req.params.id, 10)
  var matchedTodo = R.find(R.propEq('id', todoId))(todos)
  if(matchedTodo){
    todos = R.reject(isEquals, todos)
    var newTodo = R.pick(['description','completed'])(req.body);
    newTodo = R.merge(matchedTodo, newTodo)
    todos = R.append(newTodo)(todos)
    res.json(newTodo)
  }else{
    res.status(404).json({"error":"no todo found with that id"})
  }
});

db.sequelize.sync().then(function(){
  app.listen(port, function(){
    console.log('express listening on port ' + port + '!')
  });
})
