function run(ip) {
	console.log("Submitted");
	$("#form").addClass("hide");
	if (ip != "") {
		$( "input#base_url" ).val(ip);
		console.log("ilink"+ip);
	}

	$('#info .pending').removeClass("hide");
	$('.complete').addClass("hide");
	$('.Failed').addClass("hide");
	$("#info").removeClass("hide");
	setTimeout(myFunction, 3000);
}
function myFunction() {
	if (window.wizUtils)
    {
				console.log("loading");
				var url="https://"+$( "input#base_url" ).val()+"/Karaoke_system/get_songs.php?Version=0.0.1";
        //db = window.sqlitePlugin.openDatabase({name: "my.db", createFromLocation: 1});  // tries to use prepopulated database
				var request = $.ajax({
					url: url,
					method: "POST",crossDomain: true, cache: false,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: { query : "get_info" },
					dataType: "json"
				});
				request.done(function( msg ) {
					request_done(msg);
				});
				request.fail(function( jqXHR, textStatus ) {
					console.log(JSON.stringify(jqXHR));
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
    else
    {
			console.log("loading from memory");
			var json=[
				{
					"title":"A demo",
					"artists":"Jackwing",
					"alburm":"Karaoke",
					"art":["logo","file"]
				},{
					"title":"Demo Title",
					"artists":"Jackwing",
					"alburm":"Karaoke",
					"art":["logo","file"]
				},{
					"title":"Do i say more",
					"artists":"Jackwing",
					"alburm":"Karaoke",
					"art":["https://imgur.com/a/mRWxyD3","web"]
				}
			];
			console.log(JSON.stringify(json));
			request_done(json);

    }
}
function request_done(msg) {
	done_spach=true;
	console.log("json cofurm");
	render_songs(msg);
	document.querySelector('#info .pending').className += ' hide';
	var completeElem = document.querySelector('#info .complete');
	completeElem.className = completeElem.className.split('hide').join('');
}
function Error_handeler(error) {
	$('.pending').addClass("hide");
	$('.complete').addClass("hide");
	$('.Failed').removeClass("hide");
	$(".Failed span").text(error+"");
	$("#form").removeClass("hide");
}
function success() {
		return this.src;
    console.log("success: ", this.src);
  }

  function failure(why) {
		if (this.src) {
			var src = this.src;
		}else {
			var src=why;
		}
		return "img/tump_load_error.png";
    console.log("failure: ", src);
  }


  // this succeeds
function render_songs(songs) {
	console.log("loading of songs");
	load_page("main");
	$("#info").addClass("hide");
	var songs_contaner = $("data#songs_list");
	var count = -1;
	console.log(JSON.stringify(songs));
	songs.forEach((row, i) => {
		var title = $.parseHTML(row.title,null,false).reduce((string,node)=> string += node.textContent, "" );
		var artists = $.parseHTML(row.artists,null,false).reduce((string,node)=> string += node.textContent, "" );
		var alburm = $.parseHTML(row.alburm,null,false).reduce((string,node)=> string += node.textContent, "" );
		switch (row.art[1]) {
			case "expression":

				break;
			default:
				failure("not falid json on row "+i);
		}
		songs_contaner.attr('data-song'+i+'-title', title);
		songs_contaner.attr('data-song'+i+'-artists', artists);
		songs_contaner.attr('data-song'+i+'-alburm', alburm);
		console.log(checkImage("http://www.google.com/intl/en_com/images/srpr/logo3w.png", success(), failure()));
		console.log(JSON.stringify(row));
		console.log(i);
		count++;
	});
	songs_contaner.attr('data-songs-cont', count);
	console.log(songs_contaner.innerHTML);
	get_iframe("ifr");

}
