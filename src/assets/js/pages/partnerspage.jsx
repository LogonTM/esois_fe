import React, { Component } from 'react';
import { 
    minimum_name_length, maximum_name_length,
    minimum_username_length, maximum_username_length,
    minimum_password_length, maximum_password_length,
    maximum_email_length
} from '../constants/constants';
import { login } from '../utilities/functions';
import { authentication_token } from '../constants/constants';
import { register, getPartnersList, checkUsernameAvailability, checkEmailAvailability } from '../utilities/functions';
import PropTypes from 'prop-types';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import SearchCorpusBox from '../components/searchcorpusbox';
import { TableHeaderRow } from '../constants/admintable';
import EditUser from '../components/edituser.jsx'
import Modal from '../components/modal.jsx';


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
		        partners: [{id:"P001", name:"Esimene Partner", link:"www.test.ee/api", username: "User name", password:"passw"}],
		        id: {
	                value: '',
	                valid: false,
	                errormessage: null
	            },
	            name: {
                value: '',
                valid: false,
                errormessage: null
            },
            link: {
                value: '',
                valid: false,
                errormessage: null
            },
            username: {
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
                hasError: dictionary[this.props.languageFromMain].register.nameerrortooshortP1 + " " + minimum_name_length + " " + 
                          dictionary[this.props.languageFromMain].register.nameerrortooshortP2
            }
        } else if (name.length > maximum_name_length) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.nameerrortooshortP1 + " " + minimum_name_length + " " + 
                          dictionary[this.props.languageFromMain].register.nameerrortooshortP2
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
                hasError: dictionary[this.props.languageFromMain].register.usernameerrortooshortP1 + " " + minimum_username_length + " " + 
                          dictionary[this.props.languageFromMain].register.usernameerrortooshortP2
            }
        } else if (username.length > maximum_name_length) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.usernameerrortooshortP1 + " " + maximum_username_length + " " + 
                          dictionary[this.props.languageFromMain].register.usernameerrortooshortP2
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
                hasError : dictionary[this.props.languageFromMain].register.passworderrortooshortP1 + " " + minimum_password_length + " " + 
                           dictionary[this.props.languageFromMain].register.passworderrortooshortP2
            }
        } else if (password.length > maximum_password_length) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.passworderrortoolongP1 + " " + maximum_password_length + " " + 
                          dictionary[this.props.languageFromMain].register.passworderrortoolongP2
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
                hasError : dictionary[this.props.languageFromMain].register.passworderrortooshortP1 + " " + minimum_password_length + " " + 
                           dictionary[this.props.languageFromMain].register.passworderrortooshortP2
            }
        } else if (password.length > maximum_password_length) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.passworderrortoolongP1 + " " + maximum_password_length + " " + 
                          dictionary[this.props.languageFromMain].register.passworderrortoolongP2
            }
        } else if (this.state.password.value !== password) {
            return {
                isValid: false,
                hasError: dictionary[this.props.languageFromMain].register.passworderrornomatch
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


        

    
    
    handleRegister = (event) => {
        event.preventDefault();
        if (this.state.password.value === this.state.passwordValidation.value && this.state.password.value !== '') {
            const registerRequest = {
                id: this.state.id.value,
                name: this.state.name.value,
                link: this.state.link.value,
                username: this.state.username.value,
                password: this.state.password.value
            };
            console.log(JSON.stringify(registerRequest))
            register(registerRequest)
            .then(response => {
                // Fix here Bootstrap notification for succesfull registration and therefore pending log in?
                this.setState({
                    notificationMessage: {
                        message: response.message
                    }
                })               
            }).catch(error => {
                // Fix here Bootstrap failure notification for server side registration?
                this.setState({
                    notificationMessage: {
                        message: error.message
                    }
                }) 
            });
        }
    }

    getList = () => {
        getPartnersList()
        .then(response => response.json())
        .then(result => {
            this.setState({
                users: result
            });
        });
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
                        errormessage: dictionary[this.props.languageFromMain].register.usernameavailableerror
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



    formValidator = () => {
        return !(
            this.state.name.valid === true && 
            this.state.username.valid === true && 
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
       return (
               <div id='container'>
               <div className='top-gap'></div>
               <div id='searchBox'>
                   <SearchCorpusBox
                       search={this.searchUser}
                       placeholder={dictionary[this.props.languageFromMain].common.search}
                   />
               </div>
               <table className='table table-striped'>
                   <thead className='thead-blue'>
                       <tr>
                           <TableHeaderRow headers={dictionary[this.props.languageFromMain].partner.manage.headers} />
                           <th>
                               {dictionary[this.props.languageFromMain].common.actions}
                           </th>
                       </tr>
                   </thead>
                   <tbody id='userList'>
                       {
                           this.state.partners.map((item, key) => {
                               return (
                                   <tr key = {key}>
                                       <td>{item.id}</td>
                                       <td>{item.name}</td>
                                       <td>{item.link}</td>
                                       <td>{item.username}</td>
                                       <td>{item.password}</td>
                                       <td>
                                           <Button
                                               label={dictionary[this.props.languageFromMain].common.edit}
                                               onClick={e => this.toggleEdit(e, item.id, item.name, item.email, item.enabled)}
                                           /> <Button
                                               label={dictionary[this.props.languageFromMain].common.delete}
                                               onClick={e => this.toggleEdit(e, item.id, item.name, item.email, item.enabled)}
                                           />
                                       </td>
                                   </tr>
                               )
                           })
                       }
                   </tbody>
               </table>
               <div className='bottom-gap'></div>

               <Modal
                   ref='editUserModal'
                   title={
                       <span>
                           {dictionary[this.props.languageFromMain].manageuser.editUserData}
                       </span>
                   }
                   languageFromMain={this.props.languageFromMain}
               >
                   <EditUser 
                       languageFromMain={this.props.languageFromMain}
                       getUserList={this.getUserList}
                       oneUserId={this.state.oneUserId}
                       oneUserName={this.state.oneUserName}
                       oneUserEmail={this.state.oneUserEmail}
                       oneUserAccountstate={this.state.oneUserAccountstate}
                       handleChange={this.handleChange}
                       handleAccountState={this.handleAccountState}
                   />              
               </Modal>          
				<div className="top-gap">
					<div className="register-panel">
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
                                
                                <Button
                                    label={dictionary[this.props.languageFromMain].loginpage.registerButton}
                                    uiType='btn.lg'
                                    onClick={this.handleRegister}
                                    disabled={this.formValidator()}
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