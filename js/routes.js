import React from "react";
import {Route} from "react-router";
import App from "./components/App";
import Countries from "./components/Countries";
import Country from "./components/Country";

export default (
	<Route component={App}>
		<Route path="/" component={Countries} />
		<Route path="/country/:slug" component={Country} />
		<Route path="/country/:slug/:part" component={Country} />
	</Route>
);
