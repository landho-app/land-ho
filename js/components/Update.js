import React from "react";

class Update extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			body: null,
			updateVersion: null
		};
	}

	// VERSION STRING TO NUMBER
	versionStringToNumber(v) {
		var v = parseInt(v.replace(/\./g, ""));
		if (v < 100) {
			v = parseInt(v + "0");
		}
		return v;
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		// check if this is run on electron
		if (!window.appVersion) {
			return;
		}

		var currentVersion = window.appVersion;

		$.get(
			"https://api.github.com/repos/landho-app/landho-electron/releases",
			versions => {
				var updateVersionData = null;

				// iterate through versions
				for (var i in versions) {
					var version = this.versionStringToNumber(versions[i].name);
					if (version > this.versionStringToNumber(currentVersion)) {
						updateVersionData = versions[i];
					}
				}

				// an update is available and it is not yet ignored
				if (
					updateVersionData &&
					!localStorage.getItem("ignore." + updateVersionData.name)
				) {
					// update the body of the modal view
					this.setState({
						body: updateVersionData.body,
						updateVersion: updateVersionData.name
					});

					// show the modal
					window.setTimeout(function() {
						$("#uptModal").modal("show");
					}, 2000);
				}
			}
		).fail(() => {
			console.debug("Updates cannot be determined becase offline.");
		});
	}

	// ignore update
	ignoreUpdate() {
		// store the info to ignore this version
		localStorage.setItem(
			"ignore." + this.state.updateVersion,
			new Date().getTime() / 1000
		);
		console.debug("ignore", this.state.updateVersion);
	}

	// RENDER
	render() {
		return (
			<div className="modal fade" id="uptModal" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">
								<i
									className="fa fa-refresh"
									aria-hidden="true"
								/>{" "}
								New update is available!
							</h4>
						</div>
						<div className="modal-body">
							<p
								dangerouslySetInnerHTML={{
									__html: this.state.body
								}}
							/>
							<center>
								<p>
									<a
										href="https://landho-app.com"
										target="_blank"
										id="downloadUpdateBtn"
										className="btn btn-primary btn-lg"
									>
										<i className="fa fa-download" />{" "}
										Download now!
									</a>
								</p>
							</center>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-link"
								data-dismiss="modal"
							>
								Remind me later...
							</button>
							<button
								type="button"
								className="btn btn-link"
								data-dismiss="modal"
								onClick={this.ignoreUpdate.bind(this)}
							>
								Ignore update
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Update;
