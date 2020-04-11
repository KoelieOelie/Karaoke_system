function load_song(song_contader) {
	var songid=song_contader.getAttribute("data-songid");
	location.href="menu.htm?"+songid;
}
