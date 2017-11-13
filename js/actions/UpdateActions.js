import alt from "../alt";

class UpdateActions {
	constructor() {
		this.generateActions("setUpdating", "setFinished");
	}

	setUpdating() {
		this.actions.setUpdating();
	}

	setFinished() {
		this.actions.setFinished();
	}
}

export default alt.createActions(UpdateActions);
