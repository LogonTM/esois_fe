import dictionary from '../../../translations/dictionary';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class HelpPage extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired
	}

	render() {
		return (
			<div>
				<div className="top-gap">
					<h1>
						{dictionary[this.props.languageFromMain].helppage.mainTitle}
					</h1>
					<h3>
						{dictionary[this.props.languageFromMain].helppage.howToSearchTitle}
					</h3>
					<p>
						{dictionary[this.props.languageFromMain].helppage.howToSearchParagraph1}
					</p>

					<p>
						{dictionary[this.props.languageFromMain].helppage.howToSearchParagraph2}
					</p>

					<p>
						{dictionary[this.props.languageFromMain].helppage.howToSearchParagraph3}
					</p>

					<p>
						{dictionary[this.props.languageFromMain].helppage.howToSearchParagraph4}
					</p>
					<div className='bottom-gap'></div>
				</div>
			</div>
		);
	}
}

export default HelpPage;