import React from 'react';
import EditUser from './edituser';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('render EditUser', () => {
   const getUserList = jest.fn();
   const handleAccountState = jest.fn();
   const handleChange = jest.fn();
   const { getByTestId, getByDisplayValue } = render(
      <EditUser
         languageFromMain='ee'
         getUserList={getUserList}
         handleAccountState={handleAccountState}
         handleChange={handleChange}
         oneUserId={1}
         oneUserName='Test Person'
         oneUserEmail='test@test.ee'
         oneUserAccountstate={true}
         oneUserRole={['ROLE_USER']}
         availableRoles={['ROLE_USER', 'ROLE_ADMIN']}
      />);
   expect(getByTestId('edit-user')).toBeInTheDocument();
   expect(getByDisplayValue('Test Person')).toBeInTheDocument();
})

test('change user roles', () => {
   const getUserList = jest.fn();
   const handleAccountState = jest.fn();
   const handleChange = jest.fn();
   const userrole = [{id: 1, name: 'ROLE_USER'}];
   const roles = [{id: 1, name: 'ROLE_USER'}, {id: 2, name: 'ROLE_ADMIN'}];
   const { getByTestId, getByDisplayValue } = render(
      <EditUser
         languageFromMain='ee'
         getUserList={getUserList}
         handleAccountState={handleAccountState}
         handleChange={handleChange}
         oneUserId={1}
         oneUserName='Test Person'
         oneUserEmail='test@test.ee'
         oneUserAccountstate={true}
         oneUserRole={userrole}
         availableRoles={roles}
      />);
   expect(getByTestId('edit-user')).toBeInTheDocument();
   const tavakasutaja = getByDisplayValue('Tavakasutaja');
   const admin = getByDisplayValue('Admin');
   expect(tavakasutaja).toBeInTheDocument();
   expect(admin).toBeInTheDocument();
   // not valid because state of role gets set to null ?
   expect(tavakasutaja.className).toBe("form-control input-lg is-invalid");
   fireEvent.click(getByTestId('edit-ROLE_USER'));
   expect(tavakasutaja.className).toBe("form-control input-lg is-valid")
   fireEvent.click(getByTestId('edit-ROLE_USER'));
   expect(tavakasutaja.className).toBe("form-control input-lg is-invalid");
   expect(admin.className).toBe("form-control input-lg is-invalid");
   fireEvent.click(getByTestId('edit-ROLE_ADMIN'));
   expect(admin.className).toBe("form-control input-lg is-valid");
   fireEvent.click(getByTestId('edit-ROLE_USER'));
   expect(tavakasutaja.className).toBe("form-control input-lg is-valid")
   fireEvent.click(getByTestId('edit-ROLE_ADMIN'));
   expect(admin.className).toBe("form-control input-lg is-invalid");
   fireEvent.click(getByTestId('edit-ROLE_ADMIN'));
   expect(admin.className).toBe("form-control input-lg is-valid");
   fireEvent.click(getByTestId('edit-ROLE_USER'));
   expect(tavakasutaja.className).toBe("form-control input-lg is-invalid");
   fireEvent.click(getByTestId('edit-ROLE_ADMIN'));
   expect(admin.className).toBe("form-control input-lg is-invalid");
})