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
import { register, checkUsernameAvailability, checkEmailAvailability } from '../utilities/functions'; // For future use?
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
                value: '',
                valid: false
            },
            username: {
                value: '',
                valid: false
            },
            email: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            },
            passwordValidation: {
                value: '',
                valid: false
            },
            usernameOrEmail: {
				value: ''
			},
			loggedInStatus: this.props.isUserloggedIn
        }
    }

    handleNameChange = event => {
        var nameValue = event.target.value;
        if (this.state.name.value.length > minimum_name_length && 
            this.state.name.value.length < maximum_name_length) {
                this.setState({
                    name: {
                        value: nameValue,
                        valid: true
                    }
                })
            } else {
                this.setState({
                    name: {
                        value: nameValue,
                        valid: false
                    }
                })
            }
		event.stopPropagation();
    }
    
    handleUsernameChange = event => {
        var userNameValue = event.target.value;
        if (this.state.username.value.length > minimum_username_length && 
            this.state.username.value.length < maximum_username_length) {
                this.setState({
                    username: {
                        value: userNameValue,
                        valid: true
                    }
                })
            } else {
                this.setState({
                    username: {
                        value: userNameValue,
                        valid: false
                    }
                })
            }
    }

    handlePasswordChange = event => {
        var passwordValue = event.target.value;
        if (this.state.password.value.length > minimum_password_length && 
            this.state.password.value.length < maximum_password_length) {
                this.setState({
                    password: {
                        value: passwordValue,
                        valid: true
                    }
                })
            } else {
                this.setState({
                    password: {
                        value: passwordValue,
                        valid: false
                    }
                })
            }
    }

    

    handlePasswordValidationChange = event => {
        var passwordValidationValue = event.target.value;
        if (this.state.password.value.length > minimum_password_length && 
            this.state.password.value.length < maximum_password_length && 
            this.state.password.value === this.state.passwordValidation.value) {
                this.setState({
                    passwordValidation: {
                        value: passwordValidationValue,
                        valid: true
                    }
                })
            } else {
                this.setState({
                    passwordValidation: {
                        value: passwordValidationValue,
                        valid: false
                    }
                })
            }
    }

    handleEmailChange = event => {
        var emailValue = event.target.value;
        this.setState({
            email : {
                value : emailValue,
                valid: true
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
                // Add here Bootstrap notification for success
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
                        // Add here Bootstrap notifcation for failure about incorrectness in either Username or Password                   
                    } else {
                        // Add here Bootstrap notification for failure from the server side?                                            
                    }
                });
            }).catch(error => {
                console.log("Error?")
                // Add here Bootstrap failure notification for server side registration?
            });
        } else {

        }
    }

	render() {
        // Client side? But server side?
        const registrationEnabler = 
            this.state.name.valid && 
            this.state.username.valid && 
            this.state.email.valid && 
            this.state.password.valid !== false
        const nameValidator = (this.state.name.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.name.value.length > minimum_name_length && 
             this.state.name.value.length < maximum_name_length ? "is-valid" : "is-invalid")
        const userNameValidator = (this.state.username.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.username.value.length > minimum_username_length && 
             this.state.username.value.length < maximum_username_length ? "is-valid"  : "is-invalid")
        const passWordValidator = (this.state.password.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.password.value.length > minimum_password_length && 
             this.state.password.value.length < maximum_password_length ? "is-valid" : "is-invalid")
        const passWordConfirmation = (this.state.passwordValidation.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.password.value.length > minimum_password_length && 
             this.state.password.value.length < maximum_password_length && 
             this.state.password.value === this.state.passwordValidation.value ? "is-valid" : "is-invalid")
        const emailValidator = (this.state.email.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.email.value.length < maximum_email_length ? "is-valid" : "is-invalid")
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
											className={nameValidator}
                                            type="text"
											value={this.state.name.value}
											placeholder={name} 
											onChange={this.handleNameChange}
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
											className={userNameValidator}
											name="Username"
											value={this.state.username.value}
											placeholder={username} 
											onChange={this.handleUsernameChange}
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
											className={passWordValidator}
											type="password" 
											value={this.state.password.value}
											placeholder={password} 
											onChange={this.handlePasswordChange}
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
											className={passWordConfirmation}
											type="password" 
											value={this.state.passwordValidation.value}
											placeholder={passwordvalidation} 
											onChange={this.handlePasswordValidationChange}
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
                                            className={emailValidator}
                                            type="email"
											name="email"
											value={this.state.email.value}
											placeholder={email} 
											onChange={this.handleEmailChange}
										/>
									)}
								</FormattedMessage>
                                <button type="submit" 
                                        className="btn btn-outline-secondary btn-lg" 
                                        onClick={this.handleRegister} 
                                        disabled={!registrationEnabler}>
								<span aria-hidden="true"></span>
									{<FormattedMessage
												id='login.registerButton'
												description='register translation'
												defaultMessage='Register'
									/>}
								</button>
							</form>
						</div>
                    <div className="bottom-gap"></div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;