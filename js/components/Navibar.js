import React from "react";
import { Link } from "react-router";

class Navibar extends React.Component {
	// KEY UP
	keyUp(e) {
		// ESC clears selection
		if (e.keyCode === 27) {
			e.target.value = "";
			this.props.history.pushState(null, "/");
			return;
		}

		var v = e.target.value;
		this.props.history.replaceState(
			null,
			"/countries/" + encodeURIComponent(v)
		);
	}

	// RENDER
	render() {
		var linkBack = "/";
		if ("cityslug" in this.props.params) {
			linkBack = "/country/" + this.props.params.slug + "/profiles";
		}

		// info page, return to previous location
		if (location.hash.indexOf("#/info") >= 0) {
			if (window.previousLocation) {
				linkBack = window.previousLocation.pathname;
			}
		}

		// show back button?
		var showBackButton =
			location.hash.indexOf("#/info") >= 0 || "slug" in this.props.params;

		return (
			<div className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						{showBackButton === true ? (
							<Link
								to={linkBack}
								className="navbar-brand arrow-left"
							>
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
							role="search"
						>
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
				</div>
			</div>
		);
	}
}

export default Navibar;
