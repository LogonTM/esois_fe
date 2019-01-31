import React from 'react';
import dictionary from '../../../../translations/dictionary';
import PropTypes from 'prop-types';

const Row = ({nameValue, synonymValue, languageFromMain}) => {

   return (
      <div className="form-group row addcorp">
         <div className="col-sm-2 align-right">
            <label htmlFor='name'>
               {dictionary[languageFromMain].center.name}
            </label>
         </div>
         <div className="col-sm-3">
            <input
               className="form-control input-lg"
               type="text"
               name='name'
               value={nameValue}
               placeholder={dictionary[languageFromMain].center.name}
               readOnly
            />
         </div>
         <div className="col-sm-2 align-right">
            <label htmlFor='synonym'>
               {dictionary[languageFromMain].center.synonym}
            </label>
         </div>
         <div className="col-sm-3">
            <input
               className="form-control input-lg"
               type="text"
               name='synonym'
               value={synonymValue}
               placeholder={dictionary[languageFromMain].center.synonym}
               readOnly
            />
         </div>
      </div>
   );
}

Row.propTypes = {
   nameValue: PropTypes.string.isRequired,
   synonymValue: PropTypes.string.isRequired,
   languageFromMain: PropTypes.string.isRequired,
}

export default Row;