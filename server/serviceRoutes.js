var express = require('express');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var path = require('path');
var keys = require('../keys');

var router = express.Router();

module.exports = router;

router.get('/spotify', function(req, res, next) {
	var queryParams = {
		q: 'track:"' + req.song + '"+' + req.artist + '+NOT+karaoke',
		market: 'US',
		type: 'track'
	};

	request('https://api.spotify.com/v1/search' + paramsStringMaker(queryParams))
	.then(function(response) {
		var filteredResults = filterSpotifyResults(response[0].body, req.artist);
		res.send(filteredResults);
	}).catch(function(err) {
		next(err);
	});
});

router.get('/soundcloud', function(req, res, next) {
	var queryParams = {
		q: 'cover+' + req.song + '+' + req.artist,
		filter: 'public',
		order: 'hotness',
		consumer_key: keys.soundcloudId
	};

	request({ url: 'https://api.soundcloud.com/tracks.json', qs: queryParams })
	.then(function(response) {
		var filteredResults = filterSoundcloudResults(response[0].body);
		res.send(filteredResults);
	}).catch(function(err) {
		next(err);
	});
});

router.get('/youtube', function(req, res, next) {
	var queryParams = {
		q: '"cover" ' + req.song + ' ' + req.artist,
		part: 'snippet',
		order: 'relevance',
		type: 'video',
		videoEmbeddable: 'true',
		key: keys.youtubeKey
	};

	request({ url: 'https://www.googleapis.com/youtube/v3/search', qs: queryParams })
	.then(function(response) {
		var filteredSongs = filterYoutubeResults(response[0].body);
		res.send(filteredSongs);
	}).catch(function(err) {
		next(err);
	});
});

function filterSpotifyResults(spotifyResults, artist) {
	var uniqueArtists = {};

	return JSON.parse(spotifyResults).tracks.items
			.sort(spotifySort)
			.reverse()
			.filter(function(track) {
				if (uniqueArtists[ track.artists[0].name ] ||
					track.artists[0].name.toLowerCase() === artist) return false;

					uniqueArtists[ track.artists[0].name ] = true;
				return true;
			})
			.slice(0, 5)
			.map(function(track) {
				return {
					name: track.name,
					artist: track.artists[0].name,
					external_url: track.external_urls.spotify,
					preview_url: track.preview_url
				};
			});
}

function filterSoundcloudResults(soundcloudResults) {
	return JSON.parse(soundcloudResults)
			.sort(soundcloudSort)
			.reverse()
			.slice(0, 5)
			.map(function(track) {
				return { uri: track.uri };
			});
}

function filterYoutubeResults(youtubeResults) {
	return JSON.parse(youtubeResults).items
			.map(function(video) {
				return { videoId: video.id.videoId };
			});
}

function paramsStringMaker(queryParams) {
	var params = [];
	for (var param in queryParams) {
		params.push(param + '=' + queryParams[param]);
	}

	return '?' + params.join('&');
}

function spotifySort(a, b) {
	if (a.popularity > b.popularity) return 1;
	if (a.popularity < b.popularity) return -1;
	return 0;
}

function soundcloudSort(a, b) {
	if (a.playback_count + a.favoritings_count > b.playback_count + b.favoritings_count) return 1;
	if (a.playback_count + a.favoritings_count < b.playback_count + b.favoritings_count) return -1;
	return 0;
}