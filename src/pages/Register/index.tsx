import {IRegisterSection} from 'pages/interface';
import React from 'react';
import RegisterForm from './template/RegisterForm';

const Register = () => {
  const registerSections: IRegisterSection[] = [
    {
      title: 'Profile Configuration',
      items: [
        {
          label: 'Username',
          id: 'username',
          name: 'username',
          required: true,
          placeholder: 'Enter your username',
          type: 'text'
        },
        {
          label: 'Full name',
          id: 'fullname',
          name: 'fullname',
          required: false,
          placeholder: 'Nguyen Van A',
          type: 'text'
        },
        {label: 'Phone number', id: 'phone', name: 'phone', required: false, placeholder: '0123456789', type: 'text'}
      ]
    },
    {
      title: 'Password Configuration',
      items: [
        {
          label: 'Password',
          id: 'password',
          name: 'password',
          required: true,
          placeholder: 'Enter your password',
          type: 'password'
        },
        {
          label: 'Confirmation',
          id: 'confirm-password',
          name: 'confirmPassword',
          required: true,
          placeholder: 'Confirm password',
          type: 'password'
        }
      ]
    },
    {
      title: 'Access Settings',
      items: [
        {
          label: 'Account role',
          id: 'account-role',
          name: 'accountRole',
          required: true,
          placeholder: 'role',
          type: 'text',
          options: [
            {id: 'admin', value: 'admin'},
            {id: 'sub-admin', value: 'sub-admin'}
          ]
        }
      ]
    }
  ];

  return (
    <div className='register'>
      <RegisterForm registerSections={registerSections} />
    </div>
  );
};

export default Register;
