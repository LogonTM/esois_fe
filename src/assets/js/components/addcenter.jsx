import PropTypes from "prop-types";
import React, { Component } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

class AddCenter extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
        getCenterList: PropTypes.func.isRequired
	}

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            centerName: '',
            link: ''
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    handleAdd = () => {
        fetch(back_end_host + 'db/center/add', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.id,
                centerName: this.state.centerName,
                link: this.state.link
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
                    centerName: '',
                    link: ''
                });
            } else if (response.status === 409) {
                alert(dictionary[this.props.languageFromMain].addcenter.thisIdExists)
            } else {
                alert(dictionary[this.props.languageFromMain].addcenter.pleaseCheckData);
            }
        }).then(this.props.getCenterList)
    }

    render() {
        const disableButton = this.state.id && this.state.centerName && this.state.link !== ('' || 'http')
        const idValidator = "form-control input-lg " + (this.state.id.length > 3 ? "is-valid" : "is-invalid")
        const nameValidator = "form-control input-lg " + (this.state.centerName.length > 3 ? "is-valid" : "is-invalid")
        const linkValidator = "form-control input-lg " + (this.state.link !== ('' || 'http') && this.state.link.startsWith('http') ? "is-valid" : "is-invalid")
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
                                className={idValidator}
                                type="text"
                                name="id"
                                id="Partner_id"
                                value={this.state.id}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].partner.add.partnerId}
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterId}
                            </div>
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
                                className={nameValidator}
                                type="text"
                                name="partnerName"
                                id="Partner_name"
                                value={this.state.centerName}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].partner.add.partnerName}

                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterName}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="url">{dictionary[this.props.languageFromMain].partner.add.partnerAPIurl}</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className={linkValidator} 
                                type="text"
                                name="link"
                                id="API_url"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder="API URL"
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIurl}
                            </div>
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
                                className={nameValidator}
                                type="text"
                                name="APIUser"
                                id="API_user"
                                value={this.state.centerName}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].partner.add.partnerAPIuser}

                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIuser}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="APIpassword">{dictionary[this.props.languageFromMain].partner.add.partnerAPIpassword}</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className={linkValidator} 
                                type="password"
                                name="APIpassword"
                                id="API_password"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder='API Salasõna'
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIpassword}
                            </div>
                        </div>
                    </div>
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].common.add}
                            onClick={this.handleAdd}
                            disabled={!disableButton}
                            data-dismiss='modal'
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default AddCenter;