import React from 'react';
import {TableHead, TableRow, TableCell} from '@mui/material';
import CCheckbox from 'components/CCheckbox';

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: Array<any>;
}

const CTableHead = (props: EnhancedTableProps) => {
  const {onSelectAllClick, numSelected, rowCount, headCells} = props;
  const headCellsDisplay = headCells.concat({id: 'Action', label: 'Action'});

  return (
    <TableHead className='ctable-head'>
      <TableRow>
        <TableCell padding='checkbox'>
          <CCheckbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCellsDisplay.map((headCell) => (
          <TableCell key={headCell.id} align='left' padding='normal'>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CTableHead;
