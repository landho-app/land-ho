import React from "react";
import Navibar from "./Navibar";
import Update from "./Update";

class App extends React.Component {
	componentWillReceiveProps() {
		window.previousLocation = this.props.location;
	}

	// RENDER
	render() {
		return (
			<div>
				<Update />
				<Navibar
					history={this.props.history}
					params={this.props.params}
				/>
				<div className="container">{this.props.children}</div>
			</div>
		);
	}
}

export default App;
