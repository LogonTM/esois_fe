import React from 'react';
import ADVTokens from './advtokens';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { layersForTest } from '../constants/corporadatafortest';
import { wait } from 'dom-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('adding and removing ADVToken', async () => {
   const onQueryChange = jest.fn();
   const { getAllByTestId, getByTestId, queryAllByTestId } = render(
      <ADVTokens 
         query='[ word = "pesa" ]'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   expect(getAllByTestId('orarg').length).toBe(1);
   expect(getAllByTestId('fcsquery-form-textinput').length).toBe(1);   
   fireEvent.click(getByTestId('addADVToken'));
   await wait(() => expect(queryAllByTestId('fcsquery-form-textinput').length).toBe(2));
   expect(getAllByTestId('ADVToken').length).toBe(2);
   fireEvent.click(getByTestId('removeADVToken'));
   await wait(() => expect(queryAllByTestId('ADVToken').length).toBe(1));
   expect(queryAllByTestId('fcsquery-form-textinput').length).toBe(1);
})

test('ORarg in query with layers', async () => {
   const onQueryChange = jest.fn();
   const { getAllByTestId, getByTestId, queryAllByTestId } = render(
      <ADVTokens 
         query='[ number = "Pl" ]'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   expect(getAllByTestId('orarg').length).toBe(1);
   expect(queryAllByTestId('fcsquery-form-textinput').length).toBe(0);
   fireEvent.change(getByTestId('valOpts'), {target: {value: 'Sg'}})
   expect(queryAllByTestId('fcsquery-form-textinput').length).toBe(0);
})