//Exe 5 Every innerHTML, getElementById, getElementByClassName,
//event listener and XHR request. Covert 'em all to jQuery
"use strict";
//define varibles:
var songs = [];
var viewMusic = $("#viewMusic");
//new page added for MH3
var addMusic = $("#addMusic");
//Areas of the page
var viewMusicDiv = $("#listOfMusic");
var addMusicPage = $("#addForm");
var controlMusicDiv = $("#musicControl");
var addMuiscButton = $("#addButton");

$(document).ready(function() {
  //need load songs from Json file  ajax calls
   $.ajax({
    url: "songs.json",
       success: addedSongs
  });
});


//pull in main element requested to be populated
var songList = $("#songListDom");

//change to function so new songs can be entered through new page
//Loop over results and inject into Music History list view
//add a delete button into string sent to song list
//pull in the songs object

function updateSongsEntered(songs){
  var songListString ="";
  for (var i = 0; i < songs.length; i++) {
    songListString += "<li>" + songs[i].title +  " by " + songs[i].artist +
    " on the Album " + songs[i].album + "<button class='deleteButton'>Delete</button>" +"</li>";
  }
  songList.html(songListString);
  // watch the delete button
  watchForDelete();
}

function watchForDelete() {
  //var deleteButton = document.getElementsByClassName("deleteButton")
  var deleteButton =$(".deleteButton");
  for (var i = 0; i < deleteButton.length; i++) {
    $(deleteButton[i]).on("click", deleteSong);
  }
}
//listParent is the Parent of the button.
//once envoked remove the li as the child of the ordered list
//since deleting the li removes the entire entry
function deleteSong(event) {
  var listParent = $(event.target.parentElement);
  $(listParent, songList).remove();
}

//build functions for visability of pages
function viewMusicVisible(){
  viewMusicDiv.removeClass("hidden");
  viewMusicDiv.addClass("visible");
  controlMusicDiv.removeClass("hidden");
  controlMusicDiv.addClass("visible");
  addMusicPage.removeClass("visible");
  addMusicPage.addClass("hidden");
  addMuiscButton.removeClass("visible");
  addMuiscButton.addClass("hidden");
}

function addMusicVisible(){
  addMusicPage.removeClass("hidden");
  addMusicPage.addClass("visible");
  addMuiscButton.removeClass("hidden");
  addMuiscButton.addClass("visible");
  viewMusicDiv.removeClass("visible");
  viewMusicDiv.addClass("hidden");
  controlMusicDiv.removeClass("visible");
  controlMusicDiv.addClass("hidden");
}

//add event listeners on the links for the navigation bar to
//invoke the function to make visible or hidden

viewMusic.click(viewMusicVisible);
addMusic.click(addMusicVisible);
//fills out the song form and clicks the add button, you should collect
//all values from the input fields, add the song to your array of songs,
//and update the song list in the DOM.
function addedSongs(songsfromJson){
  songsfromJson = songsfromJson.songs;
  for (var i = 0; i < songsfromJson.length; i++) {
    songs.push(songsfromJson[i]);
  }
  //call the update dom function
  updateSongsEntered(songs);
}

//update songs from add songs page
function updateSongs(){
  var songEntered = $("#addTitle");
  var artistEntered = $("#addArtist");
  var albumEntered = $("#addAlbum");
  songs.push({ "title": songEntered.val(), "artist": artistEntered.val(), "album":albumEntered.val()});
  //call the update dom function
  updateSongsEntered(songs);
  //reset the form values for next entry
  songEntered.val("");
  artistEntered.val("");
  albumEntered.val("");
}

//when the add music button is clicked, envoke function
//to add those songs to array
addMuiscButton.click(updateSongs);

//when user presses more button pull in second JSON file
var moreMusicButton =$("#moreButton");
moreMusicButton.click(loadNextFile);
//when the more button is clicked, envoke function
//to add those songs to array
function loadNextFile(event) {
  $.ajax({
    url: "songs2.json",
    success: addedSongs
  });
}
