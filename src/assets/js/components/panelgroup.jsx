import React, { Component } from 'react';

class PanelGroup extends Component {
	render() {
		return	(<div className="panel-group"> {this.props.children} </div>);
		}
}

export default PanelGroup;

