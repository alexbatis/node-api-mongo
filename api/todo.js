// Module dependencies.
var express = require('express'),
router = express.Router(),
todo = require('../apiObjects/todo'),
l=require('../config/lib');

var api = {};


// GET ALL
api.todos = function (req, res) {
	var skip=null,limit=10;

	if(req.query.skip!=undefined)
		skip=req.query.skip;

	if(req.query.limit!=undefined)
		limit=req.query.limit;

	todo.getAllTodos(skip,limit, (err,data) => {

		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=200;
		}
		return res.status(statusCode).json(r);
	});  
};


// POST
api.addtodo = function (req, res) {

	if(req.body.todo==undefined) {
		var r=l.response(l.STATUS_ERR,'Invalid todo/key model provided','There was an error saving this data.');
		return res.status(500).json(r);
	}

	todo.addTodo(req.body.todo,	(err,data)=>{
		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=201;
		}
		return res.status(statusCode).json(r);
	});
};


// GET
api.todo = function (req, res) {

	var id = req.params.id;

	if(id===null || id===undefined){
		res.status(402).json(l.response(l.STATUS_ERR,null,'No ID Provided'));
	}

	todo.getTodo(id, (err,data)=>{
		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
			statusCode=(data===404)?404:500;
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=200;
		}
		return res.status(statusCode).json(r);
	}); 
};


// PUT
api.editTodo = function (req, res) {
	var id = req.params.id;

	if(id===null || id===undefined){
		res.status(402).json(l.response(l.STATUS_ERR,null,'No ID Provided'));
	}

	if(req.body.todo==undefined) {
		var r= l.response(l.STATUS_ERR,'Invalid todo/key model provided','There was an error updating this data.');
		return res.status(500).json(r);
	}

	return todo.editTodo(id,req.body.todo,(err,data)=>{
		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
			statusCode=(data===404)?404:500;
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=202;
		}
		return res.status(statusCode).json(r);
	});

};


// DELETE
api.deleteTodo = function (req, res) {
	var id = req.params.id;

	if(id===null || id===undefined){
		res.status(402).json(l.response(l.STATUS_ERR,null,'No ID Provided'));
	}

	return todo.deleteTodo(id, (err,data)=>{
		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
			statusCode=(data===404)?404:500;
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=202;
		}
		return res.status(statusCode).json(r);
	});
};


// DELETE All
api.deleteAllTodos = function (req, res) {
	return todo.deleteAllTodos( (err,data)=>{
		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
			statusCode=(data===404)?404:500;
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=202;
		}
		return res.status(statusCode).json(r);
	});
};



// SEARCH
api.searchTodos=function(req,res){
	var skip=null,limit=10,keyword='',strict='';

	if(req.query.skip!=undefined)
		skip=req.query.skip;

	if(req.query.limit!=undefined)
		limit=req.query.limit;

	if(req.query.keyword!=undefined)
		keyword=req.query.keyword;

	if(req.query.strict!=undefined)
		strict=req.query.strict;
	else
		strict=false;

	strict = (strict=='true' || strict=='True' || strict==1)?true:false;


	var k={};
	var kObj=keyword.split(',').forEach(function(key) {
		var k1=key.split(':');
	      k[k1[0]]=k1[1];
	 });

	todo.searchTodos(skip,limit,k,strict, (err,data) => {
		var r={},statusCode=500;

		if(err){
			r=l.response(l.STATUS_ERR,null,err);
		}else{
			r=l.response(l.STATUS_OK,data,null);
			statusCode=202;
		}
		return res.status(statusCode).json(r);
	}); 
};




/*
=====================  ROUTES  =====================
*/


router.post('/todo',api.addtodo);

router.route('/todo/:id')
.get(api.todo)
.put(api.editTodo)
.delete(api.deleteTodo);


router.route('/todos')
.get(api.todos)
.delete(api.deleteAllTodos);

/*
	SEARCH
	e.g.: /api/todos/search?keyword=first:Sam,last:Jones
 */
router.get('/todos/search',api.searchTodos);

//New quick Response Handling
router.get('/todos/test', (req,res)=>
	todo.test( (data)=>l.response(res,data) )
);

module.exports = router;
