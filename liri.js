require("dotenv").config();

const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const userInput = process.argv[2];
const result = process.argv[3];

