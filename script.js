// Catch getElementById
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");
const showLyrics = document.getElementById("showLyrics");

// Call Project API
const apiURL = "https://api.lyrics.ovh";
const lyricsURL = "https://api.lyrics.ovh/v1/";


// search songs and artist name
const searchSongs = () => {
  fetch(`${apiURL}/suggest/${searchBox.value}`)
    .then((res) => res.json())
    .then((data) => showData(data.data))
    .catch((err) => alert("Input valid names"));
};


  // event handler button 
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const search = searchBox.value.trim();
  if (!search) {
    alert("Please type a song name");
  } else {
    searchSongs();
  }
});


// search ten songs and artist result
const showData = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (i > 9) {
      break;
    } else {
      displayItems(data[i].title, data[i].artist.name, data[i].album.title, data[i].artist.picture);
    }
  }
};


// display songs and songs title
const displayItems = (title, artist, album, img) => {
  result.innerHTML += `
    <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-7">
              <h3 class="lyrics-name">${title}</h3>
              <p class="author lead">Artist: <span>${artist}</span></p>
              <p class="author lead">Album: <span>${album}</span></p>
            </div>
            <div class="col-md-2">
               <img src="${img}" height="120" style="border-radius: 50%;" >
            </div>
            <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success" onclick="lyrics('${artist}', '${title}')">Get Lyrics</button>
            </div>
          </div>
    `;
};


// Api call for lyrics 
const lyrics = (artist, title) => {
  fetch(`${lyricsURL}/${artist}/${title}`)
    .then((res) => res.json())
    .then((data) => {
      displayLyrics(artist, title, data.lyrics);
    });
};


 // Show Lyrics of songs 
const displayLyrics = (artist, title, lyrics = "Sorry! this lyrics is unavailable <br> Reload &#x21bb;") => {
  showLyrics.innerHTML = `
    <button class="btn go-back">&lsaquo;</button>
          <h1 class="text-success mb-4">${title}</h1>
          <h3 class="text-success mb-4">${artist}</h3>
          <pre class="lyric text-white">${lyrics}</pre>
    `;
  result.style.display = "none";
};
