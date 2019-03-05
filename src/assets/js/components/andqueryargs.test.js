import React from 'react';
import ANDQueryArgs from './andqueryargs';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { layersForTest } from '../constants/corporadatafortest';
import { wait } from 'dom-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup)

test('adding AND arg', async () => {
   const onQueryChange = jest.fn();
   const { getAllByTestId, getByTestId } = render(
      <ANDQueryArgs 
         query='[ word = "pesa" ] {1, 2}'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   expect(getAllByTestId('orarg').length).toBe(1);
   expect(getAllByTestId('fcsquery-form-textinput').length).toBe(1);
   fireEvent.click(getByTestId('addAndButton'));
   await wait(() => expect(getAllByTestId('orarg').length).toBe(2));
})

test('adding and removing ADV OR arg', async () => {
   const onQueryChange = jest.fn();
   const { getAllByTestId, getByTestId } = render(
      <ANDQueryArgs 
         query='[ word = "pesa" ] {1, 2}'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   expect(getAllByTestId('orarg').length).toBe(1);
   expect(getAllByTestId('fcsquery-form-textinput').length).toBe(1);
   fireEvent.click(getByTestId('addOr'));
   await wait(() => expect(getAllByTestId('orarg').length).toBe(2));
   fireEvent.click(getByTestId('removeORarg'));
   await wait(() => expect(getAllByTestId('orarg').length).toBe(1));
})

test('removing ADV OR arg', async () => {
   const onQueryChange = jest.fn();
   const { getAllByTestId, getByTestId, queryAllByTestId } = render(
      <ANDQueryArgs 
         query='[ word = "pesa" ] {1, 2}'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   expect(queryAllByTestId('orarg').length).toBe(1);
   expect(getAllByTestId('fcsquery-form-textinput').length).toBe(1);
   fireEvent.click(getByTestId('removeORarg'));
   await wait(() => expect(queryAllByTestId('orarg').length).toBe(0));
})

test('checkboxes and input fields in repeat menu', () => {
   const onQueryChange = jest.fn();
   const { getByLabelText, getByTestId } = render(
      <ANDQueryArgs 
         query='[ word = "pesa" ] {1, 2}'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   const sentenceStart = getByLabelText('Lause algus');
   const sentenceEnd = getByLabelText('Lause lõpp')
   const repeat1 = getByTestId("repeat1");
   const repeat2 = getByTestId("repeat2");
   expect(sentenceStart.checked).toBe(false);
   fireEvent.click(sentenceStart);
   expect(sentenceStart.checked).toBe(true);
   expect(sentenceEnd.checked).toBe(false);
   fireEvent.click(sentenceEnd);
   expect(sentenceEnd.checked).toBe(true);
   expect(repeat1.value).toBe('1');
   expect(repeat2.value).toBe('2');
   fireEvent.change(repeat1, {target: {value: 2}});
   expect(repeat1.value).toBe('2');
   expect(repeat2.value).toBe('2');
   fireEvent.change(repeat2, {target: {value: ''}});
   expect(repeat2.value).toBe('');
})

test('single repeat value input from querystring', () => {
   const onQueryChange = jest.fn();
   const { getByTestId } = render(
      <ANDQueryArgs 
         query='[ word = "pesa" ] {1}'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   const repeat1 = getByTestId("repeat1");
   const repeat2 = getByTestId("repeat2");
   expect(repeat1.value).toBe('1');
   expect(repeat2.value).toBe('1');
})

test('start with no input repeat value and add one value', () => {
   const onQueryChange = jest.fn();
   const { getByTestId } = render(
      <ANDQueryArgs 
         query='[ word = "pesa" ]'
         onQueryChange={onQueryChange}
         languageFromMain='ee'
         layerMap={layersForTest}
      />);
   const repeat1 = getByTestId("repeat1");
   const repeat2 = getByTestId("repeat2");
   expect(repeat1.value).toBe('');
   expect(repeat2.value).toBe('');
   fireEvent.change(repeat2, {target: {value: '3'}});
   expect(repeat1.value).toBe('');
   expect(repeat2.value).toBe('3');
})
