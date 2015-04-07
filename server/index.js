var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var nodeSass = require('node-sass-middleware');

var app = express();

var sassMiddleware = nodeSass({
	src: path.join(__dirname, '../public'),
	dest: path.join(__dirname, '../public'),
	debug: true,
	prefix: '/css'
});
app.use(sassMiddleware);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));

app.use('/', require('./routes'));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500).send(err.status);
});

app.listen(9000, function() {
	console.log('Server is running...');
});

module.exports = app;