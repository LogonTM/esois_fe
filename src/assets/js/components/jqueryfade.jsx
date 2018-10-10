// "use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import classNames from "classnames";
import PropTypes from "prop-types";
// import createReactClass from "create-react-class";
import jQuery from 'jquery';

var PT = PropTypes;

// var JQueryFade = createReactClass({
//fixme! - class JQueryFade extends React.Component {
class JQueryFade extends Component {
	componentWillEnter/*: function*/(callback){
		var el = jQuery(ReactDOM.findDOMNode(this));
		el.css("display", "none");
		el.fadeIn(500, callback);
	}//,

	componentWillLeave/*: function*/(callback){
		jQuery(ReactDOM.findDOMNode(this)).fadeOut(500, callback);
	}//,

	render/*: function*/() {
		return this.props.children;
	}
}//);

// module.exports = JQueryFade;
export default JQueryFade;
