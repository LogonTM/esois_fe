import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import QueryInput from './queryinput';
import 'jest-dom/extend-expect';
import { layersForTest } from '../constants/corporadatafortest';

afterEach(cleanup);

test('it should render CQL query input field', () => {
   const onQueryChange = jest.fn();
   const handleKeyTextarea = jest.fn();
   const onKeyDown = jest.fn();
   const queryinputCQL = render(
   <QueryInput 
      searchedLanguage={['mul', 'igas keeles']}
      queryTypeId='cql'
      query='pesa'
      onKeyDown={onKeyDown}
      handleKeyTextarea={handleKeyTextarea}
      languageFromMain='ee'
      onQueryChange={onQueryChange}
      fcsTextAreaVisibility={false}
      layerMap={{}}
   />)
   const inputField = queryinputCQL.getByTestId('cql-input');
   expect(inputField).not.toBe(null);
   expect(inputField.value).toBe('pesa');
   expect(queryinputCQL.queryByTestId('fcs-text-input')).not.toBeInTheDocument();
   fireEvent.change(inputField, {target: {value: 'a'}});
   expect(onQueryChange).toHaveBeenCalledTimes(1);
})

test('it should render FCS-QL query text input field', () => {
   const onQueryChange = jest.fn();
   const handleKeyTextarea = jest.fn();
   const onKeyDown = jest.fn();
   const queryinputFCSQL = render(
   <QueryInput 
      searchedLanguage={['mul', 'igas keeles']}
      queryTypeId='fcs'
      query=''
      onKeyDown={onKeyDown}
      handleKeyTextarea={handleKeyTextarea}
      languageFromMain='ee'
      onQueryChange={onQueryChange}
      fcsTextAreaVisibility={true}
      layerMap={layersForTest}
   />)
   const inputField = queryinputFCSQL.getByTestId('fcs-text-input');
   expect(inputField).not.toBe(null);
   expect(queryinputFCSQL.queryByTestId('fcs-form-input')).not.toBeInTheDocument();
   fireEvent.change(inputField, {target: {value: 'a'}});
   expect(onQueryChange).toHaveBeenCalledTimes(1);
})

test('it should render FCS-QL query form input field', () => {
   const onQueryChange = jest.fn();
   const handleKeyTextarea = jest.fn();
   const onKeyDown = jest.fn();
   const queryinputFCSQL = render(
   <QueryInput 
      searchedLanguage={['mul', 'igas keeles']}
      queryTypeId='fcs'
      query=''
      onKeyDown={onKeyDown}
      handleKeyTextarea={handleKeyTextarea}
      languageFromMain='ee'
      onQueryChange={onQueryChange}
      fcsTextAreaVisibility={false}
      layerMap={layersForTest}
   />)
   const inputField = queryinputFCSQL.getByTestId('fcsquery-form-textinput');
   expect(inputField).not.toBe(null);
   expect(queryinputFCSQL.queryByTestId('fcs-text-input')).not.toBeInTheDocument();
   fireEvent.change(inputField, {target: {value: 'asi'}});
   expect(onQueryChange).toHaveBeenCalledTimes(3);
   expect(inputField.value).toBe('asi');

})