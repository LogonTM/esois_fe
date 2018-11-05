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

	toggleState = (e) => {
		this.setState({open: !this.state.open});
	}

	render() {
		var chevron = "fa fa-chevron-" + (this.state.open ? "down":"right");
		return (
			<div className="bs-callout bs-callout-info"> 
				<div className="panel">
					<div className="panel-heading unselectable row" onClick={this.toggleState}>
						<div className="panel-title unselectable col-sm-11">
							<span className={chevron} style={{fontSize:12}} />&nbsp;
							{this.props.title}
						</div>
						<div className='float-right'>
							{this.props.info}
						</div>
					</div>
					{ this.state.open ? 
						<div className="panel-body">{this.props.children}</div> : 
						false}
				</div>
			</div>
		);
	}
}

export default Panel;
