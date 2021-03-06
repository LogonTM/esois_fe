import React, { Component } from 'react';
import JQueryFade from "./jqueryfade.jsx";
import PropTypes from "prop-types";
import {TransitionGroup} from "react-transition-group";

class ErrorPane extends Component{
	static propTypes = {
		errorMessages: PropTypes.array.isRequired,
	}
	
	renderErrorMessage(errorMessage, index) {
		return errorMessage ? 
			<JQueryFade key={index}>
				<div key={index} className="errorMessage" data-testid="errormessage">{errorMessage}</div>
			</JQueryFade> :
			false;
	}

	renderErrorTransition = () => {
		return (
			<div className="row errorRow" data-testid="errorrow">
				<TransitionGroup component="div">
					{this.props.errorMessages.map(this.renderErrorMessage)}
				</TransitionGroup>
			</div>
		)
	}

	render() {
		return (
			<div className="container errorDiv" data-testid="errorpane">
				{this.props.errorMessages.length > 0 ? this.renderErrorTransition() : null}
			</div>
		)
	}
}

export default ErrorPane;
