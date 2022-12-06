import React, {useState} from 'react';
import {FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {PageUrl} from 'configuration/enum';
import Config from 'configuration';
import CInput from 'components/CInput';
import {IFormLogin} from 'pages/interface';
import CButton from 'components/CButton';
import {Logo} from 'assets';
import {useTransition, animated} from 'react-spring';

const Login = () => {
  const {handleSubmit} = useForm<IFormLogin>();
  const navigate = useNavigate();
  const [isHoverBtn, setIsHoverBtn] = useState<boolean>(false);
  const arrowTransitions = useTransition(isHoverBtn, {
    from: {opacity: 0, transform: 'translate(-100%, 50%)'},
    enter: {opacity: 1, transform: 'translate(0, 50%)'},
    leave: {opacity: 0, transform: 'translate(50%, 50%)'}
  });

  const submitFormHandler: SubmitHandler<IFormLogin> = (data) => {
    // Just for test
    localStorage.setItem(Config.storageKey.auth, 'test');
    navigate(`../${PageUrl.HOME}`);
  };

  return (
    <div className='auth-content__login'>
      <div className='login-header'>
        <img src={Logo} alt='bach khoa HCMC' />
        <h1 className='text-center'>Đăng Nhập</h1>
      </div>

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
                <span>Tên tài khoản</span>
              </InputLabel>
              <CInput
                id='username'
                name='username'
                placeholder='Email, tên người dùng,...'
                type='text'
                className='mb-2'
              />
            </FormGroup>

            <FormGroup className='login-form__group'>
              <InputLabel htmlFor='password'>
                <LockIcon />
                <span>Mật khẩu</span>
              </InputLabel>
              <CInput
                id='password'
                placeholder='Vui lòng nhập mật khẩu của bạn'
                type='password'
                endicon={<VisibilityIcon />}
                className='mb-1'
                name='password'
              />
            </FormGroup>
          </FormControl>

          <div className='login-form__support mb-3 d-flex justify-content-between align-items-center'>
            <div className='save-account'>
              <FormControlLabel control={<Checkbox color='default' />} label='Lưu tài khoản' />
            </div>
            <div className='forgot-account'>Quên mật khẩu?</div>
          </div>

          <div
            className='login-form__button w-100 text-center'
            onMouseEnter={() => setIsHoverBtn(true)}
            onMouseLeave={() => setIsHoverBtn(false)}
          >
            <CButton className='py-3 w-100' variant='contained' type='submit' color='inherit'>
              Đăng nhập
            </CButton>

            {arrowTransitions(
              (styles, item) =>
                item && (
                  <animated.div style={styles} className='button-svg px-2'>
                    <ArrowForwardIcon />
                  </animated.div>
                )
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
