import React from "react";
import Navibar from "./Navibar";

class App extends React.Component {

	// RENDER
	render() {
		return (
			<div>
				<Navibar params={this.props.params} />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
