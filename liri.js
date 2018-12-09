require("dotenv").config();
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

var [a, b, ...c] = process.argv;
var [d, ...e] = c;
if (d === "concert-this" || d === "spotify-this-song" || d === "movie-this" || d === "do-what-it-says") {
    if (c[0] === "concert-this") {
        bandsInTown();
    } else if (c[0] === "spotify-this-song") {
        music();
    } else if (c[0] === "movie-this") {
        oMDB();
    } else if (c[0] === "do-what-it-says") {
        standard()
    }
}

function bandsInTown() {
    var artist = e.join("");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response) {
        console.log(response.data);
      }
    );
}

function music() {

}

function oMDB() {
    axios.get("http://www.omdbapi.com/?t=" + e + "&y=&plot=short&apikey=trilogy").then(function(response) {
        console.log(response.data.Plot);
        console.log("The movie's rating is: " + response.data.imdbRating);
      }
    );
}

function standard() {

}
