import React from "react";

class Info extends React.Component {

	// RENDER
	render() {
		return (
			<div className="row">
				<div className="col-md-12">
					<center>
						<p>&nbsp;</p>
						<img src="img/icon.png" width="128" />
						<p>&nbsp;</p>
						<p>
							The <i>Land Ho!</i> app is in no way related or associated with the content producers of the displayed information in this app.
						</p>
						<p>
							All rights to the content and all information belong to noonsite.com by World Cruising Club Ltd.
						</p>
						<p>
							noonsite.com by World Cruising Club Ltd is licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License. Based on a work at http://www.noonsite.com
						</p>
						<p>&nbsp;</p>
						<img src="img/cc.png" />
					</center>
				</div>
			</div>
		);
	}
}

export default Info;
