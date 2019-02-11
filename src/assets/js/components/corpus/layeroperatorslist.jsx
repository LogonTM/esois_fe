import React from 'react';
import dictionary from '../../../../translations/dictionary';
import LayerOperator from './layeroperator';
import { layerOperators } from '../../utilities/layers';

const LayerOperatorsList = ({currentLayerOperators, languageFromMain}) => {

	const layerOperatorList = layerOperators.map(operator => {
		return (
			<LayerOperator 
				key={operator}
				operator={operator}
				languageFromMain={languageFromMain}
				checked={currentLayerOperators.includes(operator)}
			/>
		);
	});

   return (
      <div className="form-group row addcorp">
         <div className="col-sm-2 align-right">
            <label htmlFor="Layer_operators">
               {dictionary[languageFromMain].corpus.operator}
            </label>
         </div>
         <div className="col-sm-3">
            {layerOperatorList}
         </div>
      </div>
   );
}

export default LayerOperatorsList;