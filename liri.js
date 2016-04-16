var request = require('request');
var keys = require('./.gitignore/keys.js');


switch (process.argv[2]) {
    case "my-tweets":
        grabTwitter();
        break;
    case "spotify-this-song":
        grabSpotify();
        break;
    case "movie-this":
        grabMovie()
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("Please enter a valid entry. You can type: my-tweets, spotify-this-song, movie-this or do-what-it-says")
}

function grabTwitter() {
    var Twitter = require('twitter');
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = 'Jayovermatter';
    var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    client.get(url, params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                if (tweets[i] != undefined) {
                    addSpace();
                    console.log(tweets[i].text);
                    addSpace();
                    addBreak();
                }
            }
        } else {
            console.log(error);
        }
    });
};

function grabSpotify() {
    var spotify = require('spotify');
    var songTitle = process.argv[3] != "" ? process.argv[3] : "what's my age again";
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var resultNum = 1;
        for (var i = 0; i < data.tracks.items.length; i++) {

            if (data.tracks.items[i] != undefined) {
                addSpace();
                console.log('List #' + resultNum);
                console.log('Artist: ', data.tracks.items[i].artists[0].name);
                console.log('Track: ', data.tracks.items[i].name);
                console.log('Song URL: ', data.tracks.items[i].href);
                console.log('Album: ', data.tracks.items[i].album.name);
                addSpace();
                addBreak();
                addSpace();
            }
            resultNum++;
        }
    });
}

function grabMovie() {
    var movieTitle = process.argv[3] != "" ? process.argv[3] : "Mr. Nobody"
    request('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&r=json', function(error, response, jbody) {
        if (!error && response.statusCode == 200) {
            jbody = JSON.parse(jbody);
            addSpace();
            console.log('Title: ' + jbody.Title);
            console.log('Year: ' + jbody.Year);
            console.log('IMDB Rating: ' + jbody.imdbRating);
            console.log('Country: ' + jbody.Country);
            console.log('Language: ' + jbody.Language);
            console.log('Plot: ' + jbody.Plot);
            console.log('Actors: ' + jbody.Actors);
            addSpace();
            addBreak();
        } else {
            console.log('Error occurred: ' + error);
            return;
        }
    })
};

function addBreak() {
    console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
}

function addSpace() {
    console.log("  ");
}
