import React from 'react';
import {Logo} from 'assets';
import Login from './template/Login';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='container-fluid h-100'>
        <div className='row h-100'>
          <div className='col-6 d-none d-md-block'>
            <div className='auth-content'>
              <img src={Logo} alt='logo' />
            </div>
          </div>
          <div className='col'>
            <div className='auth-content flex-column'>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
