import React from 'react';
import ErrorPane from './errorpane';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { wait } from 'dom-testing-library';

afterEach(cleanup);

test('render ErrorPane without messages', () => {
   const testErrorMessages = [];
   const { getByTestId } = render(<ErrorPane errorMessages={testErrorMessages} />);
   expect(getByTestId('errorpane')).toBeInTheDocument();
})

test('render ErrorPane', async () => {
   const testErrorMessages = ['Test error pane', 'Another error test'];
   const { getByTestId } = render(<ErrorPane errorMessages={testErrorMessages} />);
   expect(getByTestId('errorpane')).toBeInTheDocument();
   await wait(() => expect(getByTestId('errormessage')).toBeInTheDocument());
})