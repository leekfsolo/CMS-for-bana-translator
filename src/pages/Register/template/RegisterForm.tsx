import {Button} from '@mui/material';
import {IFormRegister, IRegisterSection} from 'pages/interface';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import RegisterSection from './RegisterSection';

type Props = {
  registerSections: IRegisterSection[];
};

const RegisterForm = (props: Props) => {
  const {registerSections} = props;
  const {handleSubmit, control} = useForm<IFormRegister>();

  const submitFormHandler: SubmitHandler<IFormRegister> = (data) => {
    // Just for test
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} method='POST' action='#' noValidate>
      {registerSections.map((section) => (
        <RegisterSection control={control} key={section.title} section={section} />
      ))}

      <div className='register-button'>
        <Button variant='outlined'>Create</Button>
      </div>
    </form>
  );
};

export default RegisterForm;
