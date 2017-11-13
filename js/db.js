import PouchDB from "pouchdb";
import config from "./_config";

if (!window.db) window.db = {};

["countries", "profiles", "generalinfos", "formalities", "cities"].forEach(
	database => {
		window.db[database] = new PouchDB(database);

		// enable replication
		window.db[database]
			.sync(new PouchDB(config.pouchDBUrl + "/" + database), {
				live: true,
				retry: true
			})
			.on("change", () => {
				console.info("DB changed");
			})
			.on("paused", info => {
				console.info("DB sync paused");
			})
			.on("active", info => {
				console.info("DB sync resumed");
			})
			.on("complete", info => {
				console.info("DB sync completed");
			})
			.on("error", err => {
				console.error(err);
			});
	}
);
