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

	// RENDER
	render() {
		if (!this.state.countries) return null;

		var orignalCountries = this.state.countries;

		// query param exists
		if (this.props.params.query) {
			orignalCountries = this.state.countries.filter(country => {
				return (
					country.name
						.toLowerCase()
						.indexOf(this.props.params.query.toLowerCase()) >= 0
				);
			});
		}

		var countries = {};
		orignalCountries.forEach(country => {
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
									className="list-group-item">
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
