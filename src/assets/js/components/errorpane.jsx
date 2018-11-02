import React, { Component } from 'react';
import classNames from "classnames";
import JQueryFade from "./jqueryfade.jsx";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";

class ErrorPane extends Component{
	static propTypes = {
		errorMessages: PropTypes.array.isRequired,
	}
	
	renderErrorMessage(errorMessage, index) {
		return errorMessage ? 
			<JQueryFade key={index}>
				<div key={index} className="errorMessage">{errorMessage}</div>
			</JQueryFade> :
			false;
	}

	render() {
		return	(
			<div className="container errorDiv">
				<div className="row errorRow">
					<TransitionGroup component="div">
						{this.props.errorMessages.map(this.renderErrorMessage)}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default ErrorPane;
