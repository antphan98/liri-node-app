require("dotenv").config();

const keys = require("./keys.js");
const moment = require("moment");
moment().format();
// const spotify = new Spotify(keys.spotify);

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
        "\nDate: " + moment(dateArr[0], "MM-DD-YYYY") +
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
    if (!result) {
        result = "The Sign";

    }
    spotify
    .search({ type: "track", query: result})
    .then(function(data) {

        const results =  "----------------------------------------" +
        "\nArtist(s): " + data.tracks.items[i].artists[0].name 

        console.log(results);




    })
    .catch(function(error) {
        console.log(error);
      });




}

function movieThis(result) {

    if(!result) {
        result = "mr nobody";
    }

    axios.get("https://www.omdbapi.com/?t=" + result + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        const movieRes = "----------------------------------------" +
        "\nTitle of the Movie: " + response.data.Title +
        "\nYear of Release: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value; +
        "\nCountry Produced: " + response.data.Country + 
        "\nLanguage: " + response.data.Language + 
        "\nPlot: " + response.data.Plot +
        "\nActors: " + response.data.Actors +
        "----------------------------------------";

        console.log(movieRes);

    })
    .catch(function(error) {
        console.log(error);
      });



}


findConcerts();
spotifyThisSong();
movieThis();