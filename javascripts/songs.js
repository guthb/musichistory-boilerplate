//---Exe 5 Every innerHTML, getElementById, getElementByClassName,-----------------//
//---event listener and XHR request. Covert 'em all to jQuery----------------------//
"use strict";

//---------------------define varibles---------------------------------------------//
var songs = [];
var viewMusic = $("#viewMusic");
//---------------------new page added for MH3--------------------------------------//
var addMusic = $("#addMusic");

//--------------------Areas of the page--------------------------------------------//
var viewMusicDiv = $("#listOfMusic");
var addMusicPage = $("#addForm");
var controlMusicDiv = $("#musicControl");
var addMusicButton = $("#addButton");
var filterButton = $("#filterButton");
var songList = $("#songListDom");

//---------------------refactored for Exe 8----------------------------------------//
//---------------------populate on page load---------------------------------------//
$(document).ready(function() {
  //need load songs from Json file ajax calls
    console.log("doucment ready test" );
   $.ajax({
    url: "https://musichistory-bg-e3.firebaseio.com/songs.json"})
        .done(addedSongs);//replace addedSongs with UpdateSongsEntered
});


//------------change to function so new songs can be entered through new page----------//
//------------Loop over results and inject into Music History list view----------------//
//------------add a delete button into string sent to song list-----------------------//
//------------pull in the songs object-----------------------------------------------//

function updateSongsEntered(songs){
 console.log("songs in updateSongsEntered", songs);
  var songListString ="";

  for (let song in songs) {
    songListString +=
    "<li id='"+ song+"'>" +
    songs[song].title +
    " by " +
    songs[song].artist +
    " on the Album " +
    songs[song].album +
    "<button class='deleteButton'>Delete</button>" +
    "</li>";
  }
  //console.log("songlist string", songListString);
  songList.html(songListString);

  watchForDelete();
}

//-------------------watch the delete button------------------------------------------------//
function watchForDelete() {
  //var deleteButton = document.getElementsByClassName("deleteButton")
  let deleteButton =$(".deleteButton");
  for (var i = 0; i < deleteButton.length; i++) {
    $(deleteButton[i]).on("click", deleteSong);
  }
}

//------------listParent is the Parent of the button. once envoked remove the li -----------------//
//-------------as the child of the ordered list since deleting the li removes the entire entry----//
function deleteSong(event) {
  let listParent = $(event.target.parentElement);
  $(listParent, songList).remove();
   console.log("songlist",songList );
//------------------call ajax  to remove from firebase---------------------//







}//end of delete song

//--------------------------function for View Music page--------------------//
function viewMusicVisible(){
  viewMusicDiv.removeClass("hidden");
  viewMusicDiv.addClass("visible");
  controlMusicDiv.removeClass("hidden");
  controlMusicDiv.addClass("visible");
  addMusicPage.removeClass("visible");
  addMusicPage.addClass("hidden");
  addMusicButton.removeClass("visible");
  addMusicButton.addClass("hidden");
}
//--------------------------function for Add Music page--------------------//
function addMusicVisible(){
  addMusicPage.removeClass("hidden");
  addMusicPage.addClass("visible");
  addMusicButton.removeClass("hidden");
  addMusicButton.addClass("visible");
  viewMusicDiv.removeClass("visible");
  viewMusicDiv.addClass("hidden");
  controlMusicDiv.removeClass("visible");
  controlMusicDiv.addClass("hidden");
}


//-------add event listeners on the links for the navigation bar to invoke--------//
//-------the function to make visible or hidden----------------------------------//
viewMusic.click(viewMusicVisible);
addMusic.click(addMusicVisible);

//fills out the song form and clicks the add button, you should collect
//all values from the input fields, add the song to your array of songs,
//and update the song list in the DOM.
function addedSongs(songsfromJson){
 // for let (songs in songsfromJson)

  console.log("songsfromJson", songsfromJson);
  // songsfromJson = songsfromJson.songs;


  // for (let song in songsfromJson){
  //   songs.push(songsfromJson[song]);
  // };


  // for (var i = 0; i < songsfromJson.length; i++) {
  //   songs.push(songsfromJson[i]);
  // }
  //call the update dom function
  updateSongsEntered(songsfromJson);
}


//--------------------------update songs from add songs page------------------------------------//
//function updateSongs(){
  //todo?? move 159 -> 163 into here   then call  addedsongs
  //console.log("in updateSongs" );
  // var songEntered = $("#addTitle");
  // var artistEntered = $("#addArtist");
  // var albumEntered = $("#addAlbum");
  // songs.push({ "title": songEntered.val(), "artist": artistEntered.val(), "album":albumEntered.val()});
  // //call the update dom function
  // updateSongsEntered(songs);
  // //reset the form values for next entry
  // songEntered.val("");
  // artistEntered.val("");
  // albumEntered.val("");
//}


//---------when the add music button is clicked, envoke function to add those songs to array--------//
// addMuiscButton.click(updateSongs);
addMusicButton.click(loadNextFile);

//---------------------when user presses more button pull in second JSON file-----------------------//

// var moreMusicButton =$("#moreButton");
// moreMusicButton.click(loadNextFile);

//---------when the more button is clicked, envoke function to add those songs to array------------//
function loadNextFile(event) {

    // let newSong ={
    //   "title":"crap2"
    //   "album":"blah",
    //   "artist":"whatever"
    // }

    let newSong ={
     "title":$("#addTitle").val(),
      "album":$("#addAlbum").val(),
      "artist": $("#addArtist").val()
    };



  $.ajax({
    url: "https://musichistory-bg-e3.firebaseio.com/songs/.json",
    type: "POST",
    data: JSON.stringify(newSong)
  }).done(function(songsfromPost){
    console.log("it saved", songsfromPost);
    return addedSongs;  //why did  i have to add this
 });
  //addedSongs
  console.log("dom?");
  console.log("songid", songs );
    // success: addedSongs
  // });
//--------------------------update songs from add songs page------------------------------------------//
 var songEntered = $("#addTitle");
 var artistEntered = $("#addArtist");
 var albumEntered = $("#addAlbum");
 songs.push({ "title": songEntered.val(), "artist": artistEntered.val(), "album":albumEntered.val()});
//--------------------------call the update dom function----------------------------------------------//
  updateSongsEntered(songs);
//--------------------------------reset the form values for next entry-------------------------------//
  songEntered.val("");
  artistEntered.val("");
  albumEntered.val("");
} //end of  loadNext file


