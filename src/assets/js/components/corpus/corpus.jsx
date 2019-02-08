import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '../../utilities/button';
import Layer from './layer';
import dictionary from '../../../../translations/dictionary';
import { removeCenter } from '../../utilities/functions';
import { pluck, prop, indexBy } from 'ramda';
import 'bootstrap';
import { back_end_host, authentication_token } from '../../constants/constants';
import readFile from '../../utilities/readfile';

class Corpus extends PureComponent {
	static propTypes = {
        languageFromMain: PropTypes.string.isRequired,
        corpus: PropTypes.object.isRequired
    }

    layersById = indexBy(prop('id'), this.props.corpus.endpoint.layers);
    // array of current layerIDs
    layerIDs = pluck('id')(this.props.corpus.endpoint.layers);

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            xml: "",
            isUploaded: false
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.file !== this.state.file) {
            readFile(this.state.file).then(xml => this.setState({ xml }));
        }
    
        if (prevState.isUploaded !== this.state.isUploaded) {
            alert(dictionary[this.props.languageFromMain].center.edit.success);
        }
    }

    handleFileChange = ({ target: { files } }) =>
        this.setState({ file: files[0] });

    handleSendFile = () => {
        const headers = {
            'Content-Type': 'text/xml',
        }

        const token = localStorage.getItem(authentication_token);

        if(token) {
            headers.Authorization = `Bearer ${token}`;
        }

        fetch(back_end_host + 'endpoint/upload', {
            headers,
            method: 'POST',
            body: this.state.xml
        }).then(response => {
            this.setState({ isUploaded: response.status === 200 });
            }
        )
    }

    deleteCorpus = () => {
		if (window.confirm(dictionary[this.props.languageFromMain].center.delete.confirm)) {
			removeCenter(this.props.corpus.id)
			.then(response => { 
				if(response) {
					alert(dictionary[this.props.languageFromMain].center.delete.success);
					this.getCenterList();
				} 
			}).catch(error => {
				alert(dictionary[this.props.languageFromMain].center.delete.success);
			})
		}
	}

    render() {
        return (
            <div id="container">
                <form>
                    <div className="input-group row addcorp" id="inputFileRow">
                        
                        <div className="col-5 align-right" style={{marginRight:10}}>
                            
                            <a href={`${back_end_host}endpoint/${this.props.corpus.id}/download`}>
                                <Button
                                    label={dictionary[this.props.languageFromMain].button.download}
                                    style={{marginRight:1}}
                                />
                            </a>
                            {` `}
                            <Button
                                label={dictionary[this.props.languageFromMain].button.delete}
                                onClick={this.deleteCorpus}
                                style={{marginRight:1}}
                            />
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="url">URL</label>
                        </div>
                        <div className="col-sm-8">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="url"
                                id="url"
                                value={this.props.corpus.endpoint.url}
                                placeholder="http"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="protocol">
                                {dictionary[this.props.languageFromMain].center.protocol}
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="protocol"
                                id="protocol"
                                value={this.props.corpus.endpoint.protocol}
                                readOnly
                            />
                        </div>
                    </div>
                    { this.layerIDs.map(id => {
                        return (
                            <Layer 
                                languageFromMain={this.props.languageFromMain}
                                layer={this.layersById[id]}
                                key={id}
                            />
                        );
                     })
                    }
                </form>
            </div>
        );
    }
}

export default Corpus;