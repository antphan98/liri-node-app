require("dotenv").config();

const keys = require("./keys.js");
const moment = require("moment");
moment().format();
const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const userInput = process.argv[2];
const result = process.argv[3];

switch (userInput) {
    case "concert-this":
    findConcerts(result);
    break;

    case "spotify-this-song":
    spotifyThisSong(result);
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

const Spotify = require('node-spotify-api');
 
const spotify = new Spotify({
  id: 4ab2c7b670b94baab739d7f4d565032e,
  secret: bcc4ba1d964a4e9a9122e68beb64c987
});

function spotifyThisSong() {
    if (!result) {
        result = "The Sign";

    }
    spotify.search()




}


findConcerts();