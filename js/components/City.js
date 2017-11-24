import React from "react";
import { Link } from "react-router";
import CityActions from "../actions/CityActions";
import CityStore from "../stores/CityStore";
import moment from "moment";

class City extends React.Component {
	constructor(props) {
		super(props);

		this.state = CityStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		var slug = this.props.params.slug;
		var cityslug = this.props.params.cityslug;

		CityStore.listen(this.onChange);
		CityActions.getCity(slug + "-" + cityslug);
	}

	componentWillUnmount() {
		CityStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		if (this.state.content === -1) {
			return (
				<div className="row">
					<div className="col-md-12">
						<center>
							<p>
								<i
									className="fa fa-globe fa-5x"
									aria-hidden="true"
								/>
							</p>
							<h3>Sorry sailor!</h3>
							<p>
								The page you were looking for is not yet
								available offline.
							</p>
							<p>Watch out for the next update of the app!</p>
						</center>
					</div>
				</div>
			);
		} else {
			return (
				<div className="row">
					<div className="col-md-3">
						<center>
							<p
								className="text-muted"
								style={{ marginTop: "15px" }}>
								<small>
									Last updated:{" "}
									{moment(
										this.state.updated / 1000
									).fromNow()}
								</small>
							</p>
						</center>
					</div>
					<div
						className="col-md-9"
						dangerouslySetInnerHTML={{ __html: this.state.content }}
					/>
				</div>
			);
		}
	}
}

export default City;
