import React from 'react';
import SearchLogs from './searchlogs';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('render SearchLogs', () => {
   const { getByTestId } = render(<SearchLogs languageFromMain='ee' />);
   expect(getByTestId('search-logs')).toBeInTheDocument();
})
