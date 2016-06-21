// phonegap is ready
document.addEventListener("deviceready", function() {

	alert("Device ready");
	if(window.StatusBar) {

		StatusBar.overlaysWebView(false);
		StatusBar.styleBlackOpaque();
	}
});
