import React from "react";
import { Link } from "react-router";
import NavibarUpdates from "./NavibarUpdates";
import PropTypes from "prop-types";

class Navibar extends React.Component {
	// CONSTRUCTOR
	constructor(props, context) {
		super(props, context);
	}

	// KEY UP
	keyUp(e) {
		// ESC clears selection
		if (e.keyCode === 27) {
			e.target.value = "";
			this.context.router.push("/");
			return;
		}

		var v = e.target.value;
		this.context.router.push("/countries/" + encodeURIComponent(v));
	}

	// GO TO
	goTo() {
		this.context.router.goBack();
	}

	// RENDER
	render() {
		// show back button?
		var showBackButton =
			this.context.router.location.pathname.indexOf("/info") >= 0 ||
			"slug" in this.props.params;

		return (
			<div className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						{showBackButton === true ? (
							<Link
								onClick={this.goTo.bind(this)}
								style={{ cursor: "pointer" }}
								className="navbar-brand arrow-left">
								<i className="fa fa-arrow-left fa-fw" />
							</Link>
						) : (
							<Link to="/" className="navbar-brand hidden-xs">
								<img
									className="navbar-brand-img"
									src="img/icon.png"
									height="24"
								/>
								<span className="hidden-xs hidden-sm">
									Land ho!
								</span>
							</Link>
						)}
					</div>

					<center>
						<div
							className="navbar-form search-center"
							role="search">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="Search countries"
									onKeyUp={this.keyUp.bind(this)}
								/>
							</div>
						</div>
					</center>

					<p className="navbar-text navbar-right">
						<Link to="/info" className="navbar-link info">
							<i className="fa fa-info-circle" />
						</Link>
					</p>

					<NavibarUpdates />
				</div>
			</div>
		);
	}
}

Navibar.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Navibar;
