import React from 'react';
import Corpus from './corpus';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { endpointForTest } from '../../constants/corporadatafortest';

test('corpus renders endpoint data', () => {
   const { getAllByText, getAllByTestId, getAllByDisplayValue } = render(<Corpus languageFromMain='ee' endpoint={endpointForTest} />)
   expect(getAllByText('Nimi').length).toBe(26);
   expect(getAllByText('Sünonüüm').length).toBe(26);
   expect(getAllByTestId('operator').length).toBe(49);
   expect(getAllByText('URL').length).toBe(1);
   expect(getAllByText('Protokoll').length).toBe(1);
   expect(getAllByDisplayValue('VERSION_2').length).toBe(1);
})