import React, { Component } from "react";

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			downloading: false
		};
	}

	onDownloadClick() {
		this.setState({
			downloading: true
		});
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
							style={{ marginTop: "30px" }}
						>
							<ul>
								<li>
									In order to use Land Ho! offline, you need
									to download the latest cruising information
									data.
								</li>
								<li>
									Make sure to be connected with a reasonable
									Internet connection: the download size is
									~45MB
								</li>
							</ul>
							<center>
								<button
									className="btn btn-primary btn-lg"
									style={{ marginTop: "30px" }}
									onClick={this.onDownloadClick.bind(this)}
								>
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
									style={{ marginTop: "10px" }}
								>
									<div
										className="progress-bar progress-bar-info progress-bar-striped"
										role="progressbar"
										aria-valuenow="45"
										aria-valuemin="0"
										aria-valuemax="100"
										style={{ width: "45%" }}
									>
										<span className="sr-only">
											45% Complete
										</span>
									</div>
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
