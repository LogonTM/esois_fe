import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '../../utilities/button';
import Layer from './layer';
import dictionary from '../../../../translations/dictionary';
import { updateCenter } from '../../utilities/functions';
import { pluck, prop, indexBy } from 'ramda';

class Corpus extends PureComponent {
	static propTypes = {
        languageFromMain: PropTypes.string.isRequired,
        corpus: PropTypes.object.isRequired
    }

    layersById = indexBy(prop('id'), this.props.corpus.endpoint.layers);
    // array of current layerIDs
    layerIDs = pluck('id')(this.props.corpus.endpoint.layers);

    handleEdit = () => {
        const centerUpdateData = {
            id: this.props.oneCenterId,
            centerName: this.props.oneCenterName,
            link: this.props.oneCenterLink
        }
        updateCenter(centerUpdateData)
        .then(response => {
            if(response) {
                alert(dictionary[this.props.languageFromMain].center.edit.success);
            }
        }).catch(error => {
            alert(dictionary[this.props.languageFromMain].center.edit.success);
        }).then(this.props.getCenterList)
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
                    <p className='align-right'>
                        <Button
                            label={dictionary[this.props.languageFromMain].button.download}
                            onClick={this.handleEdit}
                            style={{marginRight:1}}
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default Corpus;