import React from 'react';
import RegisterPage from './registerpage';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('that register page renders', () => {
   const backToAggregator = jest.fn();
   const getStatus = jest.fn();
   const getRole = jest.fn();
   const { getByTestId } = render(
      <RegisterPage
         backToAggregator={backToAggregator}
         isUserloggedIn={false}
         getStatus={getStatus}
         languageFromMain='ee'
         getRole={getRole}
      />)
   expect(getByTestId('register-page')).toBeInTheDocument();
})

test('filling fields on register page', () => {
   const backToAggregator = jest.fn();
   const getStatus = jest.fn();
   const getRole = jest.fn();
   const { getByTestId, getByPlaceholderText } = render(
      <RegisterPage
         backToAggregator={backToAggregator}
         isUserloggedIn={false}
         getStatus={getStatus}
         languageFromMain='ee'
         getRole={getRole}
      />)
   const nameField = getByPlaceholderText('Teie täispikk nimi');
   const usernameField = getByPlaceholderText('Teie kasutajanimi');
   const passwordField = getByPlaceholderText('Teie parool');
   const passwordValidationField = getByPlaceholderText('Teie parooli kinnitus');
   const emailField = getByPlaceholderText('Teie e-mail');
   expect(nameField).toBeInTheDocument();
   fireEvent.change(nameField, {target: {value: 'Test Isik'}});
   expect(nameField.value).toBe("Test Isik");
   expect(getByTestId('registerButton')).toBeDisabled();
   fireEvent.change(usernameField, {target: {value: 'TestKasutaja'}});
   expect(usernameField.value).toBe("TestKasutaja");
   fireEvent.change(passwordField, {target: {value: 'TestParool'}});
   expect(passwordField.value).toBe("TestParool");
   fireEvent.change(passwordValidationField, {target: {value: 'TestParool'}});
   expect(passwordValidationField.value).toBe("TestParool");
   fireEvent.change(emailField, {target: {value: 'test@test.ee'}});
   expect(emailField.value).toBe("test@test.ee");
})