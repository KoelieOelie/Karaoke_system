function run(ip) {
	console.log("Submitted");
	$("#form").addClass("hide");
	//if (true) {
		console.log("ilink"+ip);
	//}
	$( "input#base_url" ).val(ip);
	$('#info .pending').removeClass("hide");
	$('.complete').addClass("hide");
	$('.Failed').addClass("hide");
	$("#info").removeClass("hide");
	setTimeout(myFunction, 3000);
}
function myFunction() {
	console.log("loading");
	var url="http://"+$( "input#base_url" ).val()+"/Karaoke_system/get_songs.php?Version=0.0.1";
	var request = $.ajax({
		url: url,
		method: "POST",
		data: { query : "get_info" },
		dataType: "json"
	});
	request.done(function( msg ) {
		console.log("json cofurm");
		document.querySelector('#info .pending').className += ' hide';
		var completeElem = document.querySelector('#info .complete');
		completeElem.className = completeElem.className.split('hide').join('');
		render_songs(msg);
		console.log(JSON.stringify(msg));
		msg.forEach((row, i) => {
			console.log(JSON.stringify(row));
		});
	});
	request.fail(function( jqXHR, textStatus ) {
		console.log(jqXHR);
		switch (jqXHR.status) {
			case 0:
				console.log("url loading error");
				Error_handeler("url loading error");
				break;
			case 200:
				console.log("invalid json return");
				Error_handeler("invalid json return");
				break;
			default:
				Error_handeler(jqXHR.status);
				console.log("songs_loading_faild:"+jqXHR.status);
		}
	});
}
function Error_handeler(error) {
	$('.pending').addClass("hide");
	$('.complete').addClass("hide");
	$('.Failed').removeClass("hide");
	$(".Failed span").text(error+"");
	$("#form").removeClass("hide");
}
function render_songs(songs) {
	load_page("main");
	$("#info").addClass("hide");
	//var songs_contaner = $("data#songs_list");
	get_iframe("ifr");

}
