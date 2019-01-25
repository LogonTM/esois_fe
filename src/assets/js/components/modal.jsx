import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import $ from 'jquery';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

class Modal extends Component {
	static propTypes = {
		title: PropTypes.object.isRequired,
		isOpen: PropTypes.bool,
		languageFromMain: PropTypes.string.isRequired
	}
	
	static defaultProps = {
		isOpen: false
	}

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).modal({background: true, keyboard: true, show: false});
	}
	
 	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			this.toggleModal(this.props.isOpen);
		}
	}

	componentWillUnmount() {
		$(ReactDOM.findDOMNode(this)).off('hidden');
	}
	
 	toggleModal = isOpen => {
		$(ReactDOM.this.node).modal({
			background: true,
			keyboard: true,
			show: isOpen
		});
	}; 
	
	handleClick(e) {
		e.stopPropagation();
	}
	
	render() {
		return (
			<div onClick={this.handleClick}
				className="modal fade in"
				id="modal-display"
				role="dialog"
				aria-hidden="true"
				keyboard="true"
				tabIndex="-1"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title">{this.props.title}</h2>
							<button type="button" className="close" data-dismiss="modal">
								<span aria-hidden="true">&times;</span>
								<span className="sr-only">
									{dictionary[this.props.languageFromMain].button.close}
								</span>
							</button>
						</div>
						<div className="modal-body">
							{this.props.children}
						</div>
						<div className="modal-footer">
							<Button
								label={dictionary[this.props.languageFromMain].button.close}
								data-dismiss="modal"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
