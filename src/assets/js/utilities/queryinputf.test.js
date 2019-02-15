import { getLayerOperators, layerToQueryString, getLayerValueOptions, queryParse,
   queryToORArgs, queryToANDArgs, queryToTokens } from './queryinputf';

describe('query input functions', () => {
   const layers = {
         "word": {
            "layerOperators": [
               "REGEX",
               "ENDS_WITH",
               "STARTS_WITH",
               "CONTAINS",
               "NOT_REGEX",
               "IS",
               "IS_NOT"
           ],
           "valueOptions": []
         },
         "analysis": {
            "layerOperators": [
               "REGEX",
               "ENDS_WITH",
               "STARTS_WITH",
               "CONTAINS",
               "NOT_REGEX",
               "IS",
               "IS_NOT"
           ],
           "valueOptions": []
         },
         "tense": {
            "layerOperators": [
               "REGEX",
               "ENDS_WITH",
               "STARTS_WITH",
               "CONTAINS",
               "NOT_REGEX",
               "IS",
               "IS_NOT"
           ],
           "valueOptions": [
               "Prt",
               "Prs"
           ]
         },
         "morf": {
            "layerOperators": [
               "REGEX",
               "CONTAINS",
               "IS"
           ],
           "valueOptions": []
         }
      }

   it('should return layer operators for layer from layerMap', () => {
      expect(getLayerOperators(layers, 'morf')).toEqual([
         "REGEX",
         "CONTAINS",
         "IS"
      ]);
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'IS', '*koer')).toEqual('word = "\\*koer"');
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'IS_NOT', 'koer')).toEqual('word != "koer"');
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'CONTAINS', 'koer')).toEqual('word = ".*koer.*"');
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'STARTS_WITH', 'koer')).toEqual('word = "koer.*"');
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'ENDS_WITH', 'koer')).toEqual('word = ".*koer"');
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'REGEX', '*koer')).toEqual('word = "*koer"');
   })

   it('should make query string out of layer, operator and value', () => {
      expect(layerToQueryString('word', 'NOT_REGEX', '*koer')).toEqual('word != "*koer"');
   })

   it('should make query string out of layer, operator and value (default case in function wordOptionsDefaultToStr)', () => {
      expect(layerToQueryString('word', 'something', 'koer')).toEqual('word = "koer"');
   })

   it("should return layer's value options from layerMap", () => {
      expect(getLayerValueOptions(layers, 'tense', 'IS', '10')).toEqual(expect.arrayContaining([ "Prt","Prs" ]));
   });

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('tense = "Prt"', layers)).toEqual({"layer": "tense", "op": "IS", "val": "Prt"});
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('tense != "Prt"', layers)).toEqual({"layer": "tense", "op": "IS_NOT", "val": "Prt"});
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('word = ".*koer.*"', layers)).toEqual({"layer": "word", "op": "CONTAINS", "val": "koer"});
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('word = "koer.*"', layers)).toEqual({"layer": "word", "op": "STARTS_WITH", "val": "koer"});
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('word = ".*koer"', layers)).toEqual({"layer": "word", "op": "ENDS_WITH", "val": "koer"});
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('word = "ko*er"', layers)).toEqual({"layer": "word", "op": "REGEX", "val": "ko*er"});
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('word != "ko*er"', layers)).toEqual({"layer": "word", "op": "NOT_REGEX", "val": "ko*er"});
   })

   it('should return null for empty query', () => {
      expect(queryParse('', layers)).toEqual(null);
   })

   it('should parse layer, operator and query from query string', () => {
      expect(queryParse('word =& ".*koer"', layers)).toEqual(null);
   })

   it('should return null if the layer is not in current layerMap', () => {
      expect(queryParse('lemma = ".*koer"', layers)).toEqual(null);
   })

   it('should break a query with "or" in it into parts from the "or" place', () => {
      expect(queryToORArgs('( word = ".*koer" | tense = "Prs" )'))
      .toEqual(expect.arrayContaining([" word = \".*koer\" ", " tense = \"Prs\" "]));
   })

   it('should return null for empty query', () => {
      expect(queryToORArgs(''))
      .toEqual(null);
   })

   it('should break a query with "and" in it into parts from the "and" place', () => {
      expect(queryToANDArgs('[ word = "koer" & tense = "Prs" ]'))
      .toEqual(expect.arrayContaining(["[ word = \"koer\" ", " tense = \"Prs\" ]"]));
   })

   it('should return null for empty query', () => {
      expect(queryToANDArgs(''))
      .toEqual(null);
   })

   it('should divide query to tokens by each searched word', () => {
      expect(queryToTokens('[ word = "koer" ] [ tense = "Prs" ]'))
      .toEqual(expect.arrayContaining(["[ word = \"koer\" ] ", "[ tense = \"Prs\" ]"]));
   })

   it('should return null for empty query', () => {
      expect(queryToTokens(''))
      .toEqual(null);
   })

})