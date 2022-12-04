import {LoginScreen} from 'assets';
import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const LoginLayout = (props: Props) => {
  return (
    <div className='login-layout h-100'>
      <div className='login-layout__design'>
        <div className='img-bottom-left'></div>
        <img className='img-vector' src={LoginScreen} alt='' />
        <div className='img-top-right'></div>
      </div>
      {props.children}
    </div>
  );
};

export default LoginLayout;
