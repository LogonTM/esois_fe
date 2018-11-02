
import React, { Component } from 'react';
import PropTypes from "prop-types";

class InfoPopover extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}
	mixins: [PopoverMixin];

	handleClick(e) {
		e.stopPropagation();
	}

	render() {
		var inline = {display:"inline-block"};
		return (
			<button style={inline} className="btn btn-default btn-xs" onClick={this.handleClick}>
				<span className="fa fa-info-circle"/>
			</button>
		);
	}
}

export default InfoPopover;