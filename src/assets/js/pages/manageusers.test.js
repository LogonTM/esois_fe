import React from 'react';
import ManageUsers from './manageusers';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('that manage users page renders', () => {
   const { getByTestId } = render(<ManageUsers languageFromMain='ee' />)
   expect(getByTestId('manage-users')).toBeInTheDocument();
})