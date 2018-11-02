import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';

class ModalMixin extends Component {
	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).modal({background: true, keyboard: true, show: false});
	}
	componentWillUnmount() {
		$(ReactDOM.findDOMNode(this)).off('hidden');
	}
	handleClick(e) {
		e.stopPropagation();
	}
	renderModal(title, content) {
		return (
			<div onClick={this.handleClick} className="modal fade" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title">{title}</h2>
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
							{content}
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
}

export default ModalMixin;
