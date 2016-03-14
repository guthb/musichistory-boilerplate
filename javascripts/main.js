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

console.log(viewMusicDiv );
console.log(addMusicPage );
console.log(controlMusicDiv);

//array for songs
var songsEntered = [["Song Name", "Artist", "Album"]];

//build functions for visability of pages

function viewMusicVisible(){
  viewMusicDiv.classList.remove("hidden");
  viewMusicDiv.classList.add("visible");
  controlMusicDiv.classList.remove("hidden")
  controlMusicDiv.classList.add("visible");
  addMusicPage.classList.remove("visible");
  addMusicPage.classList.add("hidden");
};

function addMusicVisible(){
  addMusicPage.classList.remove("hidden")
  addMusicPage.classList.add("visible");
  viewMusicDiv.classList.remove("visible");
  viewMusicDiv.classList.add("hidden");
  controlMusicDiv.classList.remove("visible");
  controlMusicDiv.classList.add("hidden");
};


//add event listeners on the links for the navigation bar to
//invoke the function to make visable ot hidden
viewMusic.addEventListener("click", viewMusicVisible);
addMusic.addEventListener("click" , addMusicVisible);