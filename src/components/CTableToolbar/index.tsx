import React from 'react';
import {Toolbar, Typography} from '@mui/material';

interface Props {
  tableTitle: string;
}

const CTableToolbar = (props: Props) => {
  const {tableTitle} = props;

  return (
    <Toolbar className='table-toolbar'>
      <Typography sx={{flex: '1 1 100%'}} variant='h6' id='tableTitle' component='div'>
        {tableTitle}
      </Typography>
    </Toolbar>
  );
};

export default CTableToolbar;
