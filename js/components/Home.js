import React from "react";
import Countries from "./Countries";
import PropTypes from "prop-types";

class Home extends React.Component {
	constructor(props, context) {
		super(props, context);

		// redirect to welcome page if this is a first start
		if (!window.localStorage.getItem("secondStartToken")) {
			this.context.router.push("/welcome");
		}
	}

	render() {
		return <Countries />;
	}
}

Home.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Home;
