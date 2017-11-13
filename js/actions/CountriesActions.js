import alt from "../alt";

class CountriesActions {
	constructor() {
		this.generateActions("getCountriesSuccess", "getCountriesFail");
	}

	// GET COUNTRIES
	getCountries() {
		window.db["countries"]
			.allDocs({
				include_docs: true,
				attachments: true
			})
			.then(this.actions.getCountriesSuccess)
			.catch(this.actions.getCountriesFail);
	}
}

export default alt.createActions(CountriesActions);
