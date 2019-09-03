require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var userCommand = process.argv[2];
var searchItem = process.argv.splice(3).join(" ");

function searchType(userInput) {
    if (userInput === "concert-this") {
        concertSearch(searchItem);
    } else if (userInput === "spotify-this-song") {
        spotifySearch(searchItem);
    } else if (userInput === "movie-this") {
        movieSearch(searchItem);
    } else if (userInput === "do-what-it-says") {
        textSearch(searchItem);
    } else {
        return console.log("Invalid input");
    }
};

function textSearch() {
    fs.readFile('./random.txt', "utf-8", function read(err, data) {
        if (err) {
            return console.log(err);
        }
        var arr = data.split(",");
        searchItem = arr[1];
        searchType(arr[0]);
    });
};

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songResult = data.tracks.items[0];

        console.log("Track: " + songResult.name);

        var artist = [];
        for (i=0;i<songResult.artists.length;i++) {
            artist.push(songResult.artists[i].name);
        };
        console.log("Artist(s): " + artist.join(", ")); 

        console.log("Album: " + songResult.album.name);

        console.log("Preview: " + songResult.preview_url);
        
    });
}





searchType(userCommand);