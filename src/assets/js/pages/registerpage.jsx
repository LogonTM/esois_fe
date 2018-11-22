import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { 
    minimum_name_length, maximum_name_length,
    minimum_username_length, maximum_username_length,
    minimum_password_length, maximum_password_length,
    maximum_email_length
} from '../constants/constants';
import { login } from '../utilities/functions';
import { authentication_token } from '../constants/constants';
import { register, checkUsernameAvailability, checkEmailAvailability } from '../utilities/functions';
import { notification } from 'antd';
import PropTypes from 'prop-types';

var PT = PropTypes

class RegisterPage extends Component {
    static propTypes = {
		isUserloggedIn: PT.bool,
		getStatus: PT.func,
		backToAggregator: PT.func,
	}

    constructor(props) {
		super(props);
		this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            passwordValidation: {
                value: ''
            },
            usernameOrEmail: {
				value: ''
			},
			loggedInStatus: this.props.isUserloggedIn
        }
	}

    handleNameChange = (event, toValidate) => {
        var nameValue = event.target.value;
		this.setState({
            name : { 
                value: nameValue,
                ...toValidate(nameValue)
            } 
        })
		event.stopPropagation();
    }
    
    handleUsernameChange = (event, toValidate) => {
        var userNameValue = event.target.value;
        this.setState({
            username : {
                value : userNameValue,
                ...toValidate(userNameValue)
            }
        })
    }

    handlePasswordChange = (event, toValidate) => {
        var passwordValue = event.target.value;
        this.setState({
            password : {
                value : passwordValue,
                ...toValidate(passwordValue)
            }
        })
    }

    handlePasswordValidationChange = (event, toValidate) => {
        var passwordValidationValue = event.target.value;
        this.setState({
            passwordValidation : {
                value : passwordValidationValue,
                ...toValidate(passwordValidationValue)             
            }
        })
    }

    handleEmailChange = (event, toValidate) => {
        var emailValue = event.target.value;
        this.setState({
            email : {
                value : emailValue,
                ...toValidate(emailValue)
            }
        })
    }
    
    handleRegister = (event) => {
        console.log("About to pass the final check?")
        event.preventDefault();
        if (this.state.password.value === this.state.passwordValidation.value && this.state.password.value !== '') {
            console.log("About to register: ")
            const registerRequest = {
                name: this.state.name.value,
                email: this.state.email.value,
                username: this.state.username.value,
                password: this.state.password.value
            };
            console.log("Registering...: ")
            console.log(registerRequest)
            register(registerRequest)
            .then(response => {
                console.log("Near success?")
                notification.success({
                    message: 'RABA',
                    description: "Thank you! You're successfully registered. Proceeding to log in and forwarding to aggregator!",
                });
                const loginRequest = {
                    usernameOrEmail: this.state.username.value,
                    password: this.state.password.value
                };          
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(authentication_token, response.accessToken);
                    this.setState({
                        loggedInStatus: true
                    })
                    this.props.getStatus(true)
                    setTimeout(() => {
                        this.props.backToAggregator();
                    }, 1500)
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'RABA',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            message: 'RABA',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }).catch(error => {
                console.log("Error?")
                notification.error({
                    message: 'RABA',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        } else {

        }
    }

    validateName = (name) => {
        if(name.length < minimum_name_length) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${minimum_name_length} characters needed.)`
            }
        } else if (name.length > maximum_name_length) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${maximum_name_length} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > maximum_email_length) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${maximum_email_length} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < minimum_username_length) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${minimum_username_length} characters needed.)`
            }
        } else if (username.length > maximum_username_length) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${maximum_username_length} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability = () => {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability = () => {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < minimum_password_length) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${minimum_password_length} characters needed.)`
            }
        } else if (password.length > maximum_password_length) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${maximum_password_length} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

	render() {
		return (
			<div>
				<div className="top-gap">
						<div className="register-panel">
							<form onSubmit={this.handleRegister} className="register-form">
								<FormattedMessage
									id='register.name'
									description='name translation'
									defaultMessage='Your full name'
								>
									{name => (
										<input
											className="form-control"
                                            type="text"
                                            formNoValidate = {this.state.password.validateStatus} 
											value={this.state.name.value}
											placeholder={name} 
											onChange={(event) => this.handleNameChange(event, this.validateName)}
										/>
									)}
								</FormattedMessage>
								<FormattedMessage
									id='register.username'
									description='username translation'
									defaultMessage='Your Username'
								>	
									{username => (
										<input
											className="form-control"
											name="Username"
											value={this.state.username.value}
											placeholder={username} 
											onChange={(event) => this.handleUsernameChange(event, this.validateUsername)}
										/>
									)}
								</FormattedMessage>
                                <FormattedMessage
									id='register.password'
									description='password translation'
									defaultMessage='Your password'
								>
									{password => (
										<input
											className="form-control"
											type="password" 
											value={this.state.password.value}
											placeholder={password} 
											onChange={(event) => this.handlePasswordChange(event, this.validatePassword)}
										/>
									)}
								</FormattedMessage>
                                <FormattedMessage
									id='register.passowordvalidation'
									description='password validation translation'
									defaultMessage='Your password confirmation'
								>
									{passwordvalidation => (
										<input
											className="form-control"
											type="password" 
											value={this.state.passwordValidation.value}
											placeholder={passwordvalidation} 
											onChange={(event) => this.handlePasswordValidationChange(event, this.validatePassword)}
										/>
									)}
								</FormattedMessage>
								<FormattedMessage
									id='register.email'
									description='email translation'
									defaultMessage='Your e-mail'
								>	
									{email => (
										<input
											className="form-control"
											name="email"
											value={this.state.email.value}
											placeholder={email} 
											onChange={(event) => this.handleEmailChange(event, this.validatePassword)}
										/>
									)}
								</FormattedMessage>
								<button type="submit" className="btn btn-outline-secondary btn-lg" onClick={this.handleRegister}>
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
	}
}

export default RegisterPage;