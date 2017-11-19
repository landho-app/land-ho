import React, { Component } from "react";
import WelcomeProgressBar from "./WelcomeProgressBar";
import UpdateActions from "../actions/UpdateActions";

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			downloading: false
		};
	}

	onDownloadClick() {
		this.setState(
			{
				downloading: true
			},
			() => {
				UpdateActions.getInfo();
				UpdateActions.startSync();
			}
		);
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3" />
				<div className="col-md-6">
					<center>
						<img src="img/icon.png" width="128" />
						<h1>
							Welcome to <i>Land Ho!</i>
						</h1>
						<h4>
							The Offline Sailboat Cruising Guides for all
							Countries, Worldwide.
						</h4>
					</center>

					{this.state.downloading === false ? (
						<div
							className="alert alert-info"
							role="alert"
							style={{ marginTop: "30px" }}>
							<ul>
								<li>
									You need to download the latest cruising
									information data.
								</li>
								<li>
									Watch your internet connection: the download
									size is ~45MB
								</li>
							</ul>
							<center>
								<button
									className="btn btn-primary btn-lg"
									style={{ marginTop: "30px" }}
									onClick={this.onDownloadClick.bind(this)}>
									<i className="fa fa-download" /> Start
									download
								</button>
							</center>
						</div>
					) : (
						<div style={{ marginTop: "80px" }}>
							<center>
								<p>
									<b>
										Download of cruising data in progress...
									</b>
								</p>
								<div
									className="progress"
									style={{ marginTop: "10px" }}>
									<WelcomeProgressBar />
								</div>
							</center>
						</div>
					)}
				</div>
				<div className="col-md-3" />
			</div>
		);
	}
}

export default Welcome;
