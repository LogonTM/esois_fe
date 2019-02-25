import React from 'react';
import ManageLogs from './managelogs';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { wait } from 'dom-testing-library';

afterEach(cleanup);

test('that manage logs page renders', () => {
   const { getByTestId, queryByTestId } = render(<ManageLogs languageFromMain='ee' />)
   expect(getByTestId('manage-logs')).toBeInTheDocument();
   expect(getByTestId('search-logs')).toBeInTheDocument();
   expect(queryByTestId('user-logs')).not.toBeInTheDocument();
   expect(queryByTestId('error-logs')).not.toBeInTheDocument();
})

test('switching between logs', async () => {
   const { getByTestId, getByLabelText } = render(<ManageLogs languageFromMain='ee' />)
   expect(getByTestId('search-logs')).toBeInTheDocument();
   fireEvent.click(getByLabelText('Kasutajalogi'));
   // expect(getByLabelText('Otsilogid').checked).toBe(false);
   // await wait(() => expect(getByTestId('user-logs')).toBeInTheDocument());

})