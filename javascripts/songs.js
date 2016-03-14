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

for (var i = 0; i < songs.length; i++) {
  var songStringReplace = songs[i].replace(/[>*@(!]/g, "");
  songStringReplace =songStringReplace.replace(/[>]/g, "-");
  songList.innerHTML += "<li>" + songStringReplace + "</li>";
}