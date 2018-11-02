import React, { Component } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

class SearchCorpusBox extends Component {
	static propTypes = {
		search: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			query: ""
		};
	}

	handleChange = event => {
		var query = event.target.value;
		this.setState({query: query});

		if (query.length === 0 || 2 <= query.length) {
			this.props.search(query);
		}
		event.stopPropagation();
	}

	handleKey = event => {
		if (event.keyCode === 13) {
			this.props.search(event.target.value);
		}
	}

	render() {
		return (
			<div className="form-group">
				<FormattedMessage
					id='corpus.search.corpusbox'
					description='placeholder for search for collections translation'
					defaultMessage='Search for collection'
				>
					{text => (
						<input
							className="form-control search search-collection"
							type="text" 
							value={this.state.query}
							placeholder={text}
							onChange={this.handleChange.bind(this)}
						/>
					)}
				</FormattedMessage>
			</div>
		);
	}
}

export default SearchCorpusBox;
