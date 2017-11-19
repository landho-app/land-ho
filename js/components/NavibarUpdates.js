import React, { Component } from "react";
import { Link } from "react-router";
import { Offline, Online } from "react-detect-offline";
import UpdateStore from "../stores/UpdateStore";
import UpdateActions from "../actions/UpdateActions";
import ReactTooltip from "react-tooltip";

class NavibarUpdates extends Component {
	constructor(props) {
		super(props);
		this.state = UpdateStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		UpdateStore.listen(this.onChange);
		UpdateActions.startSync();
	}

	componentWillUnmount() {
		UpdateStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		var updating = Object.values(this.state.updating).some(u => {
			return u === true;
		});

		return [
			<ReactTooltip key="updates_tooltip" />,
			<Online key="updates_online">
				{updating === true ? (
					<p
						className="navbar-text navbar-right update-status"
						data-tip="An update of your stored cruising info is in progress. Stay online!">
						<i className="fa fa-spinner fa-spin" /> Updating data
					</p>
				) : (
					<p
						className="navbar-text navbar-right update-status"
						data-tip="Your stored cruising info is all up to date!">
						<i className="fa fa-check" /> Up to date
					</p>
				)}
			</Online>,
			<Offline key="updates_offline">
				<p
					className="navbar-text navbar-right update-status"
					data-tip="Next time you connect to the internet, the app will automatically check for updates.">
					<i className="fa fa-globe" /> Offline
				</p>
			</Offline>
		];
	}
}

export default NavibarUpdates;
