import {ButtonProps, FormControlLabel} from '@mui/material';
import CButton from 'components/CButton';
import CCheckbox from 'components/CCheckbox';
import React from 'react';

export interface actionBarControlButtonsProps extends ButtonProps {
  label: string;
}

interface Props {
  selectedRows?: number;
  rowCount?: number;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  actionBarControlButtons?: actionBarControlButtonsProps[];
}

const ActionBar = (props: Props) => {
  const {handleSelectAllClick, actionBarControlButtons = [], selectedRows = 0, rowCount = 0} = props;

  return (
    <div className='action-bar'>
      {handleSelectAllClick && (
        <FormControlLabel
          control={
            <CCheckbox
              onChange={handleSelectAllClick}
              color='primary'
              indeterminate={selectedRows > 0 && selectedRows < rowCount}
              checked={rowCount > 0 && selectedRows === rowCount}
              inputProps={{
                'aria-label': 'select all data'
              }}
            />
          }
          label='Chọn tất cả'
        />
      )}

      <div className='action-bar__control'>
        {actionBarControlButtons.map((button) => (
          <CButton key={button.label} {...button}>
            {button.label}
          </CButton>
        ))}
      </div>
    </div>
  );
};

export default ActionBar;
