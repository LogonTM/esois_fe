import React from 'react';
import LanguageSelector from './languageselector';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { corporaForTestNotLoggedIn } from '../constants/corporadatafortest';

afterEach(cleanup);

const anyLanguage = ["mul", "igas keeles"]
const selectedLanguage = ["mul", "igas keeles"]
const currentLanguagesMap = { est: "Estonian", vro: "Võro" }

test('that language selector renders', () => {
   const languageChangeHandler = jest.fn();
   const updateCurrentLanguagesMap = jest.fn();
   const { getByTestId } = render(
      <LanguageSelector
         anyLanguage={anyLanguage}
         currentLanguagesMap={currentLanguagesMap}
         selectedLanguage={selectedLanguage}
         languageChangeHandler={languageChangeHandler}
         languageFromMain='ee'
         corpora={corporaForTestNotLoggedIn}
         updateCurrentLanguagesMap={updateCurrentLanguagesMap}
      />)
   expect(getByTestId('languages')).toBeInTheDocument();
})