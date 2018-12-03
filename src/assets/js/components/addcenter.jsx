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
                            <label htmlFor="Center_id">
                            {dictionary[this.props.languageFromMain].common.corpusId}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className={idValidator}
                                type="text"
                                name="id"
                                id="Center_id"
                                value={this.state.id}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].common.corpusId}
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].addcenter.enterCorpusId}
                            </div>
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
                                name="centerName"
                                id="Center_name"
                                value={this.state.centerName}
                                onChange={this.handleChange}
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
                                name="link"
                                id="Center_url"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder="http"
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].common.enterCorpusLink}
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