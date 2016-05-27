var async = require('async');
var gitHub = require('github');

var gitHubApi = new gitHub({'version' : '3.0.0'});

async.waterfall([
		getUrl,
		buildImageTag
	],
	finalCallback);

function getUrl(callback) {
	console.log('in getUrl');
	gitHubApi.search.users({q:'airbnb'}, function(err, result) {
		if(err) {
			callback(err, null); //rject
			return;
		}
		var imageUrl = result.items[0].avatar_url;
		callback(null, imageUrl); //resolve
	});
}


function buildImageTag(imageUrl, callback) {
	console.log('in buildImageTag');
	var tag = "<img src=" +imageUrl+ "/>";
	callback(null, tag);
}

function finalCallback(err, result) {
	console.log('In finalCallback');
	if(err) {
		console.log('ERROR : '+ err);
		return;
	}
	console.log(result);
}