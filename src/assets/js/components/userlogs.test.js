import React from 'react';
import UserLogs from './userlogs';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('render UserLogs', () => {
   const { getByTestId } = render(<UserLogs languageFromMain='ee' />);
   expect(getByTestId('user-logs')).toBeInTheDocument();
})
