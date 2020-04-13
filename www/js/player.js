function showContent() {
	console.log("update gegevens");
	var myArr = ["Audi", "BMW", "Ford", "Honda", "Jaguar", "Nissan"];
	var myIFrame = document.getElementById("ifr");
	myIFrame.contentWindow.document.body.innerHTML="";
	var temp, item, a, i,songs;
	//get the template element:
	temp = document.getElementsByTagName("template")[0];
	var songs_contaner =document.getElementsByTagName("data")[0];
	var songs_list=JSON.parse(JSON.stringify(songs_contaner.dataset));
	console.log(JSON.stringify(songs_list));
	//get the DIV element from the template:
	item = temp.content.querySelector("div");
	//for each item in the array:
	for (i = 0; i < myArr.length; i++) {
		//Create a new node, based on the template:
		a = document.importNode(item, true);
		console.log(a);

		//Add data from the array:
		a.innerHTML += myArr[i];
		//append the new node wherever you like:
		myIFrame.contentWindow.document.body.appendChild(a);
	}
}
function get_iframe(ifr_id) {
	console.log("callin w id "+ifr_id);
 // gets the object that refers to the iframe, uasing its id
 var myIFrame = document.getElementById(ifr_id);
 console.log("var myIFrame");
 var temp, item, a, i,songs;
 console.log("var temp, item, a, i,songs");
 temp = document.getElementsByTagName("template")[0];
 console.log();
  console.log("temp=template");
 item = temp.content.querySelector("div");
 console.log("item=query");
 var songs_contaner =document.getElementsByTagName("data")[0];
 console.log("var songs_contaner");
 var songs_list=JSON.parse(JSON.stringify(songs_contaner.dataset));
 console.log("var songs_list");
 console.log(JSON.stringify(songs_list));

 // Define a new text that will replace the content of the iframe
 content = item.innerHTML;
 console.log("content = item");

 // Modify the iframe content
 console.log("innerHTM = content");
 myIFrame.contentWindow.document.body.innerHTML = "content";
}
function keuze_veranderd(iframe) {
	var cScr=iframe.contentWindow.location.href;
	var oSrc=iframe.getAttribute("data-src");
	var id=cScr.replace(oSrc, "");
	if (id!=""&&oSrc!="") {
		console.log(id);
		$("#title_song_playing").text(id);
		load_page("player");
	}
	if (oSrc=="") {
		console.log(oSrc);
		console.log("init");
		$(iframe).attr( "data-src", cScr+"?" );

	}
}
