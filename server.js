var express  = require('express');
var mongoose = require('mongoose');                     
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 

var app = express(); 

//config

// mongoose.connect(maybe some deploy URI here);  
mongoose.connect('mongodb://boyao:mvpapp@jello.modulusmongo.net:27017/unYqaj8y');    

app.use(express.static(__dirname + '/client'));               
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));          
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

var Stash = mongoose.model('Stash', {
  text: {
	type : String,
	default: ''
  }
});



// routes
  
// get all inputs
app.get('/api/inputs', function(req, res) {

    // use mongoose to get all inputs in the database
  Stash.find(function(err, inputs) {

        // if there is an error retrieving, send the error
    if (err) {
      res.send(err)
    }
    res.json(inputs); // return all inputs in JSON format
    });
});

// create input and send back all inputs 
app.post('/api/inputs', function(req, res) {

    // create a input AJAX
	  Stash.create({
	    text : req.body.text,
	    done : false
	  }, function(err, input) {
	    if (err)
	      res.send(err);

        // get and return all the inputs after you create another
	  Stash.find(function(err, inputs) {
	    if (err)
	        res.send(err)
	    res.json(inputs);
	  });
  });

});

// delete a input
app.delete('/api/inputs/:input_id', function(req, res) {
    Stash.remove({
      _id : req.params.input_id
    }, function(err, input) {
      if (err)
        res.send(err);

        // get and return all the inputs after you create another
        Stash.find(function(err, inputs) {
          if (err)
            res.send(err)
          res.json(inputs);
        });
    });
});     

 // application

app.get('*', function(req, res) {
    res.sendfile('./client/index.html'); // load the single view file 
});

// listen (start app with node server.js) 
app.listen(8080);
console.log("App listening on port 8080"); 
