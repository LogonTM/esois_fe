import React, { Component } from 'react';
import { 
    minimum_name_length, maximum_name_length,
    minimum_username_length, maximum_username_length,
    minimum_password_length, maximum_password_length,
    maximum_email_length
} from '../constants/constants';
import { login } from '../utilities/functions';
import { authentication_token } from '../constants/constants';
import { register, checkUsernameAvailability, checkEmailAvailability } from '../utilities/functions';
import PropTypes from 'prop-types';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

var PT = PropTypes

class RegisterPage extends Component {
    static propTypes = {
		isUserloggedIn: PT.bool,
		getStatus: PT.func,
        backToAggregator: PT.func,
        languageFromMain: PropTypes.string.isRequired
    }

    constructor(props) {
		super(props);
		this.state = {
            name: {
                value: '',
                valid: false,
                errormessage: null
            },
            username: {
                value: '',
                valid: false,
                errormessage: null
            },
            email: {
                value: '',
                valid: false,
                errormessage: null
            },
            password: {
                value: '',
                valid: false,
                errormessage: null
            },
            passwordValidation: {
                value: '',
                valid: false,
                errormessage: null
            },
            usernameOrEmail: {
				value: ''
            },
            notificationMessage: {
                message: ''
            },
            loggedInStatus: this.props.isUserloggedIn
        }
    }

    validateName = (name) => {
        if(name.length < minimum_name_length) {
            return {
                isValid: false,
                hasError: `${dictionary[this.props.languageFromMain].register.nameerror.shortP1} 
                ${minimum_name_length} 
                ${dictionary[this.props.languageFromMain].register.nameerror.shortP2}`
            }
        } else if (name.length > maximum_name_length) {
            return {
                isValid: false,
                hasError: `${dictionary[this.props.languageFromMain].register.nameerror.longP1} 
                ${maximum_name_length} 
                ${dictionary[this.props.languageFromMain].register.nameerror.longP2}`
            }
        } else {
            return {
                isValid: true,
                hasError: null,
            };            
        }
    }

    handleNameChange = (event, validation) => {
        var nameValue = event.target.value;
        this.setState({
            name: {
                value: nameValue,
                valid: validation(nameValue).isValid,
                errormessage: validation(nameValue).hasError
            }
        })
		event.stopPropagation();
    }

    validateUsername = (username) => {
        if(username.length < minimum_username_length) {
            return {
                isValid: false,
                hasError: `${dictionary[this.props.languageFromMain].register.usernameerror.shortP1} 
                ${minimum_username_length} 
                ${dictionary[this.props.languageFromMain].register.usernameerror.shortP2}`
            }
        } else if (username.length > maximum_name_length) {
            return {
                isValid: false,
                hasError: `${dictionary[this.props.languageFromMain].register.usernameerror.longP1} 
                ${maximum_username_length} 
                ${dictionary[this.props.languageFromMain].register.usernameerror.longP2}`
            }
        } else {
            return {
                isValid: true,
                hasError: null
            }
        }
    }
    
    handleUsernameChange = (event, validation) => {
        var userNameValue = event.target.value;
        this.setState({
            username: {
                value: userNameValue,
                valid: validation(userNameValue).isValid,
                errormessage: validation(userNameValue).hasError
            }
        })
    }

    validatePassword = (password) => {
        if(password.length < minimum_password_length) {
            return {
                isValid: false,
                hasError : `${dictionary[this.props.languageFromMain].register.passworderror.shortP1} 
                ${minimum_password_length} 
                ${dictionary[this.props.languageFromMain].register.passworderror.shortP2}`
            }
        } else if (password.length > maximum_password_length) {
            return {
                isValid: false,
                hasError: `${dictionary[this.props.languageFromMain].register.passworderror.longP1} 
                ${maximum_password_length} 
                ${dictionary[this.props.languageFromMain].register.passworderror.longP2}`
            }
        } else {
            return {
                isValid: true,
                hasError: null,
            };            
        }
    }

    handlePasswordChange = (event, validation) => {
        var passwordValue = event.target.value;
        this.setState({
            password: {
                value: passwordValue,
                valid: validation(passwordValue).isValid,
                errormessage: validation(passwordValue).hasError
            }
        })
    }
    
    validatePasswordConfirmation = (password) => {
        if(password.length < minimum_password_length) {
            return {
                isValid: false,
                hasError : `${dictionary[this.props.languageFromMain].register.passworderror.shortP1} 
                ${minimum_password_length} 
                ${dictionary[this.props.languageFromMain].register.passworderror.shortP2}`
            }
        } else if (password.length > maximum_password_length) {
            return {
                isValid: false,
                hasError: `${dictionary[this.props.languageFromMain].register.passworderror.longP1} 
                ${maximum_password_length} 
                ${dictionary[this.props.languageFromMain].register.passworderror.longP2}`
            }
        } else if (this.state.password.value !== password) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.passworderror.nomatch
            }            
        } else if (this.state.password.value === password) {
            return {
                isValid: true,
                hasError: null
            }
        }
    }

    handlePasswordValidationChange = (event, validation) => {
        var passwordValidationValue = event.target.value;
        this.setState({
            passwordValidation: {
                value: passwordValidationValue,
                valid: validation(passwordValidationValue).isValid,
                errormessage: validation(passwordValidationValue).hasError
            }
        })
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.emailerror.notvalid
            }
        }

        const email_regex = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!email_regex.test(email)) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.emailerror.notvalid
            }
        }

        if(email.length > maximum_email_length) {
            return {
                isValid: false,
                hasError : `${dictionary[this.props.languageFromMain].register.emailerror.longP1} 
                ${maximum_email_length} 
                ${dictionary[this.props.languageFromMain].register.emailerror.longP2}`
            }
        }

        return {
            isValid: true,
            hasError: null
        }
    }

    handleEmailChange = (event, validation) => {
        var emailValue = event.target.value;
        this.setState({
            email : {
                value : emailValue,
                valid: validation(emailValue).isValid,
                errormessage: validation(emailValue).hasError
            }
        })
    }
    
    handleRegister = (event) => {
        event.preventDefault();
        if (this.state.password.value === this.state.passwordValidation.value && this.state.password.value !== '') {
            const registerRequest = {
                name: this.state.name.value,
                email: this.state.email.value,
                username: this.state.username.value,
                password: this.state.password.value
            };
            register(registerRequest)
            .then(response => {
                this.setState({
                    notificationMessage: {
                        message: response.message
                    }
                })
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
                        this.setState({
                            notificationMessage: {
                                message: error.message
                            }
                        })             
                    } else {
                        this.setState({
                            notificationMessage: {
                                message: error.message
                            }
                        }) 
                    }
                });
            }).catch(error => {
                this.setState({
                    notificationMessage: {
                        message: error.message
                    }
                }) 
            });
        }
    }

    validateUsernameAvailability = () => {
        const usernameValue = this.state.username.value;

        if(usernameValue === '' || this.validateUsername(usernameValue).isValid === false) {
            this.setState({
                username: {
                    value: usernameValue,
                    valid: this.validateUsername(usernameValue).isValid,
                    errormessage: this.validateUsername(usernameValue).hasError
                }
            });
            return;
        }

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        valid: true,
                        errormessage: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        valid: false,
                        errormessage: dictionary[this.props.languageFromMain].register.usernameerror.notavailable
                    }
                });
            }
        }).catch(error => {
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: true,
                    errormessage: null
                }
            });
        });
    }

    validateEmailAvailability = () => {
        const emailValue = this.state.email.value;

        if(emailValue === '' || this.validateEmail(emailValue).isValid === false) {
            this.setState({
                email: {
                    value: emailValue,
                    valid: this.validateEmail(emailValue).isValid,
                    errormessage: this.validateEmail(emailValue).hasError
                }
            });    
            return;
        }

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        valid: true,
                        errormessage: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        valid: false,
                        errormessage: dictionary[this.props.languageFromMain].register.emailerror.notavailable
                    }
                });
            }
        }).catch(error => {
            this.setState({
                email: {
                    value: emailValue,
                    valid: true,
                    errormessage: null
                }
            });
        });
    }

    formValidator = () => {
        return !(
            this.state.name.valid === true && 
            this.state.username.valid === true && 
            this.state.email.valid === true && 
            this.state.password.valid === true &&
            this.state.passwordValidation.valid  === true )
    }

	render() {
        const nameValidator = (this.state.name.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.name.valid ? "is-valid" : "is-invalid")
        const userNameValidator = (this.state.username.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.username.valid ? "is-valid"  : "is-invalid")
        const passWordValidator = (this.state.password.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.password.valid ? "is-valid" : "is-invalid")
        const passWordConfirmation = (this.state.passwordValidation.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.passwordValidation.valid ? "is-valid" : "is-invalid")
        const emailValidator = (this.state.email.value === '') ? "form-control" : "form-control input-lg " + 
            (this.state.email.valid ? "is-valid " : "is-invalid")
		return (
			<div>
				<div className="top-gap">
					<div className="register-panel" data-testid='register-page'>
						    <form onSubmit={this.handleRegister} className="register-form">
                                <div>
                                    <input
                                        className={nameValidator}
                                        type="text" 
                                        value={this.state.name.value}
                                        placeholder={dictionary[this.props.languageFromMain].register.name} 
                                        onChange={(event) => this.handleNameChange(event, this.validateName)}
                                    />
                                    <div className="invalid-feedback">{this.state.name.errormessage}</div>
                                </div>
                                <div>
                                    <input
                                        className={userNameValidator}
                                        type="Username" 
                                        value={this.state.username.value}
                                        placeholder={dictionary[this.props.languageFromMain].register.username} 
                                        onBlur={this.validateUsernameAvailability} 
                                        onChange={(event) => this.handleUsernameChange(event, this.validateUsername)}
                                    />
                                    <div className="invalid-feedback">{this.state.username.errormessage}</div>
                                </div>
                                <div>
                                    <input
                                        className={passWordValidator}
                                        type="password" 
                                        value={this.state.password.value}
                                        placeholder={dictionary[this.props.languageFromMain].register.password} 
                                        onChange={(event) => this.handlePasswordChange(event, this.validatePassword)}
                                    />
                                    <div className="invalid-feedback">{this.state.password.errormessage}</div>
                                </div>
                                <div>
                                    <input
                                        className={passWordConfirmation}
                                        type="password" 
                                        value={this.state.passwordValidation.value}
                                        placeholder={dictionary[this.props.languageFromMain].register.passwordvalidation} 
                                        onChange={(event) => this.handlePasswordValidationChange(event, this.validatePasswordConfirmation)}
                                    />
                                    <div className="invalid-feedback">{this.state.passwordValidation.errormessage}</div>
                                </div>
                                <div>
                                    <input
                                        className={emailValidator}
                                        type="email"
                                        name="email"
                                        value={this.state.email.value}
                                        placeholder={dictionary[this.props.languageFromMain].register.email}
                                        onBlur={this.validateEmailAvailability} 
                                        onChange={(event) => this.handleEmailChange(event, this.validateEmail)}
                                    />
                                    <div className="invalid-feedback">{this.state.email.errormessage}</div>
                                </div>
                                <Button
                                    label={dictionary[this.props.languageFromMain].button.register}
                                    uiType='btn.lg'
                                    onClick={this.handleRegister}
                                    disabled={this.formValidator()}
                                    data-testid='registerButton'
                                />
							</form>
						</div>
                    <div className="bottom-gap"></div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;