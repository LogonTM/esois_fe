import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import AggregatorPage from './aggregatorpage';

const setupNotLoggedIn = () => {
   const utils = render(<AggregatorPage languageFromMain='ee' ajax={() => {}} error={() => {}} userRole='' />)
   const input = utils.getByPlaceholderText('koer')
   return {
      input,
      ...utils,
   }
}
 
afterEach(cleanup)

test('it should be possible to write into the queryinput field', () => {
   const { input } = setupNotLoggedIn();
   fireEvent.change(input, {target: {value: 'kass'}});
   expect(input.value).toBe('kass');
});

test('toggling between CQL and FCS-QL search modes', () => {
   const utils = render(<AggregatorPage languageFromMain='ee' ajax={() => {}} error={() => {}} userRole='' />)
   const radioFCSQL = utils.getByLabelText('Laiendatud (FCS-QL)');
   expect(radioFCSQL.checked).toBe(false);
   fireEvent.click(radioFCSQL);
   expect(radioFCSQL.checked).toBe(true);
   expect(utils.getByLabelText('vorm').checked).toBe(true);
   expect(utils.getByLabelText('tekst').checked).toBe(false);
   expect(utils.getByDisplayValue('sõna')).not.toBe(null);
   const textField = utils.getByTestId('fcsquery-form-textinput');
   fireEvent.change(textField, {target: {value: 'koer'}});
   expect(textField.value).toBe('koer');
})