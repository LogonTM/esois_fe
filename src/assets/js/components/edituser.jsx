import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import { updateUser, getUserRoles } from '../utilities/functions';

class EditUser extends PureComponent {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
        getUserList: PropTypes.func.isRequired,
        handleAccountState: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        oneUserId: PropTypes.number.isRequired,
        oneUserName: PropTypes.string.isRequired,
        oneUserEmail: PropTypes.string.isRequired,
        oneUserAccountstate: PropTypes.bool.isRequired,
        oneUserRole: PropTypes.array.isRequired,
        availableRoles: PropTypes.array.isRequired
    }

    constructor(props) {
		super(props);
		this.state = {
            hasRoleUser: '',
            hasRoleAdmin: '',
            newRoleAdmin: '',
            newRoleUser: '',
            lastClicked: ''
        }  
    }

    componentDidUpdate() {
        this.hasRoleValidation();        
    }

    handleEdit = () => {
        const userUpdateData = {
            id: this.props.oneUserId,
            enabled: this.props.oneUserAccountstate,
            roles: this.saveRole()
        }
        updateUser(userUpdateData)
        .then(response => {
            if(response) {
                alert(dictionary[this.props.languageFromMain].user.edit.success);
            }
        }).catch(error => {
            // console.log(error)
        }).then(this.props.getUserList)
    }

    hasRoleValidation = () => {
        this.setState({
            hasRoleUser: '',
            hasRoleAdmin: ''
        })
		for(let value in this.props.availableRoles) {           
            if(this.props.oneUserRole.length > 0 && value < this.props.oneUserRole.length){
                if(this.props.oneUserRole[value].name === 'ROLE_USER') {
                    this.setState({
                        hasRoleUser: 'ROLE_USER'
                    })
                }
                if (this.props.oneUserRole[value].name === 'ROLE_ADMIN') {
                    this.setState({
                        hasRoleAdmin: 'ROLE_ADMIN'
                    })
                }              
            } 
        }
    }

    roleChecker = role => {
        if(role === this.state.hasRoleUser){
            return "form-control input-lg is-valid"
        }
        if (role === this.state.hasRoleAdmin) {
            return "form-control input-lg is-valid"
        } else {
            return "form-control input-lg is-invalid"
        }
    }

    saveRole = () => {
        var data = null
        if(this.state.newRoleAdmin === 'ROLE_ADMIN' && this.state.newRoleUser === 'ROLE_USER') {
            data = [{
                id: 1,
                name: 'ROLE_USER'
            },
            {
                id: 2,
                name: 'ROLE_ADMIN'
            }]
            return data;
        } else if (this.state.newRoleAdmin === 'ROLE_ADMIN' && this.state.newRoleUser === '') {
            data = [{
                id: 2,
                name: 'ROLE_ADMIN'
            }]
            return data;
        } else if (this.state.newRoleAdmin === '' && this.state.newRoleUser === 'ROLE_USER') {
            data = [{
                id: 1,
                name: 'ROLE_USER'
            }]
            return data;
        }
    }

    handleRoleChange = (e, role) => {
        this.setState({
            lastClicked: role
        })
        e.preventDefault();
        if(role === this.state.hasRoleAdmin) {
            this.setState({
                newRoleAdmin: ''
            })
            if(this.state.hasRoleUser === 'ROLE_USER' && this.state.lastClicked !== 'ROLE_USER') {
                this.setState({
                    newRoleUser: 'ROLE_USER'
                })
            }
        } else if (role === this.state.hasRoleUser) {
            this.setState({
                newRoleUser: ''
            })
            if(this.state.hasRoleAdmin === 'ROLE_ADMIN' && this.state.lastClicked !== 'ROLE_ADMIN') {
                this.setState({
                    newRoleAdmin: 'ROLE_ADMIN'
                })
            }
        }
        if(role === 'ROLE_ADMIN' && this.state.hasRoleAdmin === '') {
            this.setState({
                newRoleAdmin: 'ROLE_ADMIN'
            })
            if (this.state.hasRoleUser === 'ROLE_USER' && this.state.lastClicked !== 'ROLE_USER') {
                this.setState({
                    newRoleUser: 'ROLE_USER'
                })
            }
        } else if(role ==='ROLE_USER' && this.state.hasRoleUser === '') {
            this.setState({
                newRoleUser: 'ROLE_USER'
            })
            if (this.state.hasRoleAdmin === 'ROLE_ADMIN' && this.state.lastClicked !== 'ROLE_ADMIN') {
                this.setState({
                    newRoleAdmin: 'ROLE_ADMIN'
                })
            }
        }
    }

    render() {
        return (
            <div id="container">
                <form>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="name">
                                {dictionary[this.props.languageFromMain].user.headers[0].label}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="oneUserName"
                                id="name"
                                value={this.props.oneUserName}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="oneUserEmail"
                                id="email"
                                value={this.props.oneUserEmail}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="enabled">
                                {dictionary[this.props.languageFromMain].user.edit.accountstate}
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="oneUserEnabled"
                                id="enabled"
                                value={dictionary[this.props.languageFromMain].user.manage.enabled[this.props.oneUserAccountstate]}
                                readOnly
                            />
                        </div>
                        <div className="col-sm-3">
                            <Button
                                label={dictionary[this.props.languageFromMain].button.edit}
                                onClick={e => this.props.handleAccountState(e, this.props.oneUserAccountstate)}
                            />
                        </div>
                    </div>
                    {this.props.availableRoles.map((role, key) => 
                    <div key={key} className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="role">
                                {dictionary[this.props.languageFromMain].user.edit.role}
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <input
                                className={this.roleChecker(role.name)}
                                type="text"
                                name="oneUserRole"
                                id="role"
                                value={dictionary[this.props.languageFromMain].user.manage.role[role.name]}
                                readOnly
                            />
                        </div>
                        <div className="col-sm-3">
                            <Button
                                label={dictionary[this.props.languageFromMain].button.edit}
                                onClick={e => this.handleRoleChange(e, role.name)}
                            />
                        </div>
                    </div>
                    )}
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].button.save}
                            onClick={this.handleEdit}
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default EditUser;