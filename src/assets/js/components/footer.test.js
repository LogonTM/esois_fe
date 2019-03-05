import React from 'react';
import Footer from './footer';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('that footer renders in Estonian', () => {
   const footer = render(<Footer languageFromMain='ee' />)
   expect(footer.getByText(/Eesti Keeleressursside Keskus/)).toBeInTheDocument();
   expect(footer.getByAltText(/Euroopa Liidu regionaalfond/)).toBeInTheDocument();
   expect(footer.queryByText(/Estonia/)).not.toBeInTheDocument();
})

test('that footer renders in English', () => {
   const footer = render(<Footer languageFromMain='en' />)
   expect(footer.queryByText(/Eesti Keeleressursside Keskus/)).not.toBeInTheDocument();
   expect(footer.getByAltText(/Euroopa Liidu regionaalfond/)).toBeInTheDocument();
   expect(footer.queryByText(/Estonia/)).toBeInTheDocument();
})