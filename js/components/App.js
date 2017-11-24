import React from "react";
import Navibar from "./Navibar";

class App extends React.Component {
	componentWillReceiveProps() {
		window.previousLocation = this.props.location;
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

export default App;
