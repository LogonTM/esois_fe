"use strict";
import React, { Component } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

var PT = PropTypes;

class HelpPage extends Component {

	render() {
		return	(
			<div>
				<div className="top-gap">
					<h1>
						<FormattedMessage
							id='helpPage.mainTitle'
							description='help translation'
							defaultMessage='Help'
						/>
					</h1>
					<h3>
						<FormattedMessage
							id='helpPage.howToSearch'
							description='how to search translation'
							defaultMessage='Performing search in Federated Content Search corpora'
						/>
					</h3>
					<p>
						<FormattedMessage
							id='helpPage.howToSearch.paragraph1'
							description='how to do CQL search translation'
							defaultMessage="To perform a simple keyword search in all corpora, go to the search field at the top of the page,
								enter your query, and click the 'search' button or press the 'Enter' key."
						/>
					</p>

					<p>
						<FormattedMessage
							id='helpPage.howToSearch.paragraph2'
							description='how to do FCS-QL search translation'
							defaultMessage="To perform an advanced search on multiple annotation layers in corpora that support this, switch to Multi-layer Federated Content Search (FCS) in the dropdown list, enter a FCS query in the search field at the top of the page, and click the 'search' button or press the 'Enter' key."
						/>
					</p>

					<p>
						<FormattedMessage
							id='helpPage.howToSearch.paragraph3'
							description='retrieving results translation'
							defaultMessage='When the search starts, the page will start filling in with the corpora responses.
								After the entire search process has ended you have the option to download the results
								in various formats.'
						/>
					</p>

					<p>
						<FormattedMessage
							id='helpPage.howToSearch.paragraph4'
							description='view the search results translation'
							defaultMessage="If you are particularly interested in the results returned by a corpus, you have the option to focus only on the results of that corpus, by clicking on the 'View' button. In this view mode you can also download the results."
						/>
					</p>

					<h3>
						<FormattedMessage
							id='helpPage.adjustSearch'
							description='adjusting search criteria translation'
							defaultMessage='Adjusting search criteria'
						/>
					</h3>
					<p>
						<FormattedMessage
							id='helpPage.adjustSearch.paragraph1'
							description='how to adjust search criteria translation'
							defaultMessage='The FCS Aggregator makes possible to select specific corpora based on their name
								or language and to specify the number of search results (hits) per corpus per page.
								The user interface controls that allows to change these options are located
								right below the search fiels on the main page. The current options are
								to filter resources based on their language, to select specific resources, and
								to set the maximum number of hits.'
						/>
					</p>
					<div className='bottom-gap'></div>
				</div>
			</div>
		);
	}
}

export default HelpPage;
