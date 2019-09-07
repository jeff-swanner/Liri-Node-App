require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var moment = require('moment');

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
};

function concertSearch(artist) {
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(concertURL).then(
        function(response) {
            console.log(artist + " upcoming concerts:");
            var k;
            if (response.data[0].length<5) {
                k = response.data[0].length;
            } else {
                k = 5;
            };
            for (i=0;i<k;i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[0].venue.country);
                console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
            };
        }).catch(function(error) {
            return console.log(error);
        });
};

function movieSearch(movie) {
    var movieURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie;
    axios.get(movieURL).then(function(response) {
        console.log("Movie: " + response.data.Title);
        console.log("Release: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    }).catch(function(error) {
        console.log(error);
    });
};

searchType(userCommand);