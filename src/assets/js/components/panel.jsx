import React, { Component } from 'react';
import PropTypes from "prop-types";

var PT = PropTypes;

class Panel extends Component {
	static propTypes = {
		title: PT.object.isRequired,
		info: PT.object.isRequired,
	}
	
	constructor(props){
		super(props);
		this.state = {
			open: true,
		};
	}

	toggleState = () => {
		this.setState(oldState => ({open: !oldState.open}));
	}

	render() {
		var chevron = "fa fa-chevron-" + (this.state.open ? "down":"right");
		return (
			<div className="bs-callout bs-callout-info"> 
				<div className="card">
					<div className="card-heading unselectable row" onClick={this.toggleState}>
						<div className="card-title unselectable col-sm-11">
							<span className={chevron} style={{fontSize:12}} />&nbsp;
							{this.props.title}
						</div>
						<div className='float-right'>
							{this.props.info}
						</div>
					</div>
					{ this.state.open ? 
						<div className="card-body">{this.props.children}</div> : 
						false}
				</div>
			</div>
		);
	}
}

export default Panel;
