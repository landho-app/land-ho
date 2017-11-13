import alt from "../alt";
import UpdateActions from "../actions/UpdateActions";

class UpdateStore {
	constructor() {
		this.bindActions(UpdateActions);
		this.updating = 0;
	}

	setUpdating() {
		this.updating++;
		this.updating = Math.max(this.updating, Object.keys(window.db).length);
	}

	setFinished() {
		this.updating--;
		this.updating = Math.max(this.updating, 0);
	}
}

export default alt.createStore(UpdateStore);
