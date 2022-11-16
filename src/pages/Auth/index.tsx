import React from 'react';
import {Logo} from 'assets';
import Login from './template/Login';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='container-fluid h-100'>
        <div className='row align-items-start align-items-lg-center'>
          <div className='col-12 col-lg-5'>
            <div className='auth-content'>
              <img src={Logo} alt='logo' className='auth-content__logo img-fluid' />
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
