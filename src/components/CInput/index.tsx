import {Box, InputAdornment, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import React, {HTMLInputTypeAttribute} from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {TextFieldProps} from '@mui/material/TextField';

type Props = {
  field: any;
  placeholder: string;
  id: string;
  label?: {upper: boolean; content: string; svg: JSX.Element};
  type?: HTMLInputTypeAttribute;
  className?: string;
  endIcon?: React.ReactElement;
  startIcon?: React.ReactElement;
  options?: string[];
};

const CInput = (props: Props) => {
  const {field, id, label, placeholder, startIcon = null, endIcon = null, type = 'text', className, options} = props;

  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const textFieldProps: TextFieldProps = {
    label: label && label.upper ? null : label?.content,
    placeholder,
    ...field,
    value: field.value || '',
    InputProps: {
      startAdornment: startIcon && <InputAdornment position='start'>{startIcon}</InputAdornment>,
      endAdornment: endIcon && (
        <InputAdornment position='end'>
          {type === 'text' ? (
            <>{endIcon}</>
          ) : (
            <Box sx={{cursor: 'pointer'}} onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? endIcon : <VisibilityOffIcon />}
            </Box>
          )}
        </InputAdornment>
      )
    },
    type: type === 'text' ? type : isShowPassword ? 'text' : 'password',
    className,
    variant: 'outlined',
    fullWidth: true
  };

  return (
    <>
      {label && label.upper && (
        <InputLabel htmlFor={id}>
          {label.svg}
          <span>{label.content}</span>
        </InputLabel>
      )}

      {options ? (
        <Select className='w-100' {...field} defaultValue='default'>
          <MenuItem value='default' disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField {...textFieldProps} />
      )}
    </>
  );
};

export default CInput;
