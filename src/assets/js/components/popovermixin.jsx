"use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import classNames from "classnames";
// import PropTypes from "prop-types";
import $ from 'jquery';

// var PT = PropTypes;

// var PopoverMixin = {
class PopoverMixin extends Component {
	getDefaultProps/*: function*/(){
		return {hasPopover: true};
	}//,
 
	componentDidMount/*: function*/() {
		this.refresh();
	}//,
	componentDidUpdate/*: function*/() {
		this.refresh();
	}//,

	refresh/*: function*/ = () => {
		$(ReactDOM.findDOMNode(this)).popover('destroy');

		var content;
		if (Array.isArray(this.props.children))
			content = this.props.children.map(React.renderToString).join("");
		else 
			content = React.renderToString(this.props.children);
		// console.log("children: ", this.props.children);
		// console.log("content: ", content);
		$(ReactDOM.findDOMNode(this)).popover({
			content: content,
			animation: this.props.animation,
			placement: this.props.placement,
			title: this.props.title,
			trigger: 'focus',
			html: true,
		});
	}//,

	componentWillUnmount/*: function*/() {
		$(ReactDOM.findDOMNode(this)).popover('destroy');
	}//,	
};

// module.exports = PopoverMixin;
export default PopoverMixin;
