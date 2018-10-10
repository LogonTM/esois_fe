// "use strict";
import React, { Component } from 'react';
// import classNames from "classnames";
import PopoverMixin from "./popovermixin.jsx";
import PropTypes from "prop-types";
//import createReactClass from "create-react-class";

var PT = PropTypes;

//var Popover = createReactClass({
class Popover extends Component {}
	static propTypes = {
		placement: PT.string,
		title: PT.string,
		triggerButtonClass: PT.string,
		triggerButtonContent: PT.element.isRequired
	}//,
	mixins: [PopoverMixin];//,

	handleClick/*: function*/(e) {
		e.stopPropagation();
	}//;//,

	render/*: function*/() {
		return	<button className={this.props.triggerButtonClass} onClick={this.handleClick.bind(this)}>
					{this.props.triggerButtonContent}
				</button>;
	}
}//);

// module.exports = Popover;
export default Popover;
