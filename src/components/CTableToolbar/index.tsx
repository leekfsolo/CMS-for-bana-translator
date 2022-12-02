import React from 'react';
import {IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  tableTitle: string;
  numSelected: number;
}

const CTableToolbar = (props: Props) => {
  const {tableTitle, numSelected} = props;

  return (
    <Toolbar className='table-toolbar'>
      {numSelected > 0 ? (
        <Typography sx={{flex: '1 1 100%'}} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{flex: '1 1 100%'}} variant='h6' id='tableTitle' component='div'>
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip className='table-toolbar__delete' title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default CTableToolbar;
