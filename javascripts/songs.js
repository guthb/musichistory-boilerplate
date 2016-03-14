//define varibles:
var songs = [];
songs[songs.length] = "The Pink Panther > by Henry Mancini on the album The Pink Panther"; 
songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
songs[songs.length] = "Holy Wars...The Punishment Due > by MegaDeth on the album Rust in Peace";

//pull in main element requested to be populated
var songList = document.getElementById("songListDom");

//change to function so new songs can be entered through new page
function updateSongsEntered(){
  songList.innerHTML = "";
  for (var i = 0; i < songs.length; i++) {
    var songStringReplace = songs[i].replace(/[>*@(!]/g, "");
    songStringReplace =songStringReplace.replace(/[>]/g, "-");
    songList.innerHTML += "<li>" + songStringReplace + "</li>";
  }
};

//Control the visablity for the existing page and the new page
//declare varibles
//links from DOM
var viewMusic = document.getElementById("viewMusic");
//new page added for MH3
var addMusic = document.getElementById("addMusic");
console.log("viewMusic", viewMusic );
console.log("addMusic", addMusic);

//Areas of the page
var viewMusicDiv = document.getElementById("listOfMusic");
var addMusicPage = document.getElementById("addForm");
var controlMusicDiv =document.getElementById("musicControl")
var addMuiscButton = document.getElementById("addButton")
console.log(viewMusicDiv); 
console.log(addMusicPage);
console.log(controlMusicDiv);

//build functions for visability of pages
function viewMusicVisible(){
  viewMusicDiv.classList.remove("hidden");
  viewMusicDiv.classList.add("visible");
  controlMusicDiv.classList.remove("hidden")
  controlMusicDiv.classList.add("visible");
  addMusicPage.classList.remove("visible");
  addMusicPage.classList.add("hidden");
  addMuiscButton.classList.remove("visible")
  addMuiscButton.classList.add("hidden")
};

function addMusicVisible(){
  addMusicPage.classList.remove("hidden")
  addMusicPage.classList.add("visible");
  addMuiscButton.classList.remove("hidden")
  addMuiscButton.classList.add("visible")
  viewMusicDiv.classList.remove("visible");
  viewMusicDiv.classList.add("hidden");
  controlMusicDiv.classList.remove("visible");
  controlMusicDiv.classList.add("hidden");
};


//add event listeners on the links for the navigation bar to
//invoke the function to make visable ot hidden
viewMusic.addEventListener("click", viewMusicVisible);
addMusic.addEventListener("click" , addMusicVisible);


//fills out the song form and clicks the add button, you should collect 
//all values from the input fields, add the song to your array of songs, 
//and update the song list in the DOM.
function addedSongs(){
  console.log("in Added Songs");
  var songEntered = document.getElementById("addTitle");
  var artistEntered = document.getElementById("addArtist");
  var albumEntered = document.getElementById("addAlbum");
  songs.push(`${songEntered.value} > by ${artistEntered.value} on the album ${albumEntered.value}`)
  
  //call the update dom function
  updateSongsEntered();

  //reset the form values for next entry
  songEntered.value = "";
  artistEntered.value = "";
  albumEntered.value = "";
};


addMuiscButton.addEventListener("click", addedSongs);










