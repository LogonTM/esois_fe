import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

class EditCenter extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
        getCenterList: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        oneCenterId: PropTypes.string.isRequired,
        oneCenterName: PropTypes.string.isRequired
    }
    
    handleEdit = () => {
        fetch(back_end_host + 'db/center/', {
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
                alert(dictionary[this.props.languageFromMain].center.edit.success);
            }
        }).then(this.props.getCenterList)
    }

    render() {
        const disableButton = this.props.oneCenterId && this.props.oneCenterName && this.props.oneCenterLink
        const nameValidator = "form-control input-lg " + (this.props.oneCenterName.length > 3 ? "is-valid" : "is-invalid")
        const linkValidator = "form-control input-lg " + (this.props.oneCenterLink !== ('' || 'http') && this.props.oneCenterLink.startsWith('http') ? "is-valid" : "is-invalid")
        return (
            <div id="container">
                <form>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                        <label htmlFor="Center_id">
                                {dictionary[this.props.languageFromMain].center.common.id}
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
                                {dictionary[this.props.languageFromMain].center.common.name}
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
                                placeholder={dictionary[this.props.languageFromMain].center.common.name}
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].center.common.enterName}
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
                                {dictionary[this.props.languageFromMain].center.common.enterLink}
                            </div>
                        </div>
                    </div>
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].button.save}
                            onClick={this.handleEdit}
                            disabled={!disableButton}
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default EditCenter;