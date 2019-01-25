import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dictionary from '../../../../translations/dictionary';

class ValOpts extends Component {
   static propTypes = {
      languageFromMain: PropTypes.string.isRequired,
      valOpt: PropTypes.object.isRequired,
   }

   render() {
      return (
         <div>
            <div className="form-group row addcorp">
               <div className="col-sm-2 align-right">
                  <label htmlFor="valOptName">
                     {dictionary[this.props.languageFromMain].center.name}
                  </label>
               </div>
               <div className="col-sm-3">
                  <input
                     className="form-control input-lg"
                     type="text"
                     name="valOptName"
                     id="valOptName"
                     value={this.props.valOpt.name}
                     placeholder={dictionary[this.props.languageFromMain].center.name}
                     readOnly
                  />
               </div>
               <div className="col-sm-2 align-right">
                  <label htmlFor="valOptSynonym">
                     {dictionary[this.props.languageFromMain].center.synonym}
                  </label>
               </div>
               <div className="col-sm-3">
                  <input
                     className="form-control input-lg"
                     type="text"
                     name="valOptSynonym"
                     id="valOptSynonym"
                     value={this.props.valOpt.synonym}
                     placeholder={dictionary[this.props.languageFromMain].center.synonym}
                     readOnly
                  />
               </div>
            </div>
         </div>
      );
   }

}

export default ValOpts;