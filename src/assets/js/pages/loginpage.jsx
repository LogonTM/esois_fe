import React, { Component } from 'react';
import { login } from '../utilities/functions';
import { getCurrentUser, getSAMLToken } from '../utilities/functions';
import { authentication_token, saml_url, google_auth_url, logout_url } from '../constants/constants';
import PropTypes from 'prop-types';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import googleLogo from '../../img/google-logo.png';
import ekrk_sso from '../../img/ekrk-footer-logo.png';

var PT = PropTypes

class LoginPage extends Component {
	static propTypes = {
		isUserloggedIn: PT.bool,
		getStatus: PT.func,
		backToAggregator: PT.func,
		toRegistration: PT.func,
		languageFromMain: PropTypes.string.isRequired,
		getRole: PT.func
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
			loggedInStatus: this.props.isUserloggedIn,
			userRoleDesignator: this.props.getUserRole
		};
	}
	
	componentDidMount() {
		this.loadCurrentUser();
	  }

	loadCurrentUser = () => {
		getCurrentUser()
		.then(response => {
			console.log("UserSummary response: " + response.authorities[0].authority)
		  this.setState({
			currentUser: response.name,
			loggedInStatus: true,
		  });
		  this.props.getRole(response.authorities[0].authority);
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
				console.log("Local token: " + localStorage.getItem(authentication_token))
				this.setState({
					loggedInStatus: true
				})
				this.loadCurrentUser()
				this.props.getStatus(true)
			}).catch(error => {
				if(error.status === 401) {
					// Fix here Bootstrap notification for incorrect password or username?
					this.setState({
						usernameOrEmail : {
							value : this.state.usernameOrEmail.value,
							valid: false,
							errormessage : dictionary[this.props.languageFromMain].loginpage.error.incorrect
						},
						password : {
							value : this.state.password.value,
							valid : false,
							errormessage : dictionary[this.props.languageFromMain].loginpage.error.incorrect
						}
					})
				} else {
					// Fix here Bootstrap notification for some other server side failure?
					this.setState({
						notificationMessage : {
							message: "RABA: " + error.message || dictionary[this.props.languageFromMain].loginpage.error.servercatch
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
			document.location = logout_url
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

	getSAML = () => {
		getSAMLToken()
		.then(response => {
			console.log("Response from SAML token: " + response + " with token specific:" + response.accessToken  + " and bearer type: " + response.tokenType)
		}).catch(error => {
			console.log("Response error from SAML token: " + error.status + " " + error.message)
		})
	}

	render () {
		const usernameOrEmailInputValidator = (this.state.usernameOrEmail.value === '') ? "form-control" : "form-control input-lg " +
            (this.state.usernameOrEmail.valid ? "is-valid" : "is-invalid")
        const passwordInputValidator = (this.state.password.value === '') ? "form-control" : "form-control input-lg " +
            (this.state.password.valid ? "is-valid"  : "is-invalid")
		if (this.state.loggedInStatus === false) {
			return (
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<form onSubmit={this.logInOut}>
								<div>
									<input
										className={usernameOrEmailInputValidator}
										type="text" 
										value={this.state.usernameOrEmail.value}
										placeholder={dictionary[this.props.languageFromMain].common.username} 
										onChange={(event) => this.handleUsernameChange(event, this.usernameNotEmpty)}
									/>
									<div className="invalid-feedback">{this.state.usernameOrEmail.errormessage}</div>
								</div>
								<div>
									<input
										className={passwordInputValidator}
										type="password"
										name="password"
										value={this.state.password.value}
										placeholder={dictionary[this.props.languageFromMain].common.password} 
										onChange={(event) => this.handlePasswordChange(event, this.passwordNotEmpty)}
									/>
									<div className="invalid-feedback">{this.state.password.errormessage}</div>
								</div>
								<Button
									label={dictionary[this.props.languageFromMain].button.login}
									type='submit'
									uiType='btn.lg'
									onClick={this.logInOut}
									disabled={this.loginValidator()}
								/>
                                &nbsp;
                                <Button
                                    label={dictionary[this.props.languageFromMain].button.register}
                                    type='submit'
									uiType='btn.lg'
									onClick={this.handleToRegistration}
                                />
								<Button
                                    label='samlTESTER'
                                    type='button'
									uiType='btn.lg'
									onClick={this.getSAML}
                                />
							</form>
							<div className="bottom-gap"></div>
						</div>
						<div className="oauth2">
							<a className="btn btn-block" href={google_auth_url}>
								<img src={googleLogo} alt="google_logo"/>
							</a>
						</div>
						{/* <div className="oauth2">
							<a className="btn btn-block" href={saml_url}>
								<img src={ekrk_sso} alt="google_logo"/>
							</a>
						</div> */}
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="top-gap">
						<div className="login-panel">
							<span aria-hidden="true">{`${dictionary[this.props.languageFromMain].loginpage.messageP1} ${this.state.currentUser}, ${dictionary[this.props.languageFromMain].loginpage.messageP2}!`}</span>
							<div>
								<Button
                                    label={dictionary[this.props.languageFromMain].button.logout}
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
