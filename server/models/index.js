var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost/coverfly');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var songSchema = new mongoose.Schema({
	title: String,
	artist: String,
	src: String
});

var playlistSchema = new mongoose.Schema({
	name: String,
	songs: [songSchema]
});

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } }, 
	password: { type: String, required: true },
	playlists: [playlistSchema]
});

userSchema.pre('save', function(next) {
	var user = this;
	
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
            next();
		});
	});
});

userSchema.methods.comparePassword = function(passwordTry, cb) {
	bcrypt.compare(passwordTry, this.password, function(err, isMatch) {
		if (err) return cb(err);
		
		cb(null, isMatch);
	});
};

module.exports = {
	User: mongoose.model('User', userSchema),
	Playlist: mongoose.model('Playlist', playlistSchema),
	Song: mongoose.model('Song', songSchema)
};