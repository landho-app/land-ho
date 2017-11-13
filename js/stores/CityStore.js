import alt from "../alt";
import CityActions from "../actions/CityActions";

const slugify = text => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w\-]+/g, "") // Remove all non-word chars
		.replace(/\-\-+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
};

const prepareContent = result => {
	var content = result.city;

	// fix image paths
	for (var key in result._attachments) {
		if (result._attachments.hasOwnProperty(key)) {
			const att = result._attachments[key];

			// replace key placeholder with image data
			content = content.replace(
				key,
				"data:" + att.content_type + ";base64," + att.data
			);
		}
	}

	// attach external link icon to external links
	var $c = $(content);
	$c.find("a").each(function(i, el) {
		var href = $(this).attr("href");

		// mailto
		if (href.indexOf("mailto:") !== -1) {
			$(this).html("<i class='fa fa-envelope'></i> " + $(this).html());
		} else if (
			href.indexOf("http") === 0 &&
			href.indexOf("/Countries") === -1
		) {
			// external link
			$(this).html(
				"<i class='fa fa-external-link'></i> " + $(this).html()
			);
			$(this).attr("target", "_blank");
		} else if (
			(href.indexOf("noonsite.com/Countries") !== -1 ||
				href.indexOf("/Countries") >= 0) &&
			(href.replace("http://", "").match(/\//g) || []).length === 3
		) {
			// internal links
			var tmp = href
				.replace("http://www.noonsite.com", "")
				.replace("/Countries", "#/country");
			var tmp_splitted = tmp.split("/");

			// is it a city
			var new_href =
				"#/country/" +
				result._id +
				"/city/" +
				slugify(
					$(this)
						.text()
						.replace("*", "")
				);
			$(this).attr("href", new_href);
		} else {
			// a relative link but not /Countries
			if (href[0] !== "/") {
				href = "/" + href;
			}

			$(this).attr("href", "http://www.noonsite.com" + href);
			$(this).html(
				"<i class='fa fa-external-link'></i> " + $(this).html()
			);
			$(this).attr("target", "_blank");
		}
	});

	return $c.html();
};

class CityStore {
	constructor() {
		this.bindActions(CityActions);
		this.content = null;
		this.updated = null;
	}

	getCitySuccess(result) {
		this.content = prepareContent(result);
		this.updated = result.updated;
	}

	getCityFail(err) {
		throw err;
	}
}

export default alt.createStore(CityStore);
