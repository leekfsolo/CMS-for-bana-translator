import React, {HTMLInputTypeAttribute} from 'react';

type Props = {
  label: string;
  type: HTMLInputTypeAttribute;
};

const RegisterRow = (props: Props) => {
  const {label, type} = props;

  return <div>RegisterRow</div>;
};

export default RegisterRow;
