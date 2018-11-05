import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types'

var PT = PropTypes

class LoginPage extends Component {
	static propTypes = {
		languageFromMain: PT.string,
		isUserloggedIn: PT.bool,
		getStatus: PT.func
	}

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			loggedInStatus: this.props.isUserloggedIn
		};
	}
	
	logInOut = (event) => {
		// TODO
		event.preventDefault();
		if (this.state.loggedInStatus === false && this.state.username === 'mina' && this.state.password === '') {
			this.setState({
				loggedInStatus: true
			})
			this.props.getStatus(true)
		} else {
			this.setState({
				loggedInStatus: false
			})
			this.props.getStatus(false)
		}
	}

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
		if (this.state.loggedInStatus === false) {
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
								<button type="submit" className="btn btn-outline-secondary btn-lg" onClick={this.logInOut} >
								<span aria-hidden="true"></span>
									<FormattedMessage
										id='login.loginButton'
										description='login translation'
										defaultMessage='Login'
									/>
								</button> 
							</form>
							<div className="bottom-gap"></div>
						</div>
					</div>
				</div>
			);
		} else {
			return	(
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<span aria-hidden="true">Tere {this.state.username}, you are logged in!</span>
							<div>
								<button type="button" className="btn btn-outline-secondary btn-lg" onClick={this.logInOut} >
								<span aria-hidden="true"></span>
									<FormattedMessage
										id='login.logoutButton'
										description='log out translation'
										defaultMessage='Log out'
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default LoginPage;
