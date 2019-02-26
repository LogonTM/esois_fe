import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { wait } from 'dom-testing-library';
import AggregatorPage from './aggregatorpage';

afterEach(cleanup)

test('it should be possible to write into the queryinput field', () => {
   const { getByPlaceholderText } = render(
      <AggregatorPage
         languageFromMain='ee'
         ajax={() => {}}
         error={() => {}}
         userRole=''
      />)
   const input = getByPlaceholderText('koer');
   fireEvent.change(input, {target: {value: 'kass'}});
   expect(input.value).toBe('kass');
});

test('toggling between CQL and FCS-QL search modes', () => {
   const { getByLabelText, getByDisplayValue, getByTestId } = render(
      <AggregatorPage
         languageFromMain='ee'
         ajax={() => {}}
         error={() => {}}
         userRole=''
      />)
   const radioFCSQL = getByLabelText('Laiendatud (FCS-QL)');
   expect(radioFCSQL.checked).toBe(false);
   fireEvent.click(radioFCSQL);
   expect(radioFCSQL.checked).toBe(true);
   expect(getByLabelText('vorm').checked).toBe(true);
   expect(getByLabelText('tekst').checked).toBe(false);
   expect(getByDisplayValue('sõna')).not.toBe(null);
   const textField = getByTestId('fcsquery-form-textinput');
   fireEvent.change(textField, {target: {value: 'koer'}});
   expect(textField.value).toBe('koer');
})

test('language selector modal with only "all languages"', async () => {
   const { getByTestId, queryAllByTestId } = render(
      <AggregatorPage
         languageFromMain='ee'
         ajax={() => {}}
         error={() => {}}
         userRole=''
      />)
   const languageSelector = getByTestId('languageSelector')
   expect(languageSelector).toBeInTheDocument();
   fireEvent.click(languageSelector);
   await wait(() => expect(getByTestId('languages')).toBeInTheDocument());
   expect(queryAllByTestId('onelanguage').length).toBe(1);
})

test('corpusview modal user not logged in', async () => {
   const { getByTestId, getByText, getByPlaceholderText, queryByTestId, getByDisplayValue } = render(
      <AggregatorPage
         languageFromMain='ee'
         ajax={() => {}}
         error={() => {}}
         userRole=''
      />)
   const corpusViewButton = getByTestId('corpusViewButton')
   expect(corpusViewButton).toBeInTheDocument();
   fireEvent.click(corpusViewButton);
   await wait(() => expect(getByTestId('corpusview')).toBeInTheDocument());
   expect(getByTestId('modal-close-button')).toBeInTheDocument();
   expect(getByText('Kõik valituks')).toBeInTheDocument();
   expect(getByText('Kõik mittevalituks')).toBeInTheDocument();
   const searchBox = getByPlaceholderText('Otsi korpust')
   expect(searchBox).toBeInTheDocument();
   fireEvent.change(searchBox, {target: {value: 'test'}});
   expect(searchBox.value).toBe('test');
   expect(queryByTestId('fileInputField')).not.toBeInTheDocument();
   fireEvent.click(getByTestId('modal-close-button'));
})

test('corpusview modal admin logged in', async () => {
   const { getByTestId, getByText, queryByTestId } = render(
      <AggregatorPage
         languageFromMain='ee'
         ajax={() => {}}
         error={() => {}}
         userRole='ROLE_ADMIN'
      />)
   const corpusViewButton = getByTestId('corpusViewButton')
   expect(corpusViewButton).toBeInTheDocument();
   fireEvent.click(corpusViewButton);
   await wait(() => expect(getByTestId('corpusview')).toBeInTheDocument());
   expect(getByText('Kõik valituks')).toBeInTheDocument();
   expect(queryByTestId('fileInputField')).toBeInTheDocument();
})

test('set result number to 15', () => {
   const { getByTestId } = render(
      <AggregatorPage
         languageFromMain='ee'
         ajax={() => {}}
         error={() => {}}
         userRole=''
      />)
   const resultAmount = getByTestId('set-result-number')
   expect(resultAmount).toBeInTheDocument();
   expect(resultAmount.value).toBe("10");
   fireEvent.change(resultAmount, {target: {value: "15"}});
   expect(resultAmount.value).toBe("15");
})
