// Used to access spotify keys in .env file
require("dotenv").config(); 

// Requires for all the node modules used in this project
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var moment = require('moment');

// Loads the spotify keys into spotify variable
var spotify = new Spotify(keys.spotify);

// Assigns user input to variables
var userCommand = process.argv[2];
var searchItem = process.argv.splice(3).join(" ");

// Calls correct search function based on user input
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

// Reads text file and recalls the search function with input
function textSearch() {
    fs.readFile('./random.txt', "utf-8", function read(err, data) {
        // Logs any read errors
        if (err) {
            return console.log(err);
        };
        var arr = data.split(",");
        searchItem = arr[1];
        searchType(arr[0]);
    });
};

// Searches Spotify for song
function spotifySearch(song) {
    // Defaults song to The Sign by Ace of Base
    if (song === "") {
        song = "The Sign Ace of Base"
    };

    // Calls spotify search function
    spotify.search({ type: 'track', query: song }, function(err, data) {
        // Logs any search errors
        if (err) {
          return console.log('Error occurred: ' + err);
        };

        // Displays only the first song result
        var songResult = data.tracks.items[0];

        // Displays track name
        console.log("Track: " + songResult.name);

        // Dislays artists 
        var artist = [];
        for (i=0;i<songResult.artists.length;i++) {
            artist.push(songResult.artists[i].name);
        };
        console.log("Artist(s): " + artist.join(", ")); 

        // Displays album
        console.log("Album: " + songResult.album.name);

        // Displays song preview URL
        console.log("Preview: " + songResult.preview_url);
    });
};

// Searches bands in town for concerts and displays
function concertSearch(artist) {
    // Constructs search URL
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Axios call to URL
    axios.get(concertURL).then(
        function(response) {
            // Logs heading for data
            console.log(artist + " upcoming concerts:");

            // Logs 5 most recent concerts unless there are less than 5 upcoming
            var k;
            if (response.data[0].length<5) {
                k = response.data[0].length;
            } else {
                k = 5;
            };
            for (i=0;i<k;i++) {
                // Logs venue name
                console.log("Venue: " + response.data[i].venue.name);

                // Logs venue location
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[0].venue.country);

                // Logs concert date using moment
                console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
            };
        }).catch(function(error) {
            // Displays any errors
            return console.log(error.message);
        });
};

// Searhes OMDB for specific movie
function movieSearch(movie) {
    // Create movie URL
    var movieURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie;

    // Axios call to movieURL
    axios.get(movieURL).then(function(response) {
        // Displays data to console
        console.log("Movie: " + response.data.Title);
        console.log("Release: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    }).catch(function(error) {
        // Displays any errors
        console.log(error);
    });
};

// Initial call for searchType function
searchType(userCommand);