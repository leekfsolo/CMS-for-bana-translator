import React from 'react';
import {IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  tableTitle: string;
  selected: string[];
  handleDelete?: (id: string[]) => Promise<void>;
}

const CTableToolbar = (props: Props) => {
  const {tableTitle, selected, handleDelete} = props;

  return (
    <Toolbar className='table-toolbar'>
      <Typography sx={{flex: '1 1 100%'}} variant='h6' id='tableTitle' component='div'>
        {tableTitle}
      </Typography>
      {selected.length > 0 && handleDelete && (
        <Tooltip className='table-toolbar__delete' title='Delete'>
          <IconButton onClick={() => handleDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default CTableToolbar;
