///define varibles:
var songs = [];

//pull in main element requested to be populated
var songList = document.getElementById("songListDom");
//change to function so new songs can be entered through new page
//Loop over results and inject into Music History list view
//add a delete button into string sent to song list
//pull in the songs object
function updateSongsEntered(songsfromJson){
  songList.innerHTML = "";
  for (var i = 0; i < songsfromJson.length; i++) {
    songList.innerHTML += "<li>" + songsfromJson[i].title +  " by " + songsfromJson[i].artist +
    " on the Album " + songsfromJson[i].album + "<button class='deleteButton'>Delete</button>" +"</li>";
  }
  //console.log("songList", songList );
  // watch the delete button
  watchForDelete();

  function watchForDelete() {
    var deleteButton = document.getElementsByClassName("deleteButton")
    for (var i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener("click", deleteSong);
    }
  }
  //listParent is the Parent of the button.
  //once envoked remove the li as the child of the ordered list
  //since deleting the li removes the entire entry
  function deleteSong(event) {
    var listParent = event.target.parentElement;
    console.log("indeltesong", event.target.parentElement );
    console.log("listParent", listParent );
    songList.removeChild(listParent);
  }
};

//Control the visablity for the existing page and the new page
//declare varibles
//links from DOM
var viewMusic = document.getElementById("viewMusic");
//new page added for MH3
var addMusic = document.getElementById("addMusic");

//Areas of the page
var viewMusicDiv = document.getElementById("listOfMusic");
var addMusicPage = document.getElementById("addForm");
var controlMusicDiv =document.getElementById("musicControl")
var addMuiscButton = document.getElementById("addButton")

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
//invoke the function to make visible or hidden
viewMusic.addEventListener("click", viewMusicVisible);
addMusic.addEventListener("click" , addMusicVisible);
//fills out the song form and clicks the add button, you should collect
//all values from the input fields, add the song to your array of songs,
//and update the song list in the DOM.
function addedSongs(songsfromJson){
  for (var i = 0; i < songsfromJson.length; i++) {
    songs.push(songsfromJson[i]);
  }
  //call the update dom function
  updateSongsEntered(songs);
 };
//update songs from add songs page
function updateSongs(){
  var songEntered = document.getElementById("addTitle");
  var artistEntered = document.getElementById("addArtist");
  var albumEntered = document.getElementById("addAlbum");
  //console.log("songs", songsfromJson );
  songs.push({ "title": songEntered.value, "artist": artistEntered.value, "album":albumEntered.value});
  //call the update dom function
  updateSongsEntered(songs);
  //reset the form values for next entry
  songEntered.value = "";
  artistEntered.value = "";
  albumEntered.value = "";
};
//when the add music button is clicked, envoke function
//to add those songs to array
addMuiscButton.addEventListener("click", updateSongs);

//read from local songs.json file with XHR
//create an XHR object
var newSongRequest = new XMLHttpRequest();

//tell the XHR exactly what to do
newSongRequest.open("GET","songs.json");
newSongRequest.send();

//XHR objects emit events when operations are complete or on error
newSongRequest.addEventListener("load", executeOnSuccess);
newSongRequest.addEventListener("failed", executeOnFailure)

//tell the XHR object what to do
function executeOnFailure(){
  alert("An Error Occured.... if on Mac please press command and R")
};
//on success load the object returned
function executeOnSuccess(){
  var newSongList = JSON.parse(this.responseText);
  //console.log("newSongListfromJSON", newSongList.songs );
  //Call the function to send to DOM
  //only after a successful load
  addedSongs(newSongList.songs);
};

//when user presses more button pull in second JSON file
var moreMusicButton = document.getElementById("moreButton");
moreMusicButton.addEventListener("click", loadNextFile);

//when the more button is clicked, envoke function
//to add those songs to array
function loadNextFile(event) {

  //read from addtional local songs.json file with XHR
  //create an XHR object
  var moreSongRequest = new XMLHttpRequest();

  //tell the XHR exactly what to do
  moreSongRequest.open("GET","songs2.json");
  moreSongRequest.send();

  //XHR objects emit events when operations are complete or on error
  moreSongRequest.addEventListener("load", moreExecuteOnSuccess);
  moreSongRequest.addEventListener("failed", moreExecuteOnFailure)

  //tell the XHR object what to do...
  function moreExecuteOnFailure(){
    alert("An Error Occured.... if on Mac please press command and R")
  };
  //on success load the object returned
  //now thate are adding two files will call this function again
  //so add the object again
  function moreExecuteOnSuccess(){
    var moreSongList = JSON.parse(this.responseText);
    //Call the function to send to DOM
    //only after a successful load
    addedSongs(moreSongList.songs);
  };
};