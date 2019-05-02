require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
switch (process.argv[2]){
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "concert-this":
    concertThis();
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;
  default:
  console.log("Unkown comand!: ",process.argv[2]);
}
//Will send you spotify info for a song, defaults to ace of base if nothing is inputted
function spotifyThisSong() {
    let songTitle = process.argv[3]
    //Code for if no song is entered
    if(!songTitle) {
        spotify
            .request("https://api.spotify.com/v1/albums/5UwIyIyFzkM7wKeGtRJPgB")
            .then(function(data) {
                console.log("artist list:");
                console.log(data.artists[0].name);
                console.log("Song Name:");
                console.log(data.tracks.items[3].name);
                console.log("Song Preview:");
                console.log(data.tracks.items[3].preview_url);
                console.log("Album Name:");
                console.log(data.name);            })
            .catch(function(err) {
                console.error('Error occurred: ' + err); 
            });
    }else{
        //Code for if a song is entered
        spotify.search({ type: "track", query: songTitle }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } 
          console.log("artist list:");
          for(let artist of data.tracks.items[0].album.artists){
              console.log(artist.name); 
          }
          console.log("Song Name:");
          console.log(process.argv[3]);
          console.log("Song Preview:");
          console.log(data.tracks.items[0].preview_url);
          console.log("Album Name:");
          console.log(data.tracks.items[0].album.name);
          });
    }
  }
//Will figure out where latest the concert is of an inputted artist
function concertThis() {
if(!process.argv[3]){
  console.log("Input an artist!")
  return;
}
  axios.get("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp")
  .then(function (response) {
    console.log("Venue name:")
    console.log(response.data[0].venue.name);
    console.log("Venue location: ")
    console.log(response.data[0].venue.city)
    console.log("Date of the event: ")
    let d = new Date(response.data[0].datetime)
    console.log(moment(d).format("MM/DD/YYYY"));
  })
  .catch(function (error) {
    console.log(error);
  });
}