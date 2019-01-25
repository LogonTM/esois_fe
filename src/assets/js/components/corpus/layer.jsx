import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dictionary from '../../../../translations/dictionary';
import { layerOperators } from '../../utilities/layers';
import ValOpts from './valopts';
import { pluck, prop, indexBy } from 'ramda';

class Layer extends Component {
   static propTypes = {
      languageFromMain: PropTypes.string.isRequired,
      layer: PropTypes.object.isRequired
   }

   valOptsById = indexBy(prop('id'), this.props.layer.valueOptions);
   valOptsIDs = pluck('id')(this.props.layer.valueOptions);

   renderLayerOperators = (operator) => {
      return (
         <div className="form-check" key={operator}>
            <input
               className="form-check-input"
               type="checkbox"
               value={operator}
               id={`${operator}Check`}
               checked={this.props.layer.layerOperators.includes(operator)}
               readOnly
            />
            <label
               className="form-check-label"
               htmlFor={`${operator}Check`}
            >
               {dictionary[this.props.languageFromMain].queryinput.layerOperators[operator]}
            </label>
         </div>
      );
   }

   render() {
      return (
         <div key={this.props.layerId}>
            <h5 style={{marginLeft:50}}>
               {`${dictionary[this.props.languageFromMain].center.layer} id: ${this.props.layer.id}`}
            </h5>
            <div className="form-group row addcorp">
               <div className="col-sm-2 align-right">
                  <label htmlFor="layerName">
                     {dictionary[this.props.languageFromMain].center.name}
                  </label>
               </div>
               <div className="col-sm-3">
                  <input
                     className="form-control input-lg"
                     type="text"
                     name="layerName"
                     id="layerName"
                     value={this.props.layer.name}
                     placeholder={dictionary[this.props.languageFromMain].center.name}
                     readOnly
                  />
               </div>
               <div className="col-sm-2 align-right">
                  <label htmlFor="layerSynonym">
                     {dictionary[this.props.languageFromMain].center.synonym}
                  </label>
               </div>
               <div className="col-sm-3">
                  <input
                     className="form-control input-lg"
                     type="text"
                     name="layerSynonym"
                     id="layerSynonym"
                     value={this.props.layer.synonym}
                     placeholder={dictionary[this.props.languageFromMain].center.synonym}
                     readOnly
                  />
               </div>
            </div>
            <div className="form-group row addcorp">
               <div className="col-sm-2 align-right">
                  <label htmlFor="Layer_operators">
                     {dictionary[this.props.languageFromMain].center.operator}
                  </label>
               </div>
               <div className="col-sm-3">
                  {  
                     layerOperators.map(operator => {
                        return this.renderLayerOperators(operator);
                     })
                  }
               </div>
            </div>
            { (this.valOptsIDs.length > 0) ?
               <div>
                  <h6 style={{marginLeft:50}}>
                     {dictionary[this.props.languageFromMain].center.valueOptions}
                  </h6>            
                  {this.valOptsIDs.map(id => {
                     return (
                        <ValOpts
                           languageFromMain={this.props.languageFromMain}
                           valOpt={this.valOptsById[id]}
                           key={id}
                        />               
                  )})}
               </div>
               : false
            }
         </div>
      );
   }

}

export default Layer;