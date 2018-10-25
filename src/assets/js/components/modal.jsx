// "use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames";
import PropTypes from "prop-types";
//import createReactClass from "create-react-class";
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
// import 'bootstrap';

// var PT = PropTypes;
// var Modal = createReactClass({
//fixme! - class Modal extends React.Component {
class Modal extends Component {
	static propTypes = {
		title: PropTypes.object.isRequired,
	}//,
	componentDidMount/*: function*/() {
		$(ReactDOM.findDOMNode(this)).modal({background: true, keyboard: true, show: false});
	}//,
	componentWillUnmount/*: function*/() {
		$(ReactDOM.findDOMNode(this)).off('hidden');
	}//,
	handleClick/*: function*/(e) {
		e.stopPropagation();
	}//,
	render/*: function*/() {
		return (
			<div onClick={this.handleClick} className="modal fade in" id="modal-display" role="dialog" aria-hidden="true" keyboard="true" tabIndex="-1">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title">{this.props.title}</h2>
							<button type="button" className="close" data-dismiss="modal">
								<span aria-hidden="true">&times;</span>
								<span className="sr-only">
									<FormattedMessage
										id='close.button'
										description='close button translation'
										defaultMessage='Close'
									/>
								</span>
							</button>
						</div>
						<div className="modal-body">
							{this.props.children}
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
								<FormattedMessage
									id='close.button'
									description='close button translation'
									defaultMessage='Close'
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}//);

// module.exports = Modal;
export default Modal;
