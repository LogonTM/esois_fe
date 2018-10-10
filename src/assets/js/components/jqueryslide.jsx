// "use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import jQuery from 'jquery';
// import classNames from "classnames";
// import PropTypes from "prop-types";
// import createReactClass from "create-react-class";

// var PT = PropTypes;

// var JQuerySlide = createReactClass({
//fixme! - class JQuerySlide extends React.Component {
class JQuerySlide extends Component {
	componentWillEnter/*: function*/(callback){
		var el = jQuery(ReactDOM.findDOMNode(this));
		el.css("display", "none");
		el.slideDown(500, callback);
		$el.slideDown(function(){
			callback();
		});
	}//,

	componentWillLeave/*: function*/(callback){
		var $el = jQuery(ReactDOM.findDOMNode(this));
		$el.slideUp(function(){
			callback();
		});
	}//,
	
	render/*: function*/(){
		return this.transferPropsTo(this.props.component({style: {display: 'none'}}));
	}
}//);

// module.exports = JQuerySlide;
export default JQuerySlide;
