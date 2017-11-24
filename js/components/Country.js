import React from "react";
import { Link } from "react-router";
import CountryActions from "../actions/CountryActions";
import CountryStore from "../stores/CountryStore";
import moment from "moment";

class Country extends React.Component {
	constructor(props) {
		super(props);
		this.state = CountryStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		var part = this.props.params.part || "profiles";
		var slug = this.props.params.slug;

		CountryStore.listen(this.onChange);
		CountryActions.getSection(part, slug);
	}

	componentWillUnmount() {
		CountryStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	componentWillReceiveProps(nextProps) {
		var part = nextProps.params.part || "profiles";
		var slug = nextProps.params.slug;

		CountryActions.getSection(part, slug);
	}

	render() {
		var profilesClassName = "list-group-item";
		if (this.props.params.part === "profiles")
			profilesClassName += " hovered";

		var formalitiesClassName = "list-group-item";
		if (this.props.params.part === "formalities")
			formalitiesClassName += " hovered";

		var generalinfosClassName = "list-group-item";
		if (this.props.params.part === "generalinfos")
			generalinfosClassName += " hovered";

		console.log(moment.unix(this.state.updated).toISOString());

		return (
			<div className="row">
				<div className="col-md-3">
					<div className="list-group">
						<Link
							to={
								"/country/" +
								this.props.params.slug +
								"/profiles"
							}
							className={profilesClassName}>
							<i
								className="fa fa-user fa-fw"
								aria-hidden="true"
							/>{" "}
							Profile
						</Link>
						<Link
							to={
								"/country/" +
								this.props.params.slug +
								"/generalinfos"
							}
							className={generalinfosClassName}>
							<i
								className="fa fa-globe fa-fw"
								aria-hidden="true"
							/>{" "}
							General Info
						</Link>
						<Link
							to={
								"/country/" +
								this.props.params.slug +
								"/formalities"
							}
							className={formalitiesClassName}>
							<i
								className="fa fa-book fa-fw"
								aria-hidden="true"
							/>{" "}
							Formalities
						</Link>
					</div>
					<center>
						<p className="text-muted">
							<small>
								Last updated:{" "}
								{moment
									.unix(this.state.updated)
									.local()
									.fromNow()}
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

export default Country;
