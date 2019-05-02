require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

  if (process.argv[2] === "spotify-this-song")  {
    let songTitle = process.argv[3]
    console.log("arrrrg", process.argv[3]);
    //Code for if no song is entered
    if(!songTitle) {
        spotify
            .request("https://api.spotify.com/v1/albums/5UwIyIyFzkM7wKeGtRJPgB")
            .then(function(data) {
                console.log("***",JSON.stringify(data,null,2));
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
          console.log(JSON.stringify(data.tracks,null,2)); 
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