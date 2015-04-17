var express = require('express');
var path = require('path');
var models = require('./models');

var router = express.Router();

module.exports = router;

router.use(function(req, res, next) {
	if (req.query.artist) req.artist = filterInput(req.query.artist);
	if (req.query.song) req.song = filterInput(req.query.song);
	next();
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/templates/index.html'));
});

router.post('/register', function(req, res, next) {
	models.User.create(req.body, function(err, newUser) {
		if (err) return next(err);
		res.send(newUser);
	});
});

// router.get('/*', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, '../public/templates/index.html'));
// });

router.post('/:username', function(req, res, next) {
	models.User.findOne({ username: req.params.username }, function(err, user) {
		if (err) return next(err);
		user.comparePassword(req.body.password, function(err, isMatch) {
			if (err) return next(err);
			if (!isMatch) res.send('Password/username is incorrect');
			if (isMatch) res.send(user);
		});
	});
});

function filterInput(input) {
	var filterPattern = /\b(the)\b|\ba\b|\b(an)\b/ig;
	return input.toLowerCase().replace(filterPattern, ' ').replace(/ +/g, ' ');
}