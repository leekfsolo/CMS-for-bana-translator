import React from 'react';
import {MenuItem, Select, SelectProps} from '@mui/material';

interface Props extends SelectProps {
  valid?: boolean;
  options: string[];
}

const CSelect = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const {options, placeholder, className, value, valid = true} = props;

  return (
    <Select
      {...Object.assign({}, props, {valid: undefined})}
      className={`cinput ${className} cinput-${valid ? 'valid' : 'invalid'}`}
      ref={ref}
      fullWidth
      value={value ? value : 'defaultValue'}
    >
      <MenuItem sx={{fontStyle: 'italic'}} value='defaultValue' disabled>
        <em>{placeholder || 'placeholder'}</em>
      </MenuItem>
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );
});

export default CSelect;
