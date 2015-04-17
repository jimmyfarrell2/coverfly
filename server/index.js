var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));

app.use('/', require('./routes'));
app.use('/service', require('./serviceRoutes'));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	if (err.message.indexOf('duplicate key') !== -1) res.send('Username already exists.');
	res.sendStatus(err.status || 500);
});

app.listen(9000, function() {
	console.log('Server is running...');
});

module.exports = app;