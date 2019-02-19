
import PropTypes from 'prop-types';
import dictionary from '../../../translations/dictionary';
import React, { Component } from 'react';
import SearchLogs from '../components/searchlogs';
import UserLogs from '../components/userlogs';
import ErrorLogs from '../components/errorlogs';

class ManageLogs extends Component {
    static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			renderSearchLogs: true, // By default
			renderUserLogs: false,
			renderErrorLogs: false
		}
	}
	
	viewSearchLogs = () => {
		this.setState({
			renderSearchLogs: true,
			renderUserLogs: false,
			renderErrorLogs: false
		})
	}

	viewUserLogs = () => {
		this.setState({
			renderSearchLogs: false,
			renderUserLogs: true,
			renderErrorLogs: false
		})
	}

	viewErrorLogs = () => {
		this.setState({
			renderSearchLogs: false,
			renderUserLogs: false,
			renderErrorLogs: true
		})
	}

	renderSearchLogs = () => {
		return(
			<SearchLogs
				languageFromMain={this.props.languageFromMain}
			/>
		)
	}

	renderUserLogs = () => {
		return(
			<UserLogs
				languageFromMain={this.props.languageFromMain}
			/>
		)
	}

	renderErrorLogs = () => {
		return(
			<ErrorLogs
				languageFromMain={this.props.languageFromMain}
			/>
		)
	}

	renderSwitch = () => {
		return(
			<div className="switch-toggle switch-candy orange">
				<input 
					id='searchlog' 
					name='viewsearchlogs' 
					type='radio'
					checked={this.state.renderSearchLogs} 
					readOnly
				/>
				<label 
					htmlFor='searchlog'
					onClick={this.viewSearchLogs}
				>
					{dictionary[this.props.languageFromMain].managelogs.searchlogs}
				</label>
				<input 
					id='userlog' 
					name='viewuserlogs'
					type='radio'
					checked={this.state.renderUserLogs}
					readOnly
				/>
				<label 
					htmlFor='userlog'
					onClick={this.viewUserLogs}
				>
					{dictionary[this.props.languageFromMain].managelogs.userlogs}
				</label>
				<input 
					id='errorlog' 
					name='viewerrorlogs' 
					type='radio' 
					checked={this.state.renderErrorLogs}
					readOnly	
				/>
				<label 
					htmlFor='errorlog' 
					onClick={this.viewErrorLogs}
				>
					{dictionary[this.props.languageFromMain].managelogs.errorlogs}
				</label>
				<a></a>
			</div>
		)
	}

	render() {
		return (
			<div id='container'>
				<div className="row justify-content-center" style={{marginTop:64}}>
					<div className="col-xl-5 col-l-5 col-md-8 col-sm-10 col-xs-12">
						{this.renderSwitch()}
					</div>
				</div>
				{this.state.renderSearchLogs === true ? this.renderSearchLogs() : null}
				{this.state.renderUserLogs === true ? this.renderUserLogs() : null}
				{this.state.renderErrorLogs === true ? this.renderErrorLogs() : null}
			</div>
		)
	}
}

export default ManageLogs;