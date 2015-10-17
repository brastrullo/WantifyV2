//enclosed in IIFE to preserve global variables
(function(){
  //set dependencies
  var express = require('express');
  var app = express();
  //handlebar engine
  var handlebars = require('express3-handlebars').create({defaultLayout:'main' });
  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
  //Set port to 3000
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(__dirname + '/public'));
  //Routes
  app.get('/', function(req, res){
    res.render('home');
  });
  //route 404 not found
  app.use(function(req, res, next){
    res.status(404);
    res.send('404');
  });
  //route 500 server error
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });
  //Set listener
  app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + 
      app.get('port') + '; press Ctrl-C to terminate.');
  });

}());//IIFE