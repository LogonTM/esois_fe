import React from 'react';
import ADVTokenMenu from './advtokenmenu';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

test('checkboxes and input fields in repeat menu', () => {
   const onChange = jest.fn();
   const tokenMenu = render(<ADVTokenMenu onChange={onChange} languageFromMain='ee' repeat1='' repeat2='' />);
   const sentenceStart = tokenMenu.getByLabelText('Lause algus');
   const sentenceEnd = tokenMenu.getByLabelText('Lause lõpp')
   const repeat1 = tokenMenu.getByTestId("repeat1");
   const repeat2 = tokenMenu.getByTestId("repeat2");
   expect(sentenceStart.checked).toBe(false);
   fireEvent.click(sentenceStart);
   expect(sentenceStart.checked).toBe(true);
   expect(sentenceEnd.checked).toBe(false);
   fireEvent.click(sentenceEnd);
   expect(sentenceEnd.checked).toBe(true);
   expect(repeat1.value).toBe('');
   expect(repeat2.value).toBe('');
   fireEvent.change(repeat1, {target: {value: 2}});
   expect(repeat1.value).toBe('2');
   expect(repeat2.value).toBe('');
})

test('prefilled repeats in english', () => {
   const onChange = jest.fn();
   const tokenMenu = render(<ADVTokenMenu onChange={onChange} languageFromMain='en' repeat1='2' repeat2='4' />);
   const sentenceStart = tokenMenu.getByLabelText('Sentence start');
   const sentenceEnd = tokenMenu.getByLabelText('Sentence end')
   const repeat1 = tokenMenu.getByTestId("repeat1");
   const repeat2 = tokenMenu.getByTestId("repeat2");
   expect(sentenceStart.checked).toBe(false);
   expect(sentenceEnd.checked).toBe(false);
   expect(repeat1.value).toBe('2');
   expect(repeat2.value).toBe('4');
   fireEvent.change(repeat1, {target: {value: 3}});
   expect(repeat1.value).toBe('3');
   fireEvent.change(repeat2, {target: {value: ''}});
   expect(repeat2.value).toBe('');
})

test('toggle repeat menu', () => {
   const onChange = jest.fn();
   const tokenMenu = render(<ADVTokenMenu onChange={onChange} languageFromMain='en' repeat1='' repeat2='' />);
   const menu = tokenMenu.getByTestId('ADVtokenMenu-items');
   expect(menu.className).toBe('hide-true');
   fireEvent.click(tokenMenu.getByTestId('repeatMenuToggleButton'));
   expect(menu.className).toBe('hide-false');
})