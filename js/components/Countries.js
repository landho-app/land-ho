import React from "react";
import {Link} from "react-router";

class Countries extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"countries": {}
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$.getJSON("/data/countries.json", function(countries) {
			this.setState({
				"countries": countries
			});
		}.bind(this));
	}

	// RENDER
	render() {

		return (
			<div className="row">
				<div className="col-md-4"></div>
				<div className="col-md-4">

					{Object.keys(this.state.countries).map(area => (
						<div className="list-group" key={area}>
							<a className="list-group-item disabled">
								{area}
							</a>

							{this.state.countries[area].map(c => (
								<Link key={c.slug} to={"/country/" + c.slug} className="list-group-item">{c.name}</Link>
							))}
						</div>
					))}

				</div>
				<div className="col-md-4"></div>
			</div>
		);
	}
}

export default Countries;
