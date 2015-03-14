var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    errorHandler = require('errorhandler'),
    routes = require('./routes')

var mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog',
    db = mongoose.connect(dbUrl, {safe: true});

// model list
var Article = require('./models/article');



var app = express()

app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Enables CORS
var enableCORS = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
 
// enable CORS!
app.use(enableCORS);
//--------------


// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}



// REST API routes
app.get('/api/articles', routes.article.list);
app.get('/api/articles/:id', routes.article.show);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.delete('/api/articles/:id', routes.article.del);

app.all('*', function(req, res) {
  res.sendStatus(404);
})


// Start server
app.listen(app.get('port'), function(){
  console.log ('Express RESTful API server is running on port ' + app.get('port'));
})



