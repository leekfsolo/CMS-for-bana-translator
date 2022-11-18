import React from 'react';
import {Button} from '@mui/material';
import {IFormRegister, IRegisterInput, IRegisterSection} from 'pages/interface';
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {FormGroup} from '@mui/material';
import CInput from 'components/CInput';

type Props = {
  registerSections: IRegisterSection[];
};

const defaultValues: IFormRegister = {
  accountRole: 'default',
  confirmPassword: '',
  password: '',
  username: '',
  fullname: '',
  phone: ''
};

const RegisterForm = (props: Props) => {
  const {registerSections} = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors}
  } = useForm<IFormRegister>({defaultValues});

  const onValidSubmit: SubmitHandler<IFormRegister> = (data) => {
    // Just for test
    reset(defaultValues);
  };
  const onInvalidSubmit: SubmitErrorHandler<IFormRegister> = (data, event) => {
    console.log(data);
    event?.target.classList.add('wasvalidated');
  };

  const rulesValidation = (item: IRegisterInput) => {
    if (item.name === 'phone') {
      console.log('test');
      return {pattern: {value: /\d{10}/, message: 'invalid phone number'}};
    }
    return {
      required: {value: item.required, message: 'Required Field'}
    };
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
                    <Controller
                      control={control}
                      name={item.name}
                      rules={rulesValidation(item)}
                      render={({field}) => (
                        <>
                          {item.options ? (
                            <></>
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
                    {errors[item.name] && <span className='error'>{errors[item.name]?.message}</span>}
                  </div>
                </div>
              );
            })}
          </FormGroup>
        </div>
      ))}

      <div className='register-button'>
        <Button type='submit' variant='outlined'>
          Create
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
