/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let searchBox = document.getElementById('searchBox');
let searchButton = document.getElementById('searchButton');
let results = document.getElementById("results");
let playerSection = document.getElementById('player');
let audio = document.getElementById('audio');

function unhidePlayer() {
  console.log("click");
  playerSection.style.display = "flex";
  playerSection.style.height = "auto";
}

searchButton.addEventListener("click", function search() {
  let returned = {};

  results.innerHTML = "";

  console.log(searchBox.value);
  var searchTerm = searchBox.value;

  fetch(`https://itunes.apple.com/search?term=${searchTerm}`).then(function(response) {
    response.json().then(function(data) {
        returned = data.results;
        console.log(returned);
        return returned;
        console.log(returned[0].trackName);
      })

      .then(function() {
        for (var i = 0; i < returned.length; i++) {
          results.innerHTML += `
            <div class="box">
              <button id="returned\[${[i]}\]" class="result">
              <div>
                <img src=${returned[i].artworkUrl100} alt=${returned[i].artistName}>
              </div>
              <p class="songTitle">${returned[i].trackName}</p>
              <p class="bandName">${returned[i].artistName}</p>
              </button>
            </div>`
        }
      })

      .then(function() {
        let tracks = document.querySelectorAll(".result");
        console.log(returned[0].trackName);
        // for (var i = 0; i < returned.length; i++) {
        tracks.forEach(function(track,i) {
          track.addEventListener("click", function() {
            console.log(track);

            player.innerHTML = `
              <audio src="${returned[i].previewUrl}" controls="controls" class="music-player"></audio>
              <div id="song-info">
              <img src=${returned[i].artworkUrl100} alt=${returned[i].artistName}>
              <p>Now playing:  ${returned[i].trackName} - ${returned[i].artistName}</p>
              </div>
              `
            unhidePlayer();
          })
        })
      })
  })
})
