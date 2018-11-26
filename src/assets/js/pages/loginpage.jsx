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
				value: ''
			},
			password: {
				value: ''
			},
			loggedInStatus: this.props.isUserloggedIn
		};
	}
	componentDidMount() {
		this.loadCurrentUser();
	  }

	componentDidUpdate() {
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
				console.log(localStorage.getItem(authentication_token))
				this.setState({
					loggedInStatus: true
				})
				this.props.getStatus(true)
				setTimeout(() => {
					this.props.backToAggregator();
				}, 1500)
			}).catch(error => {
				if(error.status === 401) {
					// Add here Bootstrap notification for incorrect password or username                 
				} else {
					// Add here Bootstrap notification for some other server side failure?                                        
				}
			});
		} else {
			localStorage.removeItem(authentication_token);
			console.log(localStorage.getItem(authentication_token))
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
								<input
                                    className="form-control"
                                    type="text" 
                                    value={this.state.usernameOrEmail.value}
                                    placeholder={dictionary[this.props.languageFromMain].common.username} 
                                    onChange={this.handleUsernameChange.bind(this)}
                                />
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.state.password.value}
                                    placeholder={dictionary[this.props.languageFromMain].common.password} 
                                    onChange={this.handlePasswordChange.bind(this)}
                                />
                                <Button
                                    label={dictionary[this.props.languageFromMain].loginpage.loginButton}
                                    type='submit'
                                    uiType='btn.lg'
                                    onClick={this.logInOut}
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
