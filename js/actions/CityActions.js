import alt from "../alt";

class CityActions {
	constructor() {
		this.generateActions("getCitySuccess", "getCityFail");
	}

	// GET CITY
	getCity(id) {
		window.db["cities"]
			.get(id, {
				attachments: true
			})
			.then(this.actions.getCitySuccess)
			.catch(this.actions.getCityFail);
	}
}

export default alt.createActions(CityActions);
