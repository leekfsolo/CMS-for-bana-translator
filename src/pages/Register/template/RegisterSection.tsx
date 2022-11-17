import React from 'react';
import {IFormRegister, IRegisterSection} from 'pages/interface';
import RegisterRow from './RegisterRow';
import {Control} from 'react-hook-form';

type Props = {
  section: IRegisterSection;
  control: Control<IFormRegister, any>;
};

const RegisterSection = (props: Props) => {
  const {control, section} = props;
  const {title, items} = section;

  return (
    <div className='register-section'>
      <div className='register-section__title'>
        <h4>{title}</h4>
      </div>

      <div className='register-section__inputs'>
        {items.map((item) => (
          <RegisterRow control={control} row={item} key={item.label} />
        ))}
      </div>
    </div>
  );
};

export default RegisterSection;
