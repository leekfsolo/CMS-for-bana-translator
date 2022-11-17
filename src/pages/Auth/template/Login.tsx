import React from 'react';
import {FormControl, Button, Box} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {PageUrl} from 'configuration/enum';
import Config from 'configuration';
import CInput from 'components/CInput';
import {IFormLogin} from 'pages/interface';

const Login = () => {
  const {handleSubmit, control} = useForm<IFormLogin>();
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
            <Controller
              name='username'
              control={control}
              render={({field}) => (
                <Box className='login-form__input mb-4'>
                  <CInput
                    field={field}
                    id='username'
                    placeholder='example@gmail.com'
                    type='text'
                    label={{upper: true, content: 'Tài Khoản', svg: <PersonIcon />}}
                    className='mb-4'
                  />
                </Box>
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({field}) => (
                <Box className='login-form__input'>
                  <CInput
                    field={field}
                    id='password'
                    placeholder='password'
                    type='password'
                    label={{upper: true, content: 'Mật khẩu', svg: <LockIcon />}}
                    endIcon={<VisibilityIcon />}
                    className='mb-4'
                  />
                </Box>
              )}
            />

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
