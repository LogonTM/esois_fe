import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Layer from './layer';
import dictionary from '../../../../translations/dictionary';
import { pluck, prop, indexBy } from 'ramda';
import 'bootstrap';

class Corpus extends PureComponent {
	static propTypes = {
        languageFromMain: PropTypes.string.isRequired,
        corpus: PropTypes.object.isRequired
    }

    layersById = indexBy(prop('id'), this.props.corpus.endpoint.layers);
    // array of current layerIDs
    layerIDs = pluck('id')(this.props.corpus.endpoint.layers);

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
                                value={this.props.corpus.endpoint.url}
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