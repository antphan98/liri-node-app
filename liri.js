require("dotenv").config();

const keys = require("./keys.js");
const moment = require("moment");
moment().format();
const fs = require("fs");

const axios = require("axios");

const liri = process.argv[2];
const result = process.argv[3];

switch (liri) {
    case "concert-this":
    findConcerts(result);
    break;

    case "spotify-this-song":
    spotifyThisSong(result);
    break;

    case "movie-this":
    movieThis(result);
    break;

    case "do-what-it-says":
    doIt(result);
    break;

};

function findConcerts() {

    axios.get(`https://rest.bandsintown.com/artists/` + result + `/events?app_id=codingbootcamp`)
    .then(function(response) {

       for (let i = 0; i < response.data.length; i++) {

        const datetime = response.data[i].datetime;
        const dateArr = datetime.split(",");

        const concertRes = "----------------------------------------" +
        "\nVenue Name: " + response.data[i].venue.name +
        "\nLocation: " + response.data[i].venue.city +
        "\nDate: " + moment(response.data[i].datetime).format("LL") +
        "\n----------------------------------------";
        
        console.log(concertRes);
      

       }

    

    })
    .catch(function(error) {
        console.log(error);

    });


}

const Spotify = require("node-spotify-api");
 
const spotify = new Spotify(keys.spotify);

function spotifyThisSong(result) {

    const Spotify = require("node-spotify-api");
 
const spotify = new Spotify(keys.spotify);

    if (!result === undefined) {
        result = "The Sign";

    }
    spotify
    .search({ type: "track", query: result})
    .then(function(response) {

        for(let i = 0; i < 3; i++) {

        const songResults =  "----------------------------------------" +
        "\nArtist(s): " + response.tracks.items[i].artists[0].name +
        "\nSong Name: " + response.tracks.items[i].name +
        "\nAlbum Name: " + response.tracks.items[i].album.name +
        "\nPreview URL: " + response.tracks.items[i].preview_url +
        "\n----------------------------------------";

        console.log(songResults);

        }


    })
    .catch(function(error) {
        console.log(error);
      });




}

function movieThis(result) {

    if(result === undefined) {
        result = "mr nobody";
    }

    axios.get(`https://www.omdbapi.com/?t=` + result + `&y=&plot=short&apikey=trilogy`)
    .then(function(response) {
        const movieRes = "----------------------------------------" +
        "\nMovie Title: " + response.data.Title +
        "\nYear of Release: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry Produced: " + response.data.Country + 
        "\nLanguage: " + response.data.Language + 
        "\nPlot: " + response.data.Plot +
        "\nActors: " + response.data.Actors +
        "\n----------------------------------------";

        console.log(movieRes);

    })
    .catch(function(error) {
        console.log(error);
      });

}

function doIt() {

    fs.readFile("random.txt", "utf-8", function(error, data) {

        if(error) {

            return console.log(error);
        }

        else {

            const dataTxt = data.split(",");
            spotifyThisSong(dataTxt[1]);

        }

        });



    


}