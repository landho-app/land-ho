// phonegap is ready
document.addEventListener("deviceready", function() {
	
	if(window.StatusBar) {

		StatusBar.overlaysWebView(false);
		StatusBar.styleBlackOpaque();
	}
});
