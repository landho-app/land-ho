import React from "react";
import {Link} from "react-router";

class Countries extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"countries": {},
			"original": {}
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {

		$.getJSON("/data/countries.json", function(countries) {

			this.setState({
				"countries": countries,
				"original": countries
			});
		}.bind(this));
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {

		var query = nextProps.params.query;
		if(query && query.length > 0) {

			var countries = {};

			for(var area in this.state.original) {
				countries[area] = [];
				for(var c in this.state.original[area]) {
					var country = this.state.original[area][c];
					if(country.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
						countries[area].push(country);
					}
				}

				if(countries[area].length === 0) {
					delete countries[area];
				}
			}

			this.setState({
				"countries": countries
			});
		}
		else {
			this.setState({
				"countries": this.state.original
			});
		}
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
								<Link key={c.slug} to={"/country/" + c.slug} className="list-group-item">
									{(c.flag) ? <img className="flag-icon" src={"/data/" + c.slug + c.flag} width="30" height="20" /> : <img src="/img/spacer.png" width="30" height="20" />}
									<span className="country-list-span">{c.name}</span>
								</Link>
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
