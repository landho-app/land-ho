import alt from "../alt";
import CountryActions from "../actions/CountryActions";

const prepareContent = result => {
	var content = result.section;

	// fix image paths
	result._attachments.forEach(att => {
		content = content.replace(
			'src="/images',
			'src="data/' + slug + "/images"
		);
	});

	return content;
};

class CountryStore {
	constructor() {
		this.bindActions(CountryActions);
		this.content = null;
		this.updated = null;
	}

	getProfileSuccess(result) {
		this.content = prepareContent(result);
		this.updated = result.updated;
	}

	getProfileFail(err) {
		throw err;

		//dialog.showErrorBox("Could not load logs!", "Please try again.");
	}
}

export default alt.createStore(CountryStore);
