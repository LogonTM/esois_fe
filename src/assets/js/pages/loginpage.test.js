import React from 'react';
import LoginPage from './loginpage';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { wait, getByTestId } from 'dom-testing-library';

afterEach(cleanup);

test('that login page renders as not logged in', () => {
   const getStatus = jest.fn();
   const backToAggregator = jest.fn();
   const toRegistration = jest.fn();
   const getRole = jest.fn();
   const { getAllByPlaceholderText, getByPlaceholderText } = render(
      <LoginPage
         isUserloggedIn={false}
         getStatus={getStatus}
         backToAggregator={backToAggregator}
         toRegistration={toRegistration}
         languageFromMain='ee'
         getRole={getRole}
      />)
   expect(getByPlaceholderText('Kasutajanimi')).toBeInTheDocument();
   expect(getAllByPlaceholderText('Salasõna').length).toBe(1);
})

test('login and register buttons when not logged in', async () => {
   const getStatus = jest.fn();
   const backToAggregator = jest.fn();
   const toRegistration = jest.fn();
   const getRole = jest.fn();
   const { getByText, queryByText, getByPlaceholderText, getByTestId } = render(
      <LoginPage
         isUserloggedIn={false}
         getStatus={getStatus}
         backToAggregator={backToAggregator}
         toRegistration={toRegistration}
         languageFromMain='ee'
         getRole={getRole}
      />)
   expect(getByText('Sisene')).toBeDisabled();
   expect(getByText('Registreeri')).not.toBeDisabled();
   expect(queryByText('Välju')).not.toBeInTheDocument();
   // fireEvent.change(getByPlaceholderText('Kasutajanimi', {target: {value: "test"}}))
   // expect(getByPlaceholderText('Kasutajanimi')).toBe(1);
   // expect(getByText('Sisene')).toBeDisabled();
   // fireEvent.change(getByPlaceholderText('Salasõna', {target: {value: "test1"}}))
   // expect(getByPlaceholderText('Salasõna').value).toBe("test1");
   // await wait(() => expect(getByText('Sisene')).not.toBeDisabled());
})

test('login and register buttons gone when logged in', () => {
   const getStatus = jest.fn();
   const backToAggregator = jest.fn();
   const toRegistration = jest.fn();
   const getRole = jest.fn();
   const { queryByText } = render(
      <LoginPage
         isUserloggedIn={true}
         getStatus={getStatus}
         backToAggregator={backToAggregator}
         toRegistration={toRegistration}
         languageFromMain='ee'
         getRole={getRole}
      />)
   expect(queryByText('Sisene')).not.toBeInTheDocument();
   expect(queryByText('Registreeri')).not.toBeInTheDocument();
   expect(queryByText('Välju')).toBeInTheDocument();
})