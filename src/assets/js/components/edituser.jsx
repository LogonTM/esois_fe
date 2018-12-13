import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

class EditUser extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string,
        getUserList: PropTypes.func,
        handleAccountState: PropTypes.func,
        handleChange: PropTypes.func,
        oneUserId: PropTypes.number,
        oneUserName: PropTypes.string,
        oneUserEmail: PropTypes.string,
        oneUserAccountstate: PropTypes.bool
    }

    handleEdit = () => {
        fetch(back_end_host + 'db/user/update', {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.oneUserId,
                enabled: this.props.oneUserAccountstate
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            console.log(response)
            if(response.status === 200) {
                alert(dictionary[this.props.languageFromMain].edituser.userIsUpdated);
            }
        }).then(this.props.getUserList)
    }

    render() {
        return (
            <div id="container">
                <form>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="name">
                                {dictionary[this.props.languageFromMain].edituser.name}
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
                                {dictionary[this.props.languageFromMain].edituser.accountstate}
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="oneUserEnabled"
                                id="enabled"
                                value={dictionary[this.props.languageFromMain].manageuser.enabled[this.props.oneUserAccountstate]}
                                readOnly
                            />
                        </div>
                        <div className="col-sm-3">
                            <Button
                                label={dictionary[this.props.languageFromMain].common.edit}
                                onClick={e => this.props.handleAccountState(e, this.props.oneUserAccountstate)}
                            />
                        </div>
                    </div>
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].common.save}
                            onClick={this.handleEdit}
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default EditUser;