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

  console.log("doucment ready test" );

  function loadanddisplaysongs(){

   $.ajax({
    url: "https://musichistory-bg-e3.firebaseio.com/songs.json"})
        .done(addedSongs);//replace addedSongs with UpdateSongsEntered

  }
  loadanddisplaysongs();

//------------change to function so new songs can be entered through new page----------//
//------------Loop over results and inject into Music History list view----------------//
//------------add a delete button into string sent to song list-----------------------//
//------------pull in the songs object-----------------------------------------------//


function deleteSongDB(NeedsongKey){

  $.ajax({
      url: "https://musichistory-bg-e3.firebaseio.com/songs/"+ NeedsongKey +"/.json",
      method: "DELETE"
    })
    .done(function(response) {
    console.log("response from Firebase:", response);
    //loadsongs();
    loadanddisplaysongs();
});
  }


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
    "<button class='editButton'>editButton</button>" +
    "<button class='deleteButton'>Delete</button>" +
    "</li>";
  }

  //console.log("songlist string", songListString);
  songList.html("");

  songList.append(songListString);

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
  let listParent = $(event.target).closest('li')[0].id;
  //let listParent = $(event.target.parentElement);
  $(listParent, songList).remove();
   //console.log("songlist",songList );

   console.log("listParent", listParent);

   deleteSongDB(listParent);


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

  updateSongsEntered(songsfromJson);
}

addMusicButton.click(loadNextFile);

//---------------------when user presses more button pull in second JSON file-----------------------//


//---------when the more button is clicked, envoke function to add those songs to array------------//
function loadNextFile(event) {

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
    //loadsongs();
    //loadanddisplaysongs()
    return addedSongs();  //why did  i have to add this
 });

  console.log("dom?");
  console.log("songid", songs );

//--------------------------update songs from add songs page------------------------------------------//
 var songEntered = $("#addTitle");
 var artistEntered = $("#addArtist");
 var albumEntered = $("#addAlbum");
 songs.push({ "title": songEntered.val(), "artist": artistEntered.val(), "album":albumEntered.val()});
//--------------------------call the update dom function----------------------------------------------//

  loadanddisplaysongs();
//--------------------------------reset the form values for next entry-------------------------------//
  songEntered.val("");
  artistEntered.val("");
  albumEntered.val("");
}

});


//});

