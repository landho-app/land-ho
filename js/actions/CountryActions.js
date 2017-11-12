import alt from "../alt";
import config from "./_config";
import PouchDB from "pouchdb";

class CountryActions {
	constructor() {
		this.generateActions("getProfileSuccess", "getProfileFail");

		if (!window.db) window.db = {};
		window.db["profiles"] = new PouchDB("profiles");

		// enable replication
		window.db["profiles"]
			.sync(new PouchDB(config.pouchDBUrl + "/profiles"), {
				live: true,
				retry: true
			})
			.on("change", () => {
				console.info("/profiles DB changed");
			})
			.on("paused", info => {
				console.info("/profiles DB sync paused");
			})
			.on("active", info => {
				console.info("/profiles DB sync resumed");
			})
			.on("complete", info => {
				console.info("/profiles DB sync completed");
			})
			.on("error", err => {
				console.error(err);
			});
	}

	// GET PROFILE
	getProfile(id) {
		window.db["profiles"]
			.get(id)
			.then(this.actions.getProfileSuccess)
			.catch(this.actions.getProfileFail);
	}
}

export default alt.createActions(CountryActions);
