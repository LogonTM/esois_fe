import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import { updateUser } from '../utilities/functions';

class EditUser extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
        getUserList: PropTypes.func.isRequired,
        handleAccountState: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        oneUserId: PropTypes.number.isRequired,
        oneUserName: PropTypes.string.isRequired,
        oneUserEmail: PropTypes.string.isRequired,
        oneUserAccountstate: PropTypes.bool.isRequired
    }

    handleEdit = () => {
        const userUpdateData = {
            id: this.props.oneUserId,
            enabled: this.props.oneUserAccountstate
        }
        updateUser(userUpdateData)
        .then(response => {
            if(response) {
                alert(dictionary[this.props.languageFromMain].edituser.userIsUpdated);
            }
        }).catch(error => {
            // console.log(error)
        }).then(this.props.getUserList)
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