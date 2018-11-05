import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

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
							defaultMessage='When the search starts, the page will start filling in with the corpora responses.'
						/>
					</p>

					<p>
						<FormattedMessage
							id='helpPage.howToSearch.paragraph4'
							description='view the search results translation'
							defaultMessage="If you are particularly interested in the results returned by a corpus, you have the option to focus only on the results of that corpus, by clicking on the 'View' button."
						/>
					</p>
					<div className='bottom-gap'></div>
				</div>
			</div>
		);
	}
}

export default HelpPage;
