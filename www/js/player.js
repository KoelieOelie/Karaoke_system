function get_iframe(ifr_id) {
	console.log("update gegevens");
	var songs_contaner =document.getElementsByTagName("data")[0];
	console.log("var songs_contaner");
	var songs_list=JSON.parse(JSON.stringify(songs_contaner.dataset));
	var songs_to_render=songs_list.songsCont;
	if (songs_to_render!=-1) {
		console.log(JSON.stringify(songs_list));
		var songs_list_content="";
		var myIFrame = document.getElementById(ifr_id);
		var template = $("template#iframe_template")[0];


		template.content.children[0].children[0].innerText="Hello";
		console.log(template);
		for (var i = 0; i <= songs_to_render; i++) {
			$(template.content.children[0]).attr('data-songid',i);
			template.content.children[0].children[0].innerText=songs_list["song"+i+"Title"];
			template.content.children[0].children[0].innerText=songs_list["song"+i+"Title"];
			template.content.children[0].children[1].innerText=songs_list["song"+i+"Artists"];
			template.content.children[0].children[2].innerText=songs_list["song"+i+"Alburm"];
			songs_list_content+=template.innerHTML;
		}


	 myIFrame.contentWindow.document.body.innerHTML = songs_list_content;
	} else {
		Error_handeler("Internal error");
	}
}
function keuze_veranderd(iframe) {
	var cScr=iframe.contentWindow.location.href;
	var oSrc=iframe.getAttribute("data-src");
	var id=cScr.replace(oSrc, "");
	if (id!=""&&oSrc!="") {
		console.log(id);
		console.log(title);
		var title=JSON.parse(JSON.stringify(document.getElementsByTagName("data")[0].dataset))["song"+id+"Title"];
		$("#title_song_playing").text(title);
		load_page("player");
	}
	if (oSrc=="") {
		console.log(oSrc);
		console.log("init");
		$(iframe).attr( "data-src", cScr+"?" );

	}
}
