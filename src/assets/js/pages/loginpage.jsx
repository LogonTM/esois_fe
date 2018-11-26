import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { login } from '../utilities/functions';
import { getCurrentUser } from '../utilities/functions';
import { authentication_token } from '../constants/constants';
import PropTypes from 'prop-types';

var PT = PropTypes

class LoginPage extends Component {
	static propTypes = {
		isUserloggedIn: PT.bool,
		getStatus: PT.func,
		backToAggregator: PT.func,
		toRegistration: PT.func
	}

	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			usernameOrEmail: {
				value: ''
			},
			password: {
				value: ''
			},
			notificationMessage: {
                message: ''
            },
			loggedInStatus: this.props.isUserloggedIn
		};
	}
	componentDidMount() {
		this.loadCurrentUser();
	  }

	loadCurrentUser = () => {
		getCurrentUser()
		.then(response => {
		  this.setState({
			currentUser: response.name,
			loggedInStatus: true,
		  });
		}).catch(error => {

		});
	  }

	logInOut = (event) => {
		event.preventDefault();
		if (this.state.loggedInStatus === false && this.state.usernameOrEmail.value !== '' && this.state.password.value !== '') {
			const loginRequest = {
				usernameOrEmail: this.state.usernameOrEmail.value,
				password: this.state.password.value
			};
			login(loginRequest)
			.then(response => {
				localStorage.setItem(authentication_token, response.accessToken);
				this.setState({
					loggedInStatus: true
				})
				this.loadCurrentUser()
				this.props.getStatus(true)
				setTimeout(() => {
					this.props.backToAggregator();
				}, 1500)
			}).catch(error => {
				if(error.status === 401) {
					// Fix here Bootstrap notification for incorrect password or username?
					this.setState({
						notificationMessage : {
							message: "RABA: Your Username or Password is incorrect. Please try again!"
						}
					})
				} else {
					// Fix here Bootstrap notification for some other server side failure?
					this.setState({
						notificationMessage : {
							message: "RABA: " + error.message || "RABA: Sorry! Something went wrong. Please try again!!"
						}
					})
				}
			});
		} else {
			localStorage.removeItem(authentication_token);
			this.setState({
				loggedInStatus: false
			})
			this.props.getStatus(false)
		}
	}

	handleUsernameChange = event => {
		var usernameOrEmail = event.target.value;
		this.setState({
			usernameOrEmail : {
				value : usernameOrEmail
			}
		})
		event.stopPropagation();	
	}

	handlePasswordChange = event => {
		var password = event.target.value;
		this.setState({
			password : {
				value : password
			}
		})
		event.stopPropagation();
	}

	handleToRegistration = () => {
		this.props.toRegistration();
	}

	render () {
		if (this.state.loggedInStatus === false) {
			return (
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
											value={this.state.usernameOrEmail.value}
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
											value={this.state.password.value}
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
								<button type="submit" className="btn btn-outline-secondary btn-lg" onClick={this.handleToRegistration}>
								<span aria-hidden="true"></span>
									<FormattedMessage
												id='login.registerButton'
												description='register translation'
												defaultMessage='Register'
									/>
								</button>
							</form>
							<div className="bottom-gap"></div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<span aria-hidden="true">Tere {this.state.currentUser}, olete logitud sisse!</span>
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
};

export default LoginPage;
