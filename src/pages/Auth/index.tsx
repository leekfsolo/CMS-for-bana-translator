import React from 'react';
import {Logo} from 'assets';
import Login from './template/Login';
import LoginDesign from './template/LoginDesign';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='container-fluid h-100'>
        <div className='auth-layout'></div>
        <div className='auth-content'>
          <div className='auth-content__wrapper'>
            <div className='row h-100 w-100 m-0'>
              <div className='login-content col-12 col-lg-6 p-0 d-flex flex-column justify-content-center align-items-center'>
                <div className='auth-logo mt-4'>
                  <img src={Logo} alt='' />
                </div>

                <Login />
              </div>
              <div className='col-12 col-lg-6 p-0 h-100  d-none d-lg-block'>
                <LoginDesign />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
