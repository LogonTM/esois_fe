import React, { Component } from 'react';
import AggregatorPage from './aggregatorpage.jsx';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types'

var PT = PropTypes

/* class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}
	
	logIn () {
		// TODO
	}

	// backToAggregator () {
	// 	// TODO
	// }

	handleUsernameChange = event => {
		var username = event.target.value;
		this.setState({username: username})
		event.stopPropagation();	
	}

	handlePasswordChange = event => {
		var password = event.target.value;
		this.setState({password: password})
		event.stopPropagation();
	}

	render () {
		return	(
			<div>
				<div className="top-gap">
					<div className="login-panel">
						<FormattedMessage
							id='login.username'
							description='username translation'
							defaultMessage='Username'
						>
							{username => (
								<input
									className="form-control"
									type="text" 
									value={this.state.username}
									placeholder={username} 
									onChange={this.handleUsernameChange.bind(this)}
								/>
							)}
						</FormattedMessage>
						<FormattedMessage
							id='login.password'
							description='password translation'
							defaultMessage='Password'
						>	
							{password => (
								<input
									className="form-control"
									type="password"
									name="password"
									value={this.state.password}
									placeholder={password} 
									onChange={this.handlePasswordChange.bind(this)}
								/>
							)}
						</FormattedMessage>
						<button type="button" className="btn btn-default btn-lg" onClick={this.logIn} >
							<span aria-hidden="true"></span>
							<FormattedMessage
								id='login.loginButton'
								description='login translation'
								defaultMessage='Login'
							/>
						</button>
						{/* <button type="button" className="btn btn-default btn-lg" onClick={this.backToAggregator} >
							<span aria-hidden="true"></span>
							Tagasi aggregaatorisse
						</button> *}
					</div>
				</div>
			</div>
		);
	}
} */

class LoginPage extends Component {
	static propTypes = {
		languageFromMain: PT.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			logedInStatus: false
		};
	}
	
	logInOut = (event) => {
		// TODO
		event.preventDefault();
		if (this.state.logedInStatus === false && this.state.username === '' && this.state.password === '') {
			this.setState({
				logedInStatus: true
			})
		} else {
			this.setState({
				logedInStatus: false
			})
		}
	}

	// backToAggregator () {
	// 	// TODO
	// }

	handleUsernameChange = event => {
		var username = event.target.value;
		this.setState({username: username})
		event.stopPropagation();	
	}

	handlePasswordChange = event => {
		var password = event.target.value;
		this.setState({password: password})
		event.stopPropagation();
	}

	render () {
		if (this.state.logedInStatus === false) {
			return	(
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<form onSubmit={this.logInOut}>
								<FormattedMessage
									id='login.username'
									description='username translation'
									defaultMessage='Username'
								>
									{username => (
										<input
											className="form-control"
											type="text" 
											value={this.state.username}
											placeholder={username} 
											onChange={this.handleUsernameChange.bind(this)}
										/>
									)}
								</FormattedMessage>
								<FormattedMessage
									id='login.password'
									description='password translation'
									defaultMessage='Password'
								>	
								{password => (
									<input
										className="form-control"
										type="password"
										name="password"
										value={this.state.password}
										placeholder={password} 
										onChange={this.handlePasswordChange.bind(this)}
									/>
								)}
								</FormattedMessage>
								<button type="submit" className="btn btn-default btn-lg" onClick={this.logIn} >
								<span aria-hidden="true"></span>
									<FormattedMessage
										id='login.loginButton'
										description='login translation'
										defaultMessage='Login'
									/>
								</button>
									{/* <button type="button" className="btn btn-default btn-lg" onClick={this.backToAggregator} >
										<span aria-hidden="true"></span>
										Tagasi aggregaatorisse
									</button> */}
							</form>
						</div>
					</div>
				</div>
			);
		} else {
			return	(
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<span aria-hidden="true">Tere Kasutaja, you are logged in!</span>
							<div><button type="button" className="btn btn-default btn-lg" onClick={this.logInOut} >
								<span aria-hidden="true"></span>
								Log out! 
							</button></div>
							{/* <button type="button" className="btn btn-default btn-lg" onClick={this.backToAggregator} >
								<span aria-hidden="true"></span>
								Tagasi aggregaatorisse
							</button> */}
						</div>
					</div>
				</div>
			);
		}
	}
}




export default LoginPage;
