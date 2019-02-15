import { sortLayerOperators } from './layers';

describe('sortLayerOperators test', () => {
   const randomOrderOperatorsList = [
      'NOT_REGEX',
      'CONTAINS',
      'IS_NOT',
      'ENDS_WITH',
      'STARTS_WITH',
      'REGEX',
      'IS'
   ]

   it('should sort the layer operators to predefined order', () => {
      expect(sortLayerOperators(randomOrderOperatorsList)).toEqual([
         'IS',
         'IS_NOT',
         'STARTS_WITH',
         'CONTAINS',
         'ENDS_WITH',
         'REGEX',
         'NOT_REGEX'
      ]);
   });

})