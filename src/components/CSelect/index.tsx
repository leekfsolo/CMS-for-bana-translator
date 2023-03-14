import React from 'react';
import {MenuItem, Select, SelectProps} from '@mui/material';
import {SelectDataType} from 'utils/base/model';

interface Props extends SelectProps {
  valid?: boolean;
  options: SelectDataType[];
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
        <MenuItem key={opt.id} value={opt.id}>
          {opt.value}
        </MenuItem>
      ))}
    </Select>
  );
});

export default CSelect;
