import alt from "../alt";

class CountryActions {
	constructor() {
		this.generateActions("getSectionSuccess", "getSectionFail");
	}

	// GET SECTION
	getSection(section, id) {
		window.db[section]
			.get(id, {
				attachments: true
			})
			.then(this.actions.getSectionSuccess)
			.catch(this.actions.getSectionFail);
	}
}

export default alt.createActions(CountryActions);
