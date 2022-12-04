import {LoginDown, LoginScreen} from 'assets';
import React from 'react';

const LoginDesign = () => {
  return (
    <div className='login-design h-100'>
      <div className='img-extend'></div>
      <img className='img-vector' src={LoginScreen} alt='' />
      <LoginDown className='img-footer' />
    </div>
  );
};

export default LoginDesign;
