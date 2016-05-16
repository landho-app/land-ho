import React from "react";
import Router from "react-router";
import ReactDOM from "react-dom";
import createHashHistory from "history/lib/createHashHistory";
import useRouterHistory from "react-router";
import routes from "./routes";

let history = createHashHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById("app"));
