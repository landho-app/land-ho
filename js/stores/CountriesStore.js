import alt from "../alt";
import CountriesActions from "../actions/CountriesActions";

class CountriesStore {
	constructor() {
		this.bindActions(CountriesActions);
		this.countries = [];
	}

	getCountriesSuccess(result) {
		this.countries = result.rows.map(r => {
			return r.doc;
		});
	}

	getCountriesFail(err) {
		throw err;

		//dialog.showErrorBox("Could not load logs!", "Please try again.");
	}
}

export default alt.createStore(CountriesStore);
