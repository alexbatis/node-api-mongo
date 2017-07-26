var request = require('supertest'),
express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';

/*
 *  ==== POST === 
 */ 

//Simple POST
describe('POST New Todo', function(){
  it('creates new todo and responds with json success message', function(done){
    request(app)
    .post('/api/todo')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"todo": {"title":"541 shooting, 13.","description":"Rowing is carried out from the boat-house across Christ Church Meadow.","completed":true,"created":"1998-10-18T14:46:57.261Z"}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body.data._id;
      done();
    });
  });
});

//Incorrect POST
describe('POST New Item Incorrectly', function(){
  it('Does not create new "item" and responds with json error message', function(done){
    request(app)
    .post('/api/todo')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"todoX": {"title":"541 shooting, 13.","description":"Rowing is carried out from the boat-house across Christ Church Meadow.","completed":true,"created":"1998-10-18T14:46:57.261Z"}})
    .expect(500)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      done();
    });
  });
});



/*
 *  ==== GET === 
 */ 

// Get List of Todos
describe('GET List of Todos', function(){
  it('responds with a list of todo items in JSON', function(done){
    request(app)
    .get('/api/todos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

// Get Single Todos
describe('GET Todo by ID', function(){
  it('responds with a single todo item in JSON', function(done){
    request(app)
    .get('/api/todo/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


// Get Single Todo Incorrectly
describe('GET Item by Incorrect ID', function(){
  it('responds with a error status for "item" in JSON', function(done){
    request(app)
    .get('/api/todo/'+ _id+'X' )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404, done);
  });
});




/*
 *  ==== PUT === 
 */ 

//Simple PUT
describe('PUT Todo by ID', function(){
  it('updates todo item in return JSON', function(done){
    request(app)
    .put('/api/todo/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "todo": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(202, done);
  });
});

// PUT with Incorrect id
describe('PUT Item by Incorrect ID', function(){
  it('Does not update "item" & return JSON with error status', function(done){
    request(app)
    .put('/api/todo/'+ _id +'X')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "todo": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(404, done);
  });
});

// PUT with Incorrect data
describe('PUT Item by Incorrect data', function(){
  it('Does not update "item" & return JSON with error status', function(done){
    request(app)
    .put('/api/todo/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "todoX": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(500, done);
  });
});



/*
 *  ==== DELETE === 
 */ 

//Simple Delete
describe('DELETE Todo by ID', function(){
  it('should delete todo and return 200 status code', function(done){
    request(app)
    .del('/api/todo/'+ _id) 
    .expect(202, done);
  });
});

//Incorrect Delete
describe('DELETE Item by Incorrect ID', function(){
  it('should NOT delete item and return 500 status code', function(done){
    request(app)
    .del('/api/todo/'+ _id+'X') 
    .expect(500, done);
  });
});
