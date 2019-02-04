import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dictionary from '../../../translations/dictionary';
import $ from 'jquery';

class ADVTokenMenu extends PureComponent {
	
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		repeat1: PropTypes.string,
		repeat2: PropTypes.string,
		languageFromMain: PropTypes.string.isRequired
	}
	
    constructor(props) {
		super(props);
		var repeat1 = this.props.repeat1||'';
		var repeat2 = this.props.repeat2||'';
		this.state = {
			repeat1,
			repeat2,
			hideMenu: (repeat1||repeat2) ? false : true,
			isStart: false,
			isEnd: false,
		}
	}

	getMenuState = () => {
		if (this.state.hideMenu) {
			return {};
		} else {
			return $.extend({}, this.state); // copy of state
		}
	}

	toggleRepeatMenu = e => {
		this.setState((st) =>({hideMenu: !st.hideMenu}));
	}

	toggleStart = e => {
		this.setState((st) => ({isStart: !st.isStart}));
	}

	toggleEnd = e => {
		this.setState((st) => ({isEnd: !st.isEnd}));
	}

   componentDidMount() {
		this.props.onChange(this.getMenuState());
	}

	componentDidUpdate() {
		// safe because of pure render mixin: will only update on state change.
		this.props.onChange(this.getMenuState());
	}

	render() {
		return (
			<div id="ADVtokenMenu">
				<button
					className="btn btn-xs btn-default image_button repeat_menu"
					onClick={this.toggleRepeatMenu}
					ref="repeatMenu"
				>
					<i className="fa fa-cog" />
				</button>
				<div id="ADVtokenMenu-items" className={"hide-" + this.state.hideMenu}>
					<div id="repeatMenu" className={"input-group input-group-sm repeat"}>
						<span>{dictionary[this.props.languageFromMain].queryinput.repeatMenu.repeat}</span>&nbsp;
						<input
							type="text"
							id="repeat1"
							value={this.state.repeat1}
							onChange={(evt) => this.setState({repeat1: evt.target.value})}
							ref="repeat1"
						/>&nbsp;
						<span>{dictionary[this.props.languageFromMain].queryinput.repeatMenu.to}</span>&nbsp;
						<input
							type="text"
							id="repeat2"
							value={this.state.repeat2}
							onChange={(evt) => this.setState({repeat2: evt.target.value})}
							ref="repeat2"
						/>&nbsp;
						<span>{dictionary[this.props.languageFromMain].queryinput.repeatMenu.times}</span>
					</div>
					<div id="start-end-menu">
						<div>
							<label>
								<input
									type="checkbox"
									checked={this.state.isStart}
									onChange={this.toggleStart}
								/>&nbsp;
								{dictionary[this.props.languageFromMain].queryinput.sentenceStart}
							</label>
						</div>
						<div>
							<label>
								<input
									type="checkbox"
									checked={this.state.isEnd}
									onChange={this.toggleEnd}
								/>&nbsp;
								{dictionary[this.props.languageFromMain].queryinput.sentenceEnd}
							</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ADVTokenMenu;