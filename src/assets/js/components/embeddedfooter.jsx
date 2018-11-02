"use strict";
import React, { Component } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

class EmbeddedFooter extends Component { 
    static propTypes = {
	URLROOT: PropTypes.string.isRequired,
	}

	render() {
		return (
			<div className="container" style={{textAlign:'center'}}>
				<div className="row">
					<div style={{position:'relative', float:'right'}}>
						<div className="rightist" style={{position:'absolute', right:0, width:150}}>
							<a href={this.props.URLROOT} target="_blank" tabIndex="-1">
								<img width="28px" height="28px" src="img/magglass1.png"/>
								<header className="inline float-left"> 
									<FormattedMessage
										id='federated.content.search'
										description='federated content search translation'
										defaultMessage='Federated Content Search'
									/>
								</header>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmbeddedFooter;