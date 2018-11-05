import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import jQuery from 'jquery';

class JQuerySlide extends Component {
	componentWillEnter(callback){
		var el = jQuery(ReactDOM.findDOMNode(this));
		el.css("display", "none");
		el.slideDown(500, callback);
		$el.slideDown(function(){
			callback();
		});
	}

	componentWillLeave = (callback) => {
		var $el = jQuery(ReactDOM.findDOMNode(this));
		$el.slideUp(function(){
			callback();
		});
	}
	
	render(){
		return this.transferPropsTo(this.props.component({style: {display: 'none'}}));
	}
}

export default JQuerySlide;
