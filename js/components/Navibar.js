import React from "react";

class Navibar extends React.Component {

	// RENDER
	render() {
		return (
			<div className="navbar navbar-default navbar-fixed-top">
		      <div className="container">
		        <div className="navbar-header">
		          <a href="../" className="navbar-brand">
					  <img className="navbar-brand-img" src="img/icon.png" height="24" />
					  Land ho!
				  </a>
		          <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar-main" aria-expanded="false">
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		        </div>
		        <div className="navbar-collapse collapse" id="navbar-main" aria-expanded="false">
					<form className="navbar-form navbar-left" role="search">
					    <div className="form-group">
					      <input type="text" width="200" className="form-control" placeholder="Search countries" />
					    </div>
					  </form>

		        </div>
		      </div>
		    </div>
		);
	}
}

export default Navibar;
