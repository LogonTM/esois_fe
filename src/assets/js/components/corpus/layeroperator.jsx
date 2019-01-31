import React from 'react';
import dictionary from '../../../../translations/dictionary';

const LayerOperator = ({ operator, languageFromMain, checked }) => {
   return (
      <div className="form-check" key={operator}>
         <input
            className="form-check-input"
            type="checkbox"
            value={operator}
            name={operator}
            id={operator}
            checked={checked}
            readOnly
         />
         <label
            className="form-check-label"
            htmlFor={operator}
         >
            {dictionary[languageFromMain].queryinput.layerOperators[operator]}
         </label>
      </div>
   );
}

export default LayerOperator;