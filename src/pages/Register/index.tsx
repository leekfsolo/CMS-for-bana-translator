import React from 'react';
import RegisterForm from './template/RegisterForm';

const Register = () => {
  return (
    <div className='register'>
      <div className='container'>
        <div className='register-header'>Create Account</div>

        <div className='register-form'>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
