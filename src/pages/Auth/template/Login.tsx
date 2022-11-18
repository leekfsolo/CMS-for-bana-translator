import React from 'react';
import {FormControl, Button, InputLabel, FormGroup} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {PageUrl} from 'configuration/enum';
import Config from 'configuration';
import CInput from 'components/CInput';
import {IFormLogin} from 'pages/interface';

const Login = () => {
  const {handleSubmit} = useForm<IFormLogin>();
  const navigate = useNavigate();

  const submitFormHandler: SubmitHandler<IFormLogin> = (data) => {
    // Just for test
    localStorage.setItem(Config.storageKey.auth, 'test');
    navigate(`../${PageUrl.HOME}`);
  };

  return (
    <div className='auth-content__login w-100'>
      <h1 className='text-center d-none d-lg-block'>HỆ THỐNG QUẢN LÝ MODEL CHO DỊCH VÀ PHÁT ÂM TIẾNG BANA</h1>

      <div className='login-wrapper'>
        <form
          className='login-form w-100'
          onSubmit={handleSubmit(submitFormHandler)}
          method='POST'
          action='#'
          noValidate
        >
          <FormControl variant='standard' className='w-100 d-flex flex-column'>
            <FormGroup className='login-form__group mb-4'>
              <InputLabel htmlFor='username'>
                <PersonIcon />
                <span>Username</span>
              </InputLabel>
              <CInput id='username' name='username' placeholder='example@gmail.com' type='text' className='mb-4' />
            </FormGroup>

            <FormGroup className='login-form__group'>
              <InputLabel htmlFor='password'>
                <LockIcon />
                <span>Password</span>
              </InputLabel>
              <CInput
                id='password'
                placeholder='password'
                type='password'
                endicon={<VisibilityIcon />}
                className='mb-4'
                name='password'
              />
            </FormGroup>

            <div className='login-form__forgotpassword'>Quên mật khẩu?</div>

            <div className='login-form__button w-100 text-center'>
              <Button className='py-3' variant='contained' type='submit'>
                Đăng nhập
              </Button>
            </div>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Login;
