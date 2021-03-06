import React, { Component } from "react";
import UpdateStore from "../stores/UpdateStore";
import PropTypes from "prop-types";

class WelcomeProgressBar extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = UpdateStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		UpdateStore.listen(this.onChange);
	}

	componentWillUnmount() {
		UpdateStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state, () => {
			var updateFinished = Object.values(this.state.updating).every(u => {
				return u === false;
			});

			// redirect to index page if sync was complete
			if (this.state.progressPercentile > 95 && updateFinished) {
				// set second start token, to not be directed to the welcome screen again
				window.localStorage.setItem(
					"secondStartToken",
					new Date().getTime()
				);

				// move to homepage
				this.context.router.push("/");
			}
		});
	}

	render() {
		return (
			<div
				className="progress-bar progress-bar-info progress-bar-striped"
				role="progressbar"
				aria-valuenow={this.state.progressPercentile}
				aria-valuemin="0"
				aria-valuemax="100"
				style={{ width: this.state.progressPercentile + "%" }}>
				<span className="sr-only">
					{this.state.progressPercentile}% Complete
				</span>
			</div>
		);
	}
}

WelcomeProgressBar.contextTypes = {
	router: PropTypes.object.isRequired
};

export default WelcomeProgressBar;
