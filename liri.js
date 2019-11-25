require("dotenv").config();

const keys = require("./keys.js");
const moment = require("moment");
moment().format();
// const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const userInput = process.argv[2];
const result = process.argv[3];

function findConcerts() {

    axios.get(`https://rest.bandsintown.com/artists/` + result + `/events?app_id=codingbootcamp`)
    .then(function(response) {

       for (let i = 0; i < response.data.length; i++) {

        const date = response.data[i].date;
        const dateArr = date.split(",");

        const concertRes = "----------------------------------------" +
        "\nVenue Name: " + response.data[i].venue.name;
        "\nLocation: " + response.data[i].venue.city;
        "\nDate: " + moment(dateArr[i], "MM-DD-YYYY");
        
        console.log(concertRes);
      

       }

    

    })
    .catch(function(error) {
        console.log(error);

    });


}

findConcerts();