import PropTypes from "prop-types";
import React, { Component, PureComponent } from 'react';
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import { addCenter } from '../utilities/functions';

class AddCenter extends PureComponent {
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
        const centerAddData = {
                id: this.state.id,
                centerName: this.state.centerName,
                link: this.state.link
            }
        addCenter(centerAddData)
        .then(response => {
            if(response) {
                alert(dictionary[this.props.languageFromMain].center.add.success);
                this.setState({
                    id: '',
                    centerName: '',
                    link: ''
                });
            }
        }).catch(error => {
            this.setState({
                id: '',
                centerName: '',
                link: ''
            });
            alert(dictionary[this.props.languageFromMain].center.add.success);
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
                            <label htmlFor="Center_id">
                                {dictionary[this.props.languageFromMain].center.common.id}
                            </label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="id"
                                id="Center_id"
                                value={this.state.id}
                                onChange={this.handleChange}
                                placeholder={dictionary[this.props.languageFromMain].center.common.id}
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].center.add.enterId}
                            </div>
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
                                className="form-control input-lg"
                                type="text"
                                name="centerName"
                                id="Center_name"
                                value={this.state.centerName}
                                onChange={this.handleChange}
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
                                className="form-control input-lg"
                                type="text"
                                name="link"
                                id="Center_url"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder="http"
                            />
                            <div className="invalid-feedback">
                                {dictionary[this.props.languageFromMain].center.common.enterLink}
                            </div>
                        </div>
                    </div>
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].button.add}
                            onClick={this.handleAdd}
                            // disabled={!disableButton}
                            data-dismiss='modal'
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default AddCenter;