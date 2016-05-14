import React from "react";
import {Link} from "react-router";

class Country extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"content": null
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {

		var part = this.props.params.part || "profile";
		var slug = this.props.params.slug;

		this.loadData(slug, part);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {

		var part = nextProps.params.part || "profile";
		var slug = nextProps.params.slug;
		this.loadData(slug, part);
	}

	// LOAD DATA
	loadData(slug, part) {
		$.get("/data/" + slug + "/" + part + ".html", function(content) {

			// fix image paths
			content = content.replace("src=\"/images", "src=\"/data/" + slug + "/images");

			this.setState({
				"content": content
			});
		}.bind(this));
	}

	// RENDER
	render() {

		return (
			<div className="row">
				<div className="col-md-3">
					<div className="list-group" data-spy="affix" data-offset-top="60" data-offset-bottom="200">
						<Link to={"/country/" + this.props.params.slug + "/profile"} className="list-group-item">
							<i className="fa fa-user fa-fw" aria-hidden="true"></i> Profile
						</Link>
						<Link to={"/country/" + this.props.params.slug + "/general"} className="list-group-item">
							<i className="fa fa-globe fa-fw" aria-hidden="true"></i> General Info
						</Link>
						<Link to={"/country/" + this.props.params.slug + "/formalities"} className="list-group-item">
							<i className="fa fa-book fa-fw" aria-hidden="true"></i> Formalities
						</Link>
					</div>
				</div>
				<div className="col-md-9" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
			</div>
		);
	}
}

export default Country;
