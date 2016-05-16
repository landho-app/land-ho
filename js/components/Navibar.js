import React from "react";
import {Link} from "react-router";

class Navibar extends React.Component {

	// KEY UP
	keyUp(e) {

		// ESC clears selection
		if(e.keyCode === 27) {

			e.target.value = "";
			this.props.history.pushState(null, "/");
			return;
		}

		var v = e.target.value;
		this.props.history.replaceState(null, "/countries/" + encodeURIComponent(v));
	}

	// RENDER
	render() {

		var linkBack = "/";
		if("cityslug" in this.props.params) {
			linkBack = "/country/" + this.props.params.slug + "/profile";
		}

		return (
			<div className="navbar navbar-default navbar-fixed-top">
		      <div className="container">
		        <div className="navbar-header">
					{("slug" in this.props.params)
					?
					<Link to={linkBack} className="navbar-brand">
						<i className="fa fa-arrow-left fa-fw"></i>
					</Link>
					:
						<Link to="/" className="navbar-brand">
							<img className="navbar-brand-img" src="img/icon.png" height="24" />
							Land ho!
	  				  	</Link>
					}
				  <center>
					  <div className="navbar-form search-center" role="search">
						  <div className="form-group">
							<input type="text" width="200" className="form-control" placeholder="Search countries" onKeyUp={this.keyUp.bind(this)} />
						  </div>
					  </div>
				  </center>
		        </div>
		      </div>
		    </div>
		);
	}
}

export default Navibar;
