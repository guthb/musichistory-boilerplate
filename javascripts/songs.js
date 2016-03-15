//define varibles:

var songs = [];
// songs[songs.length] = "The Pink Panther > by Henry Mancini on the album The Pink Panther"; 
// songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
// songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
// songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
// songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
// songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
// songs[songs.length] = "Holy Wars...The Punishment Due > by MegaDeth on the album Rust in Peace";

//pull in main element requested to be populated
var songList = document.getElementById("songListDom");

//change to function so new songs can be entered through new page
//Loop over results and inject into Music History list view
//add a delete button into string sent to song list
//pull in the songs object
function updateSongsEntered(songsfromJson){
  var listOfSongs = "";
  
  for (var i = 0; i < songsfromJson.length; i++) {
    //var songStringReplace = songsfromJson[i].replace(/[>*@(!]/g, "");
    //songStringReplace =songStringReplace.replace(/[>]/g, "-");
    listOfSongs += "<li>" + songsfromJson[i].title +  " by " + songsfromJson[i].artist +
    " on the Album " + songsfromJson[i].album + "<button class='deleteButton'>Delete</button>" +"</li>";
    // console.log("list of songs", listOfSongs);
      
  }
  songList.innerHTML += listOfSongs; 

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
    //console.log("indeltesong", event.target.parentElement );
    //console.log("listParent", listParent );
    songList.removeChild(listParent);   
  }
};

//Control the visablity for the existing page and the new page
//declare varibles
//links from DOM
var viewMusic = document.getElementById("viewMusic");
//new page added for MH3
var addMusic = document.getElementById("addMusic");
// console.log("viewMusic", viewMusic );
// console.log("addMusic", addMusic);

//Areas of the page
var viewMusicDiv = document.getElementById("listOfMusic");
var addMusicPage = document.getElementById("addForm");
var controlMusicDiv =document.getElementById("musicControl")
var addMuiscButton = document.getElementById("addButton")
// console.log(viewMusicDiv); 
// console.log(addMusicPage);
// console.log(controlMusicDiv);

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
  //console.log("in Added Songs");
  var songEntered = document.getElementById("addTitle");
  var artistEntered = document.getElementById("addArtist");
  var albumEntered = document.getElementById("addAlbum");
  
  //console.log("songs", songsfromJson );
  //this is the method from the add page
  //songs.push(`${songEntered.value} > by ${artistEntered.value} on the album ${albumEntered.value}`)
  
  //call the update dom function
  updateSongsEntered(songsfromJson);
  //reset the form values for next entry
  songEntered.value = "";
  artistEntered.value = "";
  albumEntered.value = "";
};

//when the add music button is clicked, envoke function
//to add those songs to array
addMuiscButton.addEventListener("click", addedSongs);

//read from local songs.json file with XHR
//create an XHR object
var newSongRequest = new XMLHttpRequest();

//tell the XHR exactly what to do
newSongRequest.open("GET","songs.json");
newSongRequest.send();

//XHR objects emit events when operations are complete or on error
newSongRequest.addEventListener("load", executeOnSuccess);
newSongRequest.addEventListener("failed", executeOnFailure)

//console.log("newSongRequest",newSongRequest);

//tell the XHR object what to do... 
function executeOnFailure(){
  alert("An Error Occured.... if on Mac please press command and R")
};
//on success load the object returned
//now thate are adding two files will call this function again
//so add the object again
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
  //console.log("moreSongRequest",moreSongRequest);

  //tell the XHR object what to do... 
  function moreExecuteOnFailure(){
    alert("An Error Occured.... if on Mac please press command and R")
  };
  //on success load the object returned
  //now thate are adding two files will call this function again
  //so add the object again
  function moreExecuteOnSuccess(){
    var moreSongList = JSON.parse(this.responseText);
    //console.log("newSongListfromJSON", newSongList.songs );
    //Call the function to send to DOM
    //only after a successful load
    addedSongs(moreSongList.songs);
  };

};


