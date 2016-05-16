import React from "react";
import {Link} from "react-router";

class City extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"content": null
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {

		var slug = this.props.params.slug;
		var cityslug = this.props.params.cityslug;

		this.loadData(slug, cityslug);
	}

	// SLUGIFY
	slugify(text)
	{
		return text.toLowerCase()
		  .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
		  .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
		  .replace(/^-+|-+$/g, ''); // remove leading, trailing -
	}

	// LOAD DATA
	loadData(slug, cityslug) {
		var that = this;

		$.get("data/" + slug + "/city/" + cityslug + ".html", function(content) {

			// fix image paths
			content = content.replace("src=\"/images", "src=\"data/" + slug + "/images");

			// attach external link icon to external links
			var $c = $(content);
			$c.find("a").each(function(i, el) {

				var href = $(this).attr("href");

				console.log(href );

				// mailto
				if(href.indexOf("mailto:") !== -1) {
					$(this).html("<i class='fa fa-envelope'></i> " + $(this).html());
				}

				// external link
				else if(href.indexOf("noonsite.com") === -1 && href.indexOf("http") === 0) {
					$(this).html("<i class='fa fa-external-link'></i> " + $(this).html());
					$(this).attr("target", "_blank");
				}

				// internal links
				else if(href.indexOf("noonsite.com/Countries") !== -1 || href.indexOf("/Countries") === 0) {

					var tmp = href.replace("http://www.noonsite.com", "").replace("/Countries", "#/country");
					var tmp_splitted = tmp.split("/");

					var visited_country = false;
					for(var j in tmp_splitted) {

						if(visited_country === true) {
							tmp_splitted[j] = that.slugify(tmp_splitted[j]);
						}

						if(tmp_splitted[j] === "country") {
							visited_country = true;
						}
					}

					var new_href = tmp_splitted.join("/");

					// is it a city
					if(new_href.indexOf("/country/" + slug + "/") !== -1) {
						new_href = "#/city/" + tmp_splitted[tmp_splitted.length - 1];
					}

					$(this).attr("href", new_href);
				}

				// a relative link but not /Countries
				else {

					if(href[0] !== "/") {
						href = "/" + href;
					}

					$(this).attr("href", "http://www.noonsite.com" + href);
					$(this).html("<i class='fa fa-external-link'></i> " + $(this).html());
					$(this).attr("target", "_blank");
				}
			});

			this.setState({
				"content": $c.html()
			});

		}.bind(this));
	}

	// RENDER
	render() {

		return (
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-9" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
			</div>
		);
	}
}

export default City;
