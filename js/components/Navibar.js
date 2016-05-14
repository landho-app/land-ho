import React from "react";
import {Link} from "react-router";

class Navibar extends React.Component {

	// RENDER
	render() {

		console.log(this.props.params);

		return (
			<div className="navbar navbar-default navbar-fixed-top">
		      <div className="container">
		        <div className="navbar-header">
					{("slug" in this.props.params)
					?
					<Link to="/" className="navbar-brand">
						<i className="fa fa-arrow-left fa-fw"></i>
					</Link>
					:
						<Link to="/" className="navbar-brand">
							<img className="navbar-brand-img" src="img/icon.png" height="24" />
							Land ho!
	  				  	</Link>
					}
				  <center>
					  <form className="navbar-form search-center" role="search">
						  <div className="form-group">
							<input type="text" width="200" className="form-control" placeholder="Search countries" />
						  </div>
					  </form>
				  </center>
		        </div>
		      </div>
		    </div>
		);
	}
}

export default Navibar;
