require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var secretKey = require("./keys.js");
var spotify = new Spotify({
    id: secretKey.spotify.id,
    secret: secretKey.spotify.secret
});

var [a, b, ...c] = process.argv;
var [d, ...e] = c;
if (d === "concert-this" || d === "spotify-this-song" || d === "movie-this" || d === "do-what-it-says") {
    if (d === "concert-this") {
        bandsInTown();
    } else if (d === "spotify-this-song") {
        music();
    } else if (d === "movie-this") {
        oMDB();
    } else if (d === "do-what-it-says") {
        standard()
    }
} else {
    console.log(`Error: \n"${d}" is not an option`)
}

function bandsInTown() {
    var artist = e.join("+");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        var event = response.data[0]
        if (event) {
            console.log(`\nSoonest available playing: \n\nVenue Name: ${event.venue.name}\nLocation: ${event.venue.city}, ${event.venue.region}\n`);
            if (moment(event.datetime).isValid()) {
                var time1 = moment(event.datetime).format("Do MMMM YYYY");
                var time2 = moment(event.datetime).format("hh:mm a");
                console.log(`Date: ${time1} at ${time2}`);
            } else {
                console.log(`Error processing time: direct from object ${event.datetime}`);
            }
        } else {
            console.log(`No found tour dates for ${e.join(" ")}`);
        }
    }
    );
}

function music() {
    if (e.length === 0) {
        spotify.search({ type: 'track', query: 'The Sign', artist: "Ace of Base" }).then(function (response) {
            console.log(response.tracks.items[0]);
        }).catch(function (err) {
            console.log(err);
        });
    }

}

function oMDB() {
    var movie = e.join("+")
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(function (response) {
        var movieInfo = response.data;
        var release = moment(movieInfo.Released, "DD MMMM YYYY").format("YYYY");
        console.log(`\n\nMovie Title: ${movieInfo.Title}\nYear of Release: ${release}\nIMDB Rating: ${movieInfo.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}\nOrigin of Production: ${movieInfo.country}\nLanguage: ${movieInfo.Language}\nPlot: ${movieInfo.Plot}\nActors: ${movieInfo.Actors}\n\n`);
    }
    );
}

function standard() {

}