import React from "react";
import Navibar from "./Navibar";
import PropTypes from "prop-types";

class App extends React.Component {
	// CONSTRUCTOR
	constructor(props, context) {
		super(props, context);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps() {
		window.previousLocation = this.context.router.location.pathname;
	}

	// RENDER
	render() {
		const navibar =
			this.props.location.pathname !== "/welcome" ? (
				<Navibar key="navibar" params={this.props.params} />
			) : null;

		return [
			navibar,
			<div key="main" className="container">
				{this.props.children}
			</div>
		];
	}
}

App.contextTypes = {
	router: PropTypes.object.isRequired
};

export default App;
