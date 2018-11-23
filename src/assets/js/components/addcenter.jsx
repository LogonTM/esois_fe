import PropTypes from "prop-types";
import React, { Component } from 'react';
import {FormattedMessage } from 'react-intl';
import { back_end_host } from '../constants/constants';

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
                alert("Uus korpus on edukalt lisatud");
                this.setState({
                    id: '',
                    centerName: '',
                    link: ''
                });
            } else if (response.status === 409) {
                alert("Sellise ID-ga korpus on juba olemas")
            } else {
                alert("Palun kontrolli sisestatud andmete õigsust");
            }
        }).then(this.props.getCenterList)
    }

    render() {
        const buttonEnabler = this.state.id && this.state.centerName && this.state.link !== ('' || 'http')
        const idValidator = "form-control input-lg " + (this.state.id.length > 3 ? "is-valid" : "is-invalid")
        const nameValidator = "form-control input-lg " + (this.state.centerName.length > 3 ? "is-valid" : "is-invalid")
        const linkValidator = "form-control input-lg " + (this.state.link !== ('' || 'http') && this.state.link.startsWith('http') ? "is-valid" : "is-invalid")
        console.log(buttonEnabler)
        return (
            <div id="container">
                <form>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2">
                            <label htmlFor="Center_id">
                                <FormattedMessage
                                    id='corpusId'
                                    description='corpus ID translation'
                                    defaultMessage="Corpus' ID"
                                />
                            </label>
                        </div>
                        <div className="col-sm-10">
                            <input
                                className={idValidator}
                                type="text"
                                name="id"
                                id="Center_id"
                                value={this.state.id}
                                onChange={this.handleChange}
                                placeholder="Korpuse ID"
                            />
                            <div className="invalid-feedback">
                                Sisesta korpuse ID
                            </div>
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
                                name="centerName"
                                id="Center_name"
                                value={this.state.centerName}
                                onChange={this.handleChange}
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
                                name="link"
                                id="Center_url"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder="http"
                            />
                            <div className="invalid-feedback">
                                Sisesta korpuse URL
                            </div>
                        </div>
                    </div>
                    <p>
                        <button
                            type='button'
                            className="btn btn-outline-secondary"
                            onClick={this.handleAdd}
                            disabled={!buttonEnabler}
                            data-dismiss='modal'
                        >
                            <FormattedMessage
                                id='add'
                                description='add translation'
                                defaultMessage='Add'
                            />
                        </button>
                    </p>
                </form>
            </div>
        );
    }
}

export default AddCenter;