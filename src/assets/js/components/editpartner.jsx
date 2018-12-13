import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

class EditPartner extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
        getCenterList: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        oneCenterId: PropTypes.string.isRequired,
        oneCenterName: PropTypes.string.isRequired,
        partnerID: PropTypes.string,
        partnerName: PropTypes.string,
        APIUrl: PropTypes.string,
        APIUsername: PropTypes.string,
        APIPassword: PropTypes.string
    }
    
    handleEdit = () => {
        fetch(back_end_host + 'partner', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.props.partnerID,
                name: this.props.partnerName,
                link: this.props.APIUrl,
                user: this.props.APIUsername,
                password: this.props.APIPassword
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            console.log(response)
            if(response.status === 200) {
                alert(dictionary[this.props.languageFromMain].editcenter.corpusIsUpdated);
            }
        }).then(this.props.getCenterList)
    }

    render() {
        // const disableButton = this.props.oneCenterId && this.props.oneCenterName && this.props.oneCenterLink
        // const nameValidator = "form-control input-lg " /*(this.props.oneCenterName.length > 3 ? "is-valid" : "is-invalid")*/
        // const linkValidator = "form-control input-lg " /*(this.props.oneCenterLink !== ('' || 'http') && this.props.oneCenterLink.startsWith('http') ? "is-valid" : "is-invalid")*/
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
                                className="form-control input-lg"
                                type="text"
                                name="id"
                                id="id"
                                value={this.props.partnerID}
                                readOnly
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
                                className="form-control input-lg "
                                type="text"
                                name="name"
                                id="name"
                                value={this.props.partnerName}
                                onChange={this.props.handleChange}
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
                                className="form-control input-lg "
                                type="text"
                                name="link"
                                id="link"
                                value={this.props.APIUrl}
                                onChange={this.props.handleChange}
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
                                className="form-control input-lg"
                                type="text"
                                name="user"
                                id="user"
                                value={this.props.APIUsername}
                                onChange={this.props.handleChange}
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
                                value={this.props.APIPassword}
                                onChange={this.props.handleChange}
                                placeholder='API Salasõna'
                            />
                            {/* <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].partner.add.enterAPIpassword}
                            </div> */}
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

export default EditPartner;