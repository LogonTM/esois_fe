import { Component } from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

class JQueryFade extends Component {
	componentWillEnter(callback){
		var el = jQuery(ReactDOM.findDOMNode(this));
		el.css("display", "none");
		
		//el.fadeIn(500, callback);
	}

	componentWillLeave = (callback) => {
	    jQuery(ReactDOM.findDOMNode(this)).children.fadeOut(500, callback);
	}

	render() {
	    return this.props.children

	}
}

export default JQueryFade;
