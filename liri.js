var request = require('request');
var keys = require('./.gitignore/keys.js');
var fs = require('fs');

switch (process.argv[2]) {
    case "my-tweets":grabTwitter(); break;
    case "spotify-this-song": grabSpotify(); break;
    case "movie-this": grabMovie(); break;
    case "do-what-it-says": grabDoWhatItSays(); break;
    default: console.log("Please enter a valid entry. You can type: my-tweets, spotify-this-song, movie-this or do-what-it-says")
}
//grab mytweet information and display it
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
                    separators.addSpace();
                    console.log(tweets[i].text);
                    separators.addSpace();
                    separators.addBreak();
                }
            }
        } else {
            console.log(error);
        }
    });
};

//grab users entry for spotify and return song information
function grabSpotify(enterThis) {
    var spotify = require('spotify');
    var songTitle = process.argv[3] != "" ? process.argv[3] : "what's my age again";

    //change to use data inside random.txt if user prompts "do-what-it-says"
    if(process.argv[2] === "do-what-it-says") { songTitle = enterThis}

    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var resultNum = 1;
        for (var i = 0; i < data.tracks.items.length; i++) {

            if (data.tracks.items[i] != undefined) {
                separators.addSpace();
                console.log('List #' + resultNum);
                console.log('Artist: ', data.tracks.items[i].artists[0].name);
                console.log('Track: ', data.tracks.items[i].name);
                console.log('Song URL: ', data.tracks.items[i].href);
                console.log('Album: ', data.tracks.items[i].album.name);
                separators.addSpace();
                separators.addBreak();
                separators.addSpace();
            }
            resultNum++;
        }
    });
}
//grab users entry for move and return movie information
function grabMovie() {
    var movieTitle = process.argv[3] != "" ? process.argv[3] : "Mr. Nobody"
    request('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&r=json', function(error, response, jbody) {
        if (!error && response.statusCode == 200) {
            jbody = JSON.parse(jbody);
            separators.addSpace();
            console.log('Title: ' + jbody.Title);
            console.log('Year: ' + jbody.Year);
            console.log('IMDB Rating: ' + jbody.imdbRating);
            console.log('Country: ' + jbody.Country);
            console.log('Language: ' + jbody.Language);
            console.log('Plot: ' + jbody.Plot);
            console.log('Actors: ' + jbody.Actors);
            separators.addSpace();
            separators.addBreak();
        } else {
            console.log('Error occurred: ' + error);
            return;
        }
    })
};
//grab random.txt information and run it
function grabDoWhatItSays(){
    fs.readFile("random.txt", 'utf8', function(err, data){
        if (err) throw err;
        //run below if no error is returned
        var things = data.split(',');
        var enterThis = things[1];

        grabSpotify(enterThis);
    });
}
//create line breaks and spacers
var separators = {
    addBreak: function() {
        console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
    },
    addSpace: function() {
        console.log("  ");
    }
}
