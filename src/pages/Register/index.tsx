import {IRegisterSection} from 'pages/interface';
import React from 'react';
import RegisterForm from './template/RegisterForm';

const Register = () => {
  const registerSections: IRegisterSection[] = [
    {
      title: 'Cài đặt hồ sơ',
      items: [
        {
          label: 'Tên tài khoản',
          id: 'username',
          name: 'username',
          required: true,
          placeholder: 'johnasvsd, abcxyz,...',
          type: 'text'
        },
        {
          label: 'Họ và tên',
          id: 'fullname',
          name: 'fullname',
          required: false,
          placeholder: 'Nguyen Van A',
          type: 'text'
        },
        {label: 'Số điện thoại', id: 'phone', name: 'phone', required: false, placeholder: '0123456789', type: 'text'}
      ]
    },
    {
      title: 'Cài đặt mật khẩu',
      items: [
        {
          label: 'Mật khẩu',
          id: 'password',
          name: 'password',
          required: true,
          placeholder: 'Mật khẩu',
          type: 'password'
        },
        {
          label: 'Xác nhận mật khẩu',
          id: 'confirm-password',
          name: 'confirmPassword',
          required: true,
          placeholder: 'Xác nhận mật khẩu',
          type: 'password'
        }
      ]
    },
    {
      title: 'Cài đặt vai trò',
      items: [
        {
          label: 'Vai trò tài khoản',
          id: 'account-role',
          name: 'accountRole',
          required: true,
          placeholder: 'Chọn vai trò',
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
