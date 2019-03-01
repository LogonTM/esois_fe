import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pairs } from '../utilities/functions'

var PT = PropTypes;

class LanguageSelector extends Component {
	static propTypes = {
		anyLanguage: PT.array.isRequired,
		currentLanguagesMap: PT.object.isRequired,
		selectedLanguage: PT.array.isRequired,
		languageChangeHandler: PT.func.isRequired,
		languageFromMain: PT.string.isRequired,
		corpora: PT.object.isRequired,
		updateCurrentLanguagesMap: PT.func.isRequired
	}

	componentDidUpdate(prevProps) {
		if (this.props.languageFromMain !== prevProps.languageFromMain) {
			this.props.updateCurrentLanguagesMap(this.props.corpora)
		}
	}

	selectLang = language => {
		this.props.languageChangeHandler(language);
	}
	
	renderLanguageObject = lang => {
		var desc = lang[1] + " [" + lang[0] + "]";
		var style = {
			whiteSpace: "nowrap",
			fontWeight: lang[0] === this.props.selectedLanguage[0] ? "bold" : "normal",
		};
		return (
			<div key={lang[0]}>
				<button
					type="button"
					className="no-border-button"
					style={style}
					onClick={this.selectLang.bind(this, lang)}
					data-testid="onelanguage"
				>
					{desc}
				</button>
			</div>
		);
	}

	render() {
		var languages = pairs(this.props.currentLanguagesMap)
						 .sort(function(l1, l2){return l1[1].localeCompare(l2[1]); });
		languages.unshift(this.props.anyLanguage);
		languages = languages.map(this.renderLanguageObject);
		var third = Math.round(languages.length/3);
		var l1 = languages.slice(0, third);
		var l2 = languages.slice(third, 2*third);
		var l3 = languages.slice(2*third, languages.length);

		return (
			<div>
				<div className="row" data-testid="languages">
					<div className="col-sm-4">{l1}</div>
					<div className="col-sm-4">{l2}</div>
					<div className="col-sm-4">{l3}</div>
				</div>
			</div>
		);
	}
}

export default LanguageSelector;
