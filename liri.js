require("dotenv").config();

const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const userInput = process.argv[2];
const result = process.argv[3];

function findConcerts() {

    axios.get(`https://rest.bandsintown.com/artists/` + result + `/events?app_id=codingbootcamp`)
    .then(function(response) {

        console.log(response);



    });


}