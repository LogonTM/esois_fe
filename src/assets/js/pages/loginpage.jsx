import React, { Component } from 'react';
import { login } from '../utilities/functions';
import { getCurrentUser } from '../utilities/functions';
import { authentication_token } from '../constants/constants';
import PropTypes from 'prop-types';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

var PT = PropTypes

class LoginPage extends Component {
	static propTypes = {
		isUserloggedIn: PT.bool,
		getStatus: PT.func,
		backToAggregator: PT.func,
		toRegistration: PT.func,
		languageFromMain: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			usernameOrEmail: {
				value: '',
				valid: false,
				errormessage: null
			},
			password: {
				value: '',
				valid: false,
				errormessage: null
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
						usernameOrEmail : {
							value : this.state.usernameOrEmail.value,
							valid: false,
							errormessage : "RABA: Your Username or Password is incorrect. Please try again!"
						},
						password : {
							value : this.state.password.value,
							valid : false,
							errormessage : "RABA: Your Username or Password is incorrect. Please try again!"
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

	usernameNotEmpty = (name) => {
		if(name !== '') {
			return {
				notEmpty: true
			}
		} else {
			return {
				notEmpty : false
			}
		}
	}

	handleUsernameChange = (event, validation) => {
		var usernameOrEmail = event.target.value;
		this.setState({
			usernameOrEmail : {
				value : usernameOrEmail,
				valid : validation(usernameOrEmail).notEmpty
			}
		})
		event.stopPropagation();	
	}

	passwordNotEmpty = (password) => {
		if(password !== '') {
			return {
				notEmpty : true
			}
		} else {
			return {
				notEmpty : false
			}
		}
	}

	handlePasswordChange = (event, validation) => {
		var password = event.target.value;
		this.setState({
			password : {
				value : password,
				valid : validation(password).notEmpty
			}
		})
		event.stopPropagation();
	}

	handleToRegistration = () => {
		this.props.toRegistration();
	}

	loginValidator = () => {
		return !(
            this.state.usernameOrEmail.valid === true && 
            this.state.password.valid === true)
	}

	render () {
		const usernameOrEmailValidator = (this.state.usernameOrEmail.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.usernameOrEmail.valid ? "is-valid" : "is-invalid")
        const passwordValidator = (this.state.password.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.password.valid ? "is-valid"  : "is-invalid")
		if (this.state.loggedInStatus === false) {
			return (
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<form onSubmit={this.logInOut}>
								<div>
									<input
										className={usernameOrEmailValidator}
										type="text" 
										value={this.state.usernameOrEmail.value}
										placeholder={dictionary[this.props.languageFromMain].common.username} 
										onChange={(event) => this.handleUsernameChange(event, this.usernameNotEmpty)}
									/>
									<div className="invalid-feedback">{this.state.usernameOrEmail.errormessage}</div>
								</div>
								<div>
									<input
										className={passwordValidator}
										type="password"
										name="password"
										value={this.state.password.value}
										placeholder={dictionary[this.props.languageFromMain].common.password} 
										onChange={(event) => this.handlePasswordChange(event, this.passwordNotEmpty)}
									/>
									<div className="invalid-feedback">{this.state.password.errormessage}</div>
								</div>
								<Button
									label={dictionary[this.props.languageFromMain].loginpage.loginButton}
									type='submit'
									uiType='btn.lg'
									onClick={this.logInOut}
									disabled={this.loginValidator()}
								/>
                                &nbsp;
                                <Button
                                    label={dictionary[this.props.languageFromMain].loginpage.registerButton}
                                    type='submit'
									uiType='btn.lg'
									onClick={this.handleToRegistration}
                                />
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
							<span aria-hidden="true">{`${dictionary[this.props.languageFromMain].loginpage.loginMessageP1} ${this.state.currentUser}, ${dictionary[this.props.languageFromMain].loginpage.loginMessageP2}!`}</span>
							<div>
								<Button
                                    label={dictionary[this.props.languageFromMain].loginpage.logoutButton}
                                    uiType='btn.lg'
                                    onClick={this.logInOut}
                                />
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
};

export default LoginPage;
