import React from "react";
import {Link} from "react-router";

class Country extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"content": null
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {

		var part = this.props.params.part || "profile";
		var slug = this.props.params.slug;

		this.loadData(slug, part);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {

		var part = nextProps.params.part || "profile";
		var slug = nextProps.params.slug;

		this.loadData(slug, part);
	}

	// SLUGIFY
	slugify(text)
	{
		return text.toString().toLowerCase()
		    .replace(/\s+/g, '-')           // Replace spaces with -
		    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
		    .replace(/^-+/, '')             // Trim - from start of text
		    .replace(/-+$/, '');            // Trim - from end of text
	}

	// LOAD DATA
	loadData(slug, part) {
		var that = this;

		$.get("data/" + slug + "/" + part + ".html", function(content) {

			// fix image paths
			content = content.replace("src=\"/images", "src=\"/data/" + slug + "/images");

			// attach external link icon to external links
			var $c = $(content);
			$c.find("a").each(function(i, el) {

				var href = $(this).attr("href");
				console.log(href);

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
				else if((href.indexOf("noonsite.com/Countries") !== -1 || href.indexOf("/Countries") === 0) &&
						(href.replace("http://", "").match(/\//g) || []).length === 3)
				{

					var tmp = href.replace("http://www.noonsite.com", "").replace("/Countries", "#/country");
					var tmp_splitted = tmp.split("/");

					// is it a city
					var new_href = "#/country/" + slug + "/city/" + that.slugify($(this).text().replace("*", ""));
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
				<div className="col-md-3">
					<div className="list-group">
						<Link to={"/country/" + this.props.params.slug + "/profile"} className="list-group-item">
							<i className="fa fa-user fa-fw" aria-hidden="true"></i> Profile
						</Link>
						<Link to={"/country/" + this.props.params.slug + "/general"} className="list-group-item">
							<i className="fa fa-globe fa-fw" aria-hidden="true"></i> General Info
						</Link>
						<Link to={"/country/" + this.props.params.slug + "/formalities"} className="list-group-item">
							<i className="fa fa-book fa-fw" aria-hidden="true"></i> Formalities
						</Link>
					</div>
				</div>
				<div className="col-md-9" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
			</div>
		);
	}
}

export default Country;
