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
        oneCenterName: PropTypes.string.isRequired
    }
    
    handleEdit = () => {
        fetch(back_end_host + 'db/center/update', {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.oneCenterId,
                centerName: this.props.oneCenterName,
                link: this.props.oneCenterLink
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
        const disableButton = this.props.oneCenterId && this.props.oneCenterName && this.props.oneCenterLink
        const nameValidator = "form-control input-lg " /*(this.props.oneCenterName.length > 3 ? "is-valid" : "is-invalid")*/
        const linkValidator = "form-control input-lg " /*(this.props.oneCenterLink !== ('' || 'http') && this.props.oneCenterLink.startsWith('http') ? "is-valid" : "is-invalid")*/
        return (
            <div id="container">
                <form>
                    {/* <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                        <label htmlFor="Center_id">
                                {dictionary[this.props.languageFromMain].common.corpusId}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="oneCenterId"
                                id="Center_id"
                                value={this.props.oneCenterId}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="Center_name">
                                {dictionary[this.props.languageFromMain].common.corpusName}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className={nameValidator}
                                type="text"
                                name="oneCenterName"
                                id="Center_name"
                                value={this.props.oneCenterName}
                                onChange={this.props.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].common.corpusName}
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].common.enterCorpusName}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="url">URL</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className={linkValidator}
                                type="text"
                                name="oneCenterLink"
                                id="Center_url"
                                value={this.props.oneCenterLink}
                                onChange={this.props.handleChange}
                                placeholder="http"
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].common.enterCorpusLink}
                            </div>
                        </div>
                    </div> */}
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
                                id="Partner_id"
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
                                className={nameValidator}
                                type="text"
                                name="partnerName"
                                id="Partner_name"
                                value={this.props.partnerName}
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
                                value={this.props.APIUrl}
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
                                value={this.props.APIUsername}
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
                                value={this.props.APIPassword}
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
                            label={dictionary[this.props.languageFromMain].common.save}
                            onClick={this.handleEdit}
                            disabled={!disableButton}
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default EditPartner;