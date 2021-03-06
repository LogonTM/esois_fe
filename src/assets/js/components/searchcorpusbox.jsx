import React, { Component } from 'react';
import PropTypes from "prop-types";

class SearchCorpusBox extends Component {
	static propTypes = {
		search: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			query: ""
		};
	}

	handleChange = event => {
		var query = event.target.value;
		this.setState({query});

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
				<input
					className="form-control search search-collection"
					type="text" 
					value={this.state.query}
					placeholder={this.props.placeholder}
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		);
	}
}

export default SearchCorpusBox;
