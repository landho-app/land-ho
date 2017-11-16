import React from "react";
import { Route } from "react-router";
import App from "./components/App";
import Countries from "./components/Countries";
import Country from "./components/Country";
import City from "./components/City";
import Info from "./components/Info";
import Welcome from "./components/Welcome";

export default (
	<Route component={App}>
		<Route path="/" component={Countries} />
		<Route path="/info" component={Info} />
		<Route path="/countries" component={Countries} />
		<Route path="/countries/:query" component={Countries} />
		<Route path="/country/:slug/city/:cityslug" component={City} />
		<Route path="/country/:slug" component={Country} />
		<Route path="/country/:slug/:part" component={Country} />
		<Route path="/welcome" component={Welcome} />
	</Route>
);
