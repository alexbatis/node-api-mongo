// Module dependencies.
var mongoose = require('mongoose'),
Todo = mongoose.models.Todo,
api = {},
l=require('../config/lib');


/*
========= [ CORE METHODS ] =========
*/

// ALL
api.getAllTodos = function (skip,limit,cb) {
  var q=Todo.find();
  
  if(skip!=undefined)
    q.skip(skip*1);

  if(limit!=undefined)
    q.limit(limit*1);

  return q.exec( (err, todos)=>{
    cb(err,{todos:todos,count:todos.length}) 
  });
};

// GET
api.getTodo = function (id,cb) {

  Todo.findOne({ '_id': id }, (err, todo)=>{
    if(todo===null) {
      return cbf(cb,'No Data Found',404);
    }
    return cb(err,todo);
  });
};

// POST
api.addTodo = function (todo,cb) {

  if(todo === 'undefined'){
    cb('No Todo Provided. Please provide valid todo data.');
  }

  todo = new Todo(todo);

  todo.save((err)=>{
    cb(err,todo.toObject());
  });
};

// PUT
api.editTodo = function (id,updateData, cb) {

  if(updateData===undefined ){
    return cb('Invalid Data. Please Check todo and/or updateData fields',null); 
  }

  Todo.findById(id, (err, todo)=>{
   
    //Force Error
    if(todo===null){
     return cb('No Data Found',404); 
    }

    
  
  
    if(typeof updateData["title"] != 'undefined'){
      todo["title"] = updateData["title"];
    }
    
    if(typeof updateData["description"] != 'undefined'){
      todo["description"] = updateData["description"];
    }
    
    if(typeof updateData["completed"] != 'undefined'){
      todo["completed"] = updateData["completed"];
    }
    
    if(typeof updateData["created"] != 'undefined'){
      todo["created"] = updateData["created"];
    }
    

  var data=todo.toObject(); //trim unnecessary data

  return todo.save( (err)=>{
    cb(err,data); 
    }); //eo todo.save
  });// eo todo.find
};

// DELETE
api.deleteTodo = function (id,cb) {
  return Todo.findById(id).remove().exec( (err, todo)=>{
    var data='The todo got Deleted';
    if(err) data = 'Error in deleting this todo';
   return cb(err,data);      
 });
};


/*
========= [ SPECIAL METHODS ] =========
*/


//TEST
//New Callback System in TEST, which returns a ResponseClass object's Output
api.test=function (cb) {
  return l.responseCallback(cb,false,{name:'dummyValue'});
};

//DELETE ALL
api.deleteAllTodos = function (cb) {
  return Todo.remove({}, (err)=>{
    var data='All todos got Deleted';
    if(err) data = 'Error in deleting all todos';
   return cb(err,data);      
  });
};


// SEARCH
api.searchTodos = function (skip,limit,keywordObj,strict,cb) {
  var k={};

  if(strict){
    k=keywordObj;
  }else{
    Object.keys(keywordObj).forEach(function(key,index) {
        k[key]=new RegExp(keywordObj[key], 'i');
    });
  }

  var q=Todo.find(k)
  
  if(skip!=undefined)
    q.skip(skip*1);

  if(limit!=undefined)
    q.limit(limit*1);

  return q.exec( (err, todos)=>{
    cb(err,todos) 
  });
};


module.exports = api;
