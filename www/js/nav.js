		function load_page(pageid) {
			if (pageid=="main") {
				get_iframe("ifr");
			}
			console.log("page change to "+pageid);
			$('body').data('page',pageid);
			window.location.hash = pageid;

		}
		var pages=[];
		pages["one"]=["main",""];
		pages["player"]=["main","stop_playing"];
		pages["main"]=["end","exitApp"];
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
			load_page('one');
			console.log(">>>Report: " + "deviceready");
			//var myIFrame = document.getElementById("ifr");
			//myIFrame.contentWindow.document.body.innerHTML = "";
		  document.addEventListener("backbutton", onBackKeyDown, false);
			//Listen to the User clicking on the back button
		}

		function onBackKeyDown(e) {
			var cPage=$('body').data('page');
			e.preventDefault();
			var page=pages[cPage][0];
			var fun=pages[cPage][1];
			if (page=="end"&&fun=="exitApp") {
				navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", ["Yes","No"]);
			} else {
				console.log(page+" "+fun);
				load_page(page);
			}
		  // Prompt the user with the choice
		}

		function onConfirm(button) {
			switch (button) {
				case 1:
					console.log("onConfirm:BYE");
					navigator.app.exitApp();
					break;
				case 2:
					console.log("onConfirm:NO");
					return;
					break;
				default:
					console.log("onConfirm:OO");
					return;
			}
		}
