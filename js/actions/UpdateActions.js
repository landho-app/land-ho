import alt from "../alt";
import config from "../_config";
import PouchDB from "pouchdb";

// database
window.dbNames = [
	"countries",
	"profiles",
	"generalinfos",
	"formalities",
	"cities"
];
window.db = {};

// init dbs
window.dbNames.forEach(database => {
	// init database and database sync values
	window.db[database] = new PouchDB(database);
});

class UpdateActions {
	constructor() {
		this.generateActions(
			"setUpdating",
			"setMaximumDocumentCount",
			"addSyncedIDs"
		);
	}

	startSync() {
		window.dbNames.forEach(database => {
			// sync database
			window.db[database]
				.sync(new PouchDB(config.pouchDBUrl + "/" + database), {
					live: true,
					retry: true
				})
				.on("change", info => {
					// keep track of synced ids
					this.actions.addSyncedIDs({
						database: database,
						ids: info.change.docs.map(d => {
							return d._id;
						})
					});
				})
				.on("paused", info => {
					this.actions.setUpdating({
						database: database,
						value: false
					});
				})
				.on("active", info => {
					this.actions.setUpdating({
						database: database,
						value: true
					});
				})
				.on("error", err => {
					console.error(err);
					this.actions.setUpdating({
						database: database,
						value: false
					});
				});
		});
	}

	getInfo(docs) {
		window.dbNames.forEach(database => {
			const pouch = new PouchDB(config.pouchDBUrl + "/" + database);

			// get info
			pouch.info().then(result => {
				this.actions.setMaximumDocumentCount({
					database: database,
					value: result.doc_count
				});
			});
		});
	}
}

export default alt.createActions(UpdateActions);
