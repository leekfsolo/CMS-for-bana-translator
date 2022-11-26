import {Button, ButtonProps} from '@mui/material';
import classNames from 'classnames';
import React from 'react';

interface Props extends ButtonProps {}

const CButton = (props: Props) => {
  const {children, color = 'primary', variant = 'contained', disabled, className} = props;
  const buttonClassname = classNames(
    'cbutton',
    `cbutton-${variant}-${color}`,
    {
      'cbutton-disabled': disabled
    },
    className
  );

  return (
    <Button {...props} id='cbutton' className={buttonClassname}>
      {children}
    </Button>
  );
};

export default CButton;
