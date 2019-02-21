import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ANDQueryArgs from '../components/andqueryargs';

class ADVToken extends Component {
	static propTypes = {
		query: PropTypes.string,
		onQueryChange: PropTypes.func.isRequired,
		handleRemoveADVToken: PropTypes.func.isRequired,
		languageFromMain: PropTypes.string.isRequired,
		layerMap: PropTypes.object.isRequired
	}
	
	render() {
		return (
			<div
				className="token query_token inline btn-group"
				style={{display:"inline-block"}}
				data-testid='ADVToken'
			>
				<div className="token_header">
					<span
						className="image_button close_btn"
						type="button"
						onClick={this.props.handleRemoveADVToken}
						ref="removeToken"
						data-testid="removeADVToken"
					>
						<i className="fa fa-times-circle" />
					</span>
					<div style={{clear:"both"}} />
					</div>
					<div className="args">
					{ /* and.query_arg* and token_footer */ }
						<ANDQueryArgs
							onQueryChange={this.props.onQueryChange}
							query={this.props.query}
							languageFromMain={this.props.languageFromMain}
							layerMap={this.props.layerMap}
						/>
					<div className="lower_footer">
					</div>
				</div>
			</div>
		);
	}
}

export default ADVToken;