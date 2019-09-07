# liri-node-app

## Description

This application is a command line application created using Node.js to search for upcoming concerts, songs, or movies. The app accepts four possilbe inputs from the command line followed by the specific band, movie, or song the user wants to search for. Based on the user input command a function is called that queries the specific API and logs the formatted response to the console.

## Input Commands
* concert-this
    * Searches for the next 5 upcoming concerts for the selected artist
* spotify-this-song 
    * Searches the spotify API for song input
* movie-this 
    * Searches OMDB for movie input
* do-what-it-says
    * Grabs info from random.txt file and searches based on the data 

## Example Command Line Input
* node liri concert-this Flume
    * Searches for upcoming Flume concerts

## How To Use
1. Download the github repository to your computer. 
2. You will need to save your Spotify id and secret in a .env file saved in the same folder. Navigate to https://www.npmjs.com/package/node-spotify-api for more info on obtaining these. 
    * In the .env file set SPOTIFY_ID equal to your id and SPOTIFY_SECRET equal to your secret
3. Run npm install in the command line while in the project folder to install the neccesary node modules
4. Finally, you can run the input commands in the terminal as outlined above

## Technologies Used
* Node.js - Used for core application
* Dotenv - For accessing Spotify keys saved in .env file
* fs - For reading input from text file
* Axios - Used for querying API Urls
* Moment - Used to format time for concert search
* Spotify API - Used for searching song data
* Bands In Town API - Used for searching upcoming concerts
* OMDB API - Used for searching movie data

## Creator
Jeff Swanner