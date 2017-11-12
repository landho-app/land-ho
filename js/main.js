import React from "react";
import { Router, Route, hashHistory } from "react-router";
import ReactDOM from "react-dom";
import createHashHistory from "history/lib/createHashHistory";
import useRouterHistory from "react-router";
import routes from "./routes";

// parse the url query string
var parseQueryString = function() {
	var str = window.location.search;
	var objURL = {};

	str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function(
		$0,
		$1,
		$2,
		$3
	) {
		objURL[$1] = $3;
	});
	return objURL;
};

// check if electron version params are available
var params = parseQueryString();
if ("version" in params) {
	window.appVersion = params["version"];
}

// start react router
ReactDOM.render(
	<Router history={hashHistory}>{routes}</Router>,
	document.getElementById("app")
);
