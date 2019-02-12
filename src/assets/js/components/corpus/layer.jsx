import React from 'react';
import dictionary from '../../../../translations/dictionary';
import { pluck, prop, indexBy } from 'ramda';
import LayerOperatorsList from './layeroperatorslist';
import Row from './row';

	
const Layer = ({ layer, languageFromMain }) => {

	const valOptsById = indexBy(prop('id'), layer.valueOptions);
	const valOptsIDs = pluck('id')(layer.valueOptions);
	
	const valueOptions = valOptsIDs.map(id => {
		return (
			<Row
				key={id}
				nameValue={valOptsById[id].name}
				synonymValue={valOptsById[id].synonym}
				languageFromMain={languageFromMain}
			/>
		);
	});

	return (
		<div>
			<h5 style={{ marginLeft: 50 }}>
				{`${dictionary[languageFromMain].corpus.layer} id: ${layer.id}`}
			</h5>
			<Row
				nameValue={layer.name}
				synonymValue={layer.synonym}
				languageFromMain={languageFromMain}
			/>
			<LayerOperatorsList 
				currentLayerOperators={layer.layerOperators}
				languageFromMain={languageFromMain}
			/>
				{valOptsIDs.length > 0 ? 
					<div>
						<h6 style={{ marginLeft: 50 }}>
							{dictionary[languageFromMain].corpus.valueOptions}
						</h6>            
						{valueOptions}
					</div>
					: false
				}
		</div>
	);
};

export default Layer;