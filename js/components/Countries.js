import React from "react";
import { Link } from "react-router";
import CountriesActions from "../actions/CountriesActions";
import CountriesStore from "../stores/CountriesStore";

class Countries extends React.Component {
	constructor(props) {
		super(props);
		this.state = CountriesStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		CountriesStore.listen(this.onChange);
		CountriesActions.getCountries();
	}

	componentWillUnmount() {
		CountriesStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	// COMPONENT WILL RECEIVE PROPS
	/*componentWillReceiveProps(nextProps) {
		var query = nextProps.params.query;
		if (query && query.length > 0) {
			var countries = {};

			for (var area in this.state.original) {
				countries[area] = [];
				for (var c in this.state.original[area]) {
					var country = this.state.original[area][c];
					if (
						country.name
							.toLowerCase()
							.indexOf(query.toLowerCase()) >= 0
					) {
						countries[area].push(country);
					}
				}

				if (countries[area].length === 0) {
					delete countries[area];
				}
			}

			this.setState({
				countries: countries
			});
		} else {
			this.setState({
				countries: this.state.original
			});
		}
	}*/

	// RENDER
	render() {
		console.log(this.state.countries);
		if (!this.state.countries) return null;

		var countries = {};
		this.state.countries.forEach(country => {
			if (!(country.continent in countries)) {
				countries[country.continent] = [];
			}

			countries[country.continent].push(country);
		});

		return (
			<div className="row">
				<div className="col-md-4" />
				<div className="col-md-4">
					{Object.keys(countries).map(area => (
						<div className="list-group" key={area}>
							<a className="list-group-item disabled">{area}</a>

							{countries[area].map(c => (
								<Link
									key={c._id}
									to={"/country/" + c._id}
									className="list-group-item"
								>
									{c.flag ? (
										<img
											className="flag-icon"
											src={
												"data:" +
												c._attachments[c.flag]
													.content_type +
												";base64," +
												c._attachments[c.flag].data
											}
											width="30"
											height="20"
										/>
									) : (
										<img
											src="img/spacer.png"
											width="30"
											height="20"
										/>
									)}
									<span className="country-list-span">
										{c.name}
									</span>
								</Link>
							))}
						</div>
					))}
				</div>
				<div className="col-md-4" />
			</div>
		);
	}
}

export default Countries;
