import alt from "../alt";
import config from "./_config";
import PouchDB from "pouchdb";

class CountriesActions {
	constructor() {
		this.generateActions("getCountriesSuccess", "getCountriesFail");

		if (!window.db) window.db = {};
		window.db["countries"] = new PouchDB("countries");

		// enable replication
		window.db["countries"]
			.sync(new PouchDB(config.pouchDBUrl + "/countries"), {
				live: true,
				retry: true
			})
			.on("change", () => {
				console.info("/countries DB changed");
			})
			.on("paused", function(info) {
				console.info("/countries DB sync paused");
			})
			.on("active", function(info) {
				console.info("/countries DB sync resumed");
			})
			.on("complete", function(info) {
				console.info("/profiles DB sync completed");
			})
			.on("error", err => {
				console.error(err);
			});
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
