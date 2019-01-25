export const layerOperators = [
   'IS',
   'IS_NOT',
   'STARTS_WITH',
   'CONTAINS',
   'ENDS_WITH',
   'REGEX',
   'NOT_REGEX'
]

const applyOrderTemplate = order => data =>
   data.map(current => {
      const index = order.indexOf(current);

      if (index !== -1) {
         return index;
      } else {
         throw Error(`${current} is not in ${order}`);
      }
   })
   .sort()
   .map(index => order[index]);

export const sortLayerOperators = applyOrderTemplate(layerOperators);

export const sortLayers = data => {
   const word = (data[0] === 'word') && data.shift();
   data.sort().unshift(word);
   return data;
}