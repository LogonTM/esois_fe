import React from 'react';
import LoginPage from './loginpage';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

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
   const { getByText, queryByText } = render(
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