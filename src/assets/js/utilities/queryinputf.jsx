export const nextId = () => {
   return nextId.id++;
}

nextId.id = 0;

export function getLayerOperators(layers, layer) {
	return layers[layer].layerOperators;
}

export function layerToQueryString(layer, operator, value) {
	var qstr = wordOptionsDefaultToStr(layer, operator, value);
	if (qstr === undefined) {
			console.warn("layerToQueryString: qstr undefined!");
			return 'undefined';
	}
	return qstr;
}

export function getLayerValueOptions(layers, layer, operator, value) {
	var valopts = layers[layer].valueOptions;
	if (!valopts) {
		return;
	}
	if (typeof valopts === 'function') {
		return valopts(layer, operator, value);
	}
	else if (valopts.length) {
		valopts.sort();
		return valopts; // array
	}
}

// a RE string matching a "double-quote"d string
const quotedStringRE = /(?:"(?:\\"|[^"])*")/.source;

// in: 'word = "zebra" '
// out: ['word', '=', 'zebra']
export function queryParse(q, layers) {
	if (!q) return null;
	var match = q.match(/^\s*(\w+) *(=|!=) *"((?:\\"|.)*?)"/);
	if (match === null) {
		return null;
	}

	const layer = match[1];
	const op = match[2];
	const value = match[3];

	if (!layers.hasOwnProperty(layer)) {
		return null;
	}

	return wordOptionsdefaultFromString(layer, op, value);
}

// in: '(word = "zebra" | word = "zoo" ...)'
// out: ['word = "zebra" ', ' (word = "zoo" ...)']
export function queryToORArgs(q) {
	if (!q) return null;
	var match = q.trim().match(queryToORArgs.re);
	return match;
}

queryToORArgs.re = RegExp('(?:'+quotedStringRE+'|[^()|])+', 'g')

// in: '[word = "zebra" & (word = "zoo" ...)]'
// out: ['word = "zebra" ', ' (word = "zoo" ...)']
export function queryToANDArgs(q) {
	if (!q) return null
	
	var match = q.trim().match(queryToANDArgs.re);
	return match;
}

queryToANDArgs.re = RegExp('(?:'+quotedStringRE+'|[^&])+', 'g')

// in: '[word = "zebra"] [word = "zoo"]'
// out: ['[word = "zebra"]', '[word = "zoo"]']
export function queryToTokens(q) {
	if (!q) return null;
	var match = q.match(queryToTokens.re);
	return match;
}

queryToTokens.re = RegExp('\\[(?:'+ quotedStringRE +'|.)*?\\] *(?:\\{.*?\\})?', 'g');

function wordOptionsDefaultToStr(layer, op, value) {
	const unescVal = value;
	const val = escapeRegExp(value);
	switch(op) {
	case 'IS': 
		return `${layer} = "${val}"`;
	case 'IS_NOT': 
		return `${layer} != "${val}"`;
	case 'CONTAINS': 
		return `${layer} = ".*${val}.*"`;
	case 'STARTS_WITH': 
		return `${layer} = "${val}.*"`;
	case 'ENDS_WITH': 
		return `${layer} = ".*${val}"`;
	case 'REGEX': 
		return `${layer} = "${unescVal}"`;
	case 'NOT_REGEX': 
		return `${layer} != "${unescVal}"`;
	default:
		return `${layer} = "${val}"`;
	}
}

function wordOptionsdefaultFromString(layer, op, val) {
	// layer should be good. Now figure out op, and if val is escaped or not
	if (op === '=') {
		var strippedOfSemiRE = val.replace(/^\.\*/, '').replace(/\.\*$/, '');
		if ( strippedOfSemiRE.length !== val.length ) {
			// could be one of: startswith, contains, endswith.
			if ( !guessIfRegexp(strippedOfSemiRE) ) {
				// Ok, it is one of: startswith, contains, endswith.
				if (val.startsWith('.*') && val.endsWith('.*')) {
					var op2 = 'CONTAINS';
				} else if (val.startsWith('.*')) {
					op2 = 'STARTS_WITH';
				} else if (val.endsWith('.*')) {
					op2 = 'ENDS_WITH'
				} else {
					console.error("parsing query failed due to coding error");
					return null;
				}
				return {
					layer: layer,
					op: op2,
					val: unescapeRegExp(strippedOfSemiRE)
				}
			}
			// its regexp.
		}
	}

	if (guessIfRegexp(val)) {
			// its regexp
			return {layer, op: op==='='?'REGEX':'NOT_REGEX', val: val};
	}
	
	// its not regexp
	return {layer, op: op==='='?'IS':'IS_NOT', val: unescapeRegExp(val)};
}

function guessIfRegexp(s) {
	return !! s.match(/[^\\][-[\]{}()*+\\?.,^$|#]/); // find if it contains any unescaped regex characters
}

function unescapeRegExp(text) {
	return text.replace(/\\([-[\]{}()*+?.,\\^$|#])/g, '$1');
}

function escapeRegExp(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}