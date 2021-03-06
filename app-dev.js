var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config/app');

var homeController = require('./controllers/home');
var rankingController = require('./controllers/ranking');
var voteController = require('./controllers/vote');
var adminController = require('./controllers/admin');

var port = process.env.PORT || config.app.port;
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('static'));

app.get('/', homeController.home);
app.get('/ranking', rankingController.ranking);
app.get('/vote/:leftcatid/:rightcatid/:victory', voteController.vote);
app.get('/admin/index', adminController.admin);
app.get('/admin/ranking/reset', adminController.rankingReset);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

app.listen(port, function () {
    console.log('Server running at http://' + config.app.host + ':' + port + '/');
});
