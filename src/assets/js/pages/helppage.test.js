import React from 'react';
import HelpPage from './helppage';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('that help page renders', () => {
   const helpPage = render(<HelpPage languageFromMain='ee' />)
   expect(helpPage.getByTestId('help-page')).toBeInTheDocument();
})