import PropTypes from "prop-types";
import React, { Component } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

class AddPartner extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
        getCenterList: PropTypes.func.isRequired
	}

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            link: '',
            user: '',
            password: ''
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
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

    handleAdd = () => {
        console.log("About to send values: " + JSON.stringify({
            name: this.state.name,
            link: this.state.link,
            username: this.state.user,
            password: this.state.password
        }))
        fetch(back_end_host + 'partner', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                link: this.state.link,
                username: this.state.user,
                password: this.state.password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                alert(dictionary[this.props.languageFromMain].addcenter.newCorpusAddedSuccess);
                this.setState({
                    id: '',
                    name: '',
                    link: '',
                    user: '',
                    password: ''
                });
            } else if (response.status === 409) {
                alert(dictionary[this.props.languageFromMain].addcenter.thisIdExists)
            } else {
                alert(dictionary[this.props.languageFromMain].addcenter.pleaseCheckData);
            }
        }).then(this.props.getCenterList)
    }

    render() {
        // const disableButton = this.state.id && this.state.centerName && this.state.link !== ('' || 'http')
        // const idValidator = "form-control input-lg " + (this.state.id.length > 3 ? "is-valid" : "is-invalid")
        // const nameValidator = "form-control input-lg " + (this.state.centerName.length > 3 ? "is-valid" : "is-invalid")
        // const linkValidator = "form-control input-lg " + (this.state.link !== ('' || 'http') && this.state.link.startsWith('http') ? "is-valid" : "is-invalid")
        return (
            <div id="container">
                <form>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="Partner_id">
                            {dictionary[this.props.languageFromMain].partner.add.partnerId}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg "
                                type="text"
                                name="id"
                                id="id"
                                value={this.state.id}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].partner.add.partnerId}
                                // readOnly
                            />
                            {/* <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterId}
                            </div> */}
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="Partner_name">
                                {dictionary[this.props.languageFromMain].partner.add.partnerName}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg "
                                type="text"
                                name="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].partner.add.partnerName}

                            />
                            {/* <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterName}
                            </div> */}
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="url">{dictionary[this.props.languageFromMain].partner.add.partnerAPIurl}</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="link"
                                id="link"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder="API URL"
                            />
                            {/* <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIurl}
                            </div> */}
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="API_user">
                                {dictionary[this.props.languageFromMain].partner.add.partnerAPIuser}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg "
                                type="text"
                                name="user"
                                id="user"
                                value={this.state.user}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].partner.add.partnerAPIuser}

                            />
                            {/* <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIuser}
                            </div> */}
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="APIpassword">{dictionary[this.props.languageFromMain].partner.add.partnerAPIpassword}</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg "
                                type="password"
                                name="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder='API Salasõna'
                            />
                            {/* <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIpassword}
                            </div> */}
                        </div>
                    </div>
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].common.add}
                            onClick={this.handleAdd}
                            data-dismiss='modal'
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default AddPartner;