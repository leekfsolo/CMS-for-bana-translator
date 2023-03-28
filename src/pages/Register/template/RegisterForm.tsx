import React from 'react';
import {Box, FormHelperText} from '@mui/material';
import {IFormRegister, IRegisterInput, IRegisterSection} from 'pages/interface';
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {FormGroup} from '@mui/material';
import CInput from 'components/CInput';
import CSelect from 'components/CSelect';
import CButton from 'components/CButton';
import {useAppDispatch} from 'app/hooks';
import {registerUser} from '../registerSlice';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import {handleLoading} from 'app/globalSlice';

type Props = {
  registerSections: IRegisterSection[];
};

const defaultValues: IFormRegister = {
  accountRole: 'defaultValue',
  confirmPassword: '',
  password: '',
  username: '',
  fullname: '',
  phone: ''
};

const RegisterForm = (props: Props) => {
  const {registerSections} = props;
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
    getValues
  } = useForm<IFormRegister>({defaultValues});

  const onValidSubmit: SubmitHandler<IFormRegister> = async (data) => {
    // Just for test
    dispatch(handleLoading(true));
    try {
      const res: any = await dispatch(registerUser(data)).unwrap();
      const {msg, isSuccess = true} = res;

      if (isSuccess) {
        customToast(ToastType.SUCCESS, msg);
      } else customToast(ToastType.ERROR, msg);

      reset(defaultValues);
      dispatch(handleLoading(false));
    } catch (e: any) {
      reset(defaultValues);
      dispatch(handleLoading(false));
      customToast(ToastType.ERROR, e.message);
    }
  };
  const onInvalidSubmit: SubmitErrorHandler<IFormRegister> = (data, event) => {
    event?.target.classList.add('wasvalidated');
  };

  const rulesValidation = (item: IRegisterInput) => {
    let validator = {required: {value: item.required, message: 'Trường này bắt buộc'}};
    if (item.name === 'phone') {
      Object.assign(validator, {pattern: {value: /\d{10}/, message: 'Số điện thoại không hợp lệ'}});
    }
    if (item.name === 'accountRole') {
      Object.assign(validator, {validate: (value: string) => value !== 'defaultValue' || 'Trường này bắt buộc'});
    }
    if (item.name === 'confirmPassword') {
      Object.assign(validator, {
        validate: (value: string) => value === getValues('password') || 'Mật khẩu không khớp'
      });
    }

    return validator;
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)} method='POST' action='#' noValidate>
      {registerSections.map((section) => (
        <div className='register-section' key={section.title}>
          <div className='register-section__title'>
            <h4>{section.title}</h4>
          </div>

          <FormGroup className='register-section__inputs'>
            {section.items.map((item) => {
              return (
                <div key={item.id} className='input-row w-100'>
                  <div className='input-row__label'>
                    <label htmlFor={item.id}>
                      {item.label}
                      {item.required && <span className='required'>*</span>}
                    </label>
                  </div>
                  <div className='input-row__field'>
                    <Box sx={{position: 'relative'}}>
                      <Controller
                        control={control}
                        name={item.name}
                        rules={rulesValidation(item)}
                        render={({field}) => (
                          <>
                            {item.options ? (
                              <CSelect
                                {...field}
                                id={item.id}
                                placeholder={item.placeholder}
                                options={item.options}
                                valid={!errors[item.name]}
                              />
                            ) : (
                              <CInput
                                {...field}
                                id={item.id}
                                placeholder={item.placeholder}
                                type={item.type}
                                valid={!errors[item.name]}
                              />
                            )}
                          </>
                        )}
                      />
                      {errors[item.name] && (
                        <FormHelperText className='form-helper-text'>{errors[item.name]?.message}</FormHelperText>
                      )}
                    </Box>
                  </div>
                </div>
              );
            })}
          </FormGroup>
        </div>
      ))}

      <div className='register-button'>
        <CButton type='submit' variant='outlined'>
          Xác nhận
        </CButton>
      </div>
    </form>
  );
};

export default RegisterForm;
