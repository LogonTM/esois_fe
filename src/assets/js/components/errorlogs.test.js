import React from 'react';
import ErrorLogs from './errorlogs';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('render ErrorLogs', () => {
   const { getByTestId } = render(<ErrorLogs languageFromMain='ee' />);
   expect(getByTestId('error-logs')).toBeInTheDocument();
})
