import React from 'react';
import {FormControl, Button, TextField, Box, InputLabel} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface IFormLogin {
  username: string;
  password: string;
}

const Login = () => {
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const {handleSubmit, control} = useForm<IFormLogin>();
  const navigate = useNavigate();

  const navigateTo = (destination: string) => {
    navigate(destination);
  };

  const submitFormHandler: SubmitHandler<IFormLogin> = (data) => {};

  return (
    <div className='auth-content__login w-100'>
      <h1 className='text-center'>HỆ THỐNG QUẢN LÝ MODEL CHO DỊCH VÀ PHÁT ÂM TIẾNG BANA</h1>

      <form className='login-form w-100' onSubmit={handleSubmit(submitFormHandler)} method='POST' action='#' noValidate>
        <FormControl variant='standard' className='w-100 d-flex flex-column'>
          <Controller
            name='username'
            control={control}
            render={({field}) => (
              <Box className='login-form__input mb-4'>
                <InputLabel htmlFor='username'>
                  <PersonIcon />
                  <span>Tài Khoản</span>
                </InputLabel>
                <TextField
                  className='mb-4'
                  variant='outlined'
                  placeholder='example@gmail.com'
                  {...field}
                  value={field.value || ''}
                  id='username'
                  fullWidth
                />
              </Box>
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({field}) => (
              <Box className='login-form__input'>
                <InputLabel htmlFor='password'>
                  <LockIcon />
                  <span>Mật khẩu</span>
                </InputLabel>
                <Box sx={{position: 'relative'}}>
                  <TextField
                    className='mb-4'
                    variant='outlined'
                    placeholder='password'
                    type={isShowPassword ? 'text' : 'password'}
                    {...field}
                    value={field.value || ''}
                    id='password'
                    fullWidth
                  />
                  <div className='show-password' onClick={() => setIsShowPassword(!isShowPassword)}>
                    {isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </Box>
              </Box>
            )}
          />

          <div className='login-form__forgotpassword'>Quên mật khẩu?</div>

          <div className='login-form__button w-100 text-center'>
            <Button className='py-3' variant='contained' type='submit'>
              {/* {t('auth.signin')} */}
              Đăng nhập
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Login;
