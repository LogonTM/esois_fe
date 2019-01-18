import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ADVTokens from '../components/advtokens';

var PT = PropTypes;

class QueryInput extends Component {
    static propTypes = {
		searchedLanguage: PT.array,
		queryTypeId: PT.string.isRequired,
		query: PT.string,
		placeholder: PT.string,
		onKeyDown: PT.func.isRequired,
		handleKeyTextarea: PT.func.isRequired,
		languageFromMain: PT.string.isRequired,
		onQueryChange: PT.func.isRequired,
		fcsTextAreaVisibility: PT.bool.isRequired,
		layerMap: PT.object.isRequired
	}

	render() {
		if (this.props.queryTypeId === "cql") {
			return (
				<input
					className="form-control input-lg search" 
					id="query-cql"
					name="query-cql"
					type="text"
					value={this.props.query}
					placeholder={this.props.placeholder}
					tabIndex="1"
					onChange={evt => this.props.onQueryChange(evt.target.value)}
					onKeyDown={this.props.onKeyDown}
					ref="cqlOrEmbeddedQuery"
				/>
			);
		} else if (this.props.queryTypeId === "fcs" && this.props.fcsTextAreaVisibility) {
			return (
				<textarea
					className="form-control input-lg search"
					id="query-fcs"
					name="query-fcs"
					type="text"
					rows="1"
					value={this.props.query}
					placeholder={this.props.placeholder}
					tabIndex="1"
					onChange={evt => this.props.onQueryChange(evt.target.value)} 
					onKeyDown={this.props.handleKeyTextarea} 
					ref="fcsOrEmbeddedQuery"
				/>
			);
		}
		return (
			<div>
				<div id="adv_query_input_group" className="container-fluid">
					<ADVTokens
						query={this.props.query}
						ref="fcsGQB"
						onQueryChange={this.props.onQueryChange}
						languageFromMain={this.props.languageFromMain}
						layerMap={this.props.layerMap}
					/>
				</div>
			</div>
		);
	}
}

export default QueryInput;
