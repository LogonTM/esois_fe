import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
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
        const nameValidator = "form-control input-lg " + (this.props.oneCenterName.length > 3 ? "is-valid" : "is-invalid")
        const linkValidator = "form-control input-lg " + (this.props.oneCenterLink !== ('' || 'http') && this.props.oneCenterLink.startsWith('http') ? "is-valid" : "is-invalid")
        return (
            <div id="container">
                <form>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2">
                            <label htmlFor="Center_id">
                                {dictionary[this.props.languageFromMain].editcenter.corpusId}

                            </label>
                        </div>
                        <div className="col-sm-10">
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
                        <div className="col-sm-2">
                            <label htmlFor="Center_name">
                                <FormattedMessage
                                    id='corpusName'
                                    description='corpus name translation'
                                    defaultMessage="Corpus' name"
                                />
                            </label>
                        </div>
                        <div className="col-sm-10">
                            <input
                                className={nameValidator}
                                type="text"
                                name="oneCenterName"
                                id="Center_name"
                                value={this.props.oneCenterName}
                                onChange={this.props.handleChange}
                                placeholder="Korpuse nimi"
                            />
                            <div className="invalid-feedback">
                                Sisesta korpuse nimi
                            </div>
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2">
                            <label htmlFor="url">URL</label>
                        </div>
                        <div className="col-sm-10">
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
                                Sisesta korpuse URL
                            </div>
                        </div>
                    </div>
                    <p>
                        <Button label='Salvesta' onClick={this.handleEdit} disabled={!disableButton}/>
                        <button
                            type='button'
                            className="btn btn-outline-secondary"
                            onClick={this.handleEdit}
                            disabled={!disableButton}
                        >
                            <FormattedMessage
                                id='save'
                                description='save translation'
                                defaultMessage='Save'
                            />
                        </button>
                    </p>
                </form>
            </div>
        );
    }
}

export default EditCenter;