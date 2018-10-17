// "use strict";
import React, { Component } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
//import createReactClass from "create-react-class";

//var SearchCorpusBox = createReactClass({
//fixme! - class SearchCorpusBox extends React.Component {
class SearchCorpusBox extends Component {
	static propTypes = {
		search: PropTypes.func.isRequired,
	}//,
	constructor(props) {
		super(props);
		this.state = {
			query: ""
		};
	}

	// getInitialState/*: function */() {
	// 	return {
	// 		query: ""
	// 	};
	// }//,c

	handleChange/*: function*/ = event => {
		var query = event.target.value;
		this.setState({query: query});

		if (query.length === 0 || 2 <= query.length) {
			this.props.search(query);
		}
		event.stopPropagation();
	}//,

	handleKey/*: function*/ = event => {
		if (event.keyCode === 13) {
			this.props.search(event.target.value);
		}
	}//,

	render/*: function*/() {
		return (
			<div className="form-group">
				<input
					className="form-control search search-collection"
					type="text" 
					value={this.state.query}
					placeholder={
						<FormattedMessage 
							id='corpus.search.corpusbox'
							description='placeholder for search for collections translation'
							defaultMessage='Search for collection'
						/>
					}
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		);
	}
}//);

// module.exports = SearchCorpusBox;
export default SearchCorpusBox;
