import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Layer from './layer';
import dictionary from '../../../../translations/dictionary';
import 'bootstrap';

class Corpus extends PureComponent {
	static propTypes = {
        languageFromMain: PropTypes.string.isRequired,
        endpoint: PropTypes.object.isRequired
    }

    render() {
        return (
            <div id="container">
                <form>
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
                                value={this.props.endpoint.url}
                                placeholder="http"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row addcorp">
                        <div className="col-sm-2 align-right">
                            <label htmlFor="protocol">
                                {dictionary[this.props.languageFromMain].corpus.protocol}
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control input-lg"
                                type="text"
                                name="protocol"
                                id="protocol"
                                value={this.props.endpoint.protocol}
                                readOnly
                            />
                        </div>
                    </div>
                    { this.props.endpoint.layers.map(layer => {
                        return (
                            <Layer 
                                languageFromMain={this.props.languageFromMain}
                                layer={layer}
                                key={layer.id}
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