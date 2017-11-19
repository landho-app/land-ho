import alt from "../alt";
import UpdateActions from "../actions/UpdateActions";

class UpdateStore {
	constructor() {
		this.bindActions(UpdateActions);
		this.updating = {};
		this.syncedDocs = {};
		this.maxDocs = {};
		this.progressPercentile = 0;
	}

	setUpdating(data) {
		this.updating[data.database] = data.value;
	}

	setMaximumDocumentCount(data) {
		this.maxDocs[data.database] = data.value;
	}

	addSyncedIDs(data) {
		this.updating[data.database] = data.value;

		// init synced docs store
		if (!(data.database in this.syncedDocs)) {
			this.syncedDocs[data.database] = [];
		}

		// add the ids that have not yet been added to the temp store
		data.ids.forEach(id => {
			if (this.syncedDocs[data.database].indexOf(id) < 0) {
				this.syncedDocs[data.database].push(id);
			}
		});

		// calculate the progress percentile
		this.progressPercentile = parseInt(
			Object.values(this.syncedDocs).reduce((sum, value) => {
				return sum + value.length;
			}, 0) /
				Object.values(this.maxDocs).reduce((sum, value) => {
					return sum + value;
				}, 0) *
				100
		);
	}
}

export default alt.createStore(UpdateStore);
