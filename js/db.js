import PouchDB from "pouchdb";
import config from "./_config";
import UpdateActions from "./actions/UpdateActions";

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
			.on("paused", info => {
				console.info("DB sync paused");
				UpdateActions.setFinished();
			})
			.on("active", info => {
				console.info("DB sync resumed", info);
				UpdateActions.setUpdating();
			})
			.on("complete", info => {
				console.info("DB sync completed", info);
				UpdateActions.setFinished();
			})
			.on("error", err => {
				console.error(err);
				UpdateActions.setFinished();
			});
	}
);
