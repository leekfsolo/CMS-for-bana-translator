import React from 'react';
import {IFormRegister, IRegisterInput} from 'pages/interface';
import {Control, Controller} from 'react-hook-form';
import CInput from 'components/CInput';

type Props = {
  row: IRegisterInput;
  control: Control<IFormRegister, any>;
};

const RegisterRow = (props: Props) => {
  const {control, row} = props;
  const {label, type, placeholder, required, options, id, name} = row;

  return (
    <div className='input-row w-100'>
      <div className='input-row__label'>
        <label htmlFor={id}>
          {label}
          {required && <span className='required'>*</span>}
        </label>
      </div>
      <div className='input-row__field'>
        <Controller
          control={control}
          name={name}
          render={({field}) => <CInput field={field} id={id} placeholder={placeholder} type={type} options={options} />}
        />
      </div>
    </div>
  );
};

export default RegisterRow;
