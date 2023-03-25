import React from 'react';
import Login from './template/Login';
import LoginLayout from './template/LoginLayout';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='container-fluid h-100 p-0'>
        <LoginLayout>
          <div className='auth-content'>
            <Login />
          </div>
        </LoginLayout>
      </div>
    </div>
  );
};

export default Auth;
