import React from 'react';
import {CheckboxProps, Checkbox} from '@mui/material';

interface Props extends CheckboxProps {}

const CCheckbox = (props: Props) => {
  return <Checkbox {...props} />;
};

export default CCheckbox;
