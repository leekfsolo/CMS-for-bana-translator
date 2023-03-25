import React from 'react';
import {SwitchProps, Switch} from '@mui/material';

interface Props extends SwitchProps {}

const CSwitch = (props: Props) => {
  return <Switch {...props} id='cswitch' />;
};

export default CSwitch;
