import React from 'react';
import {TableHead, TableRow, TableCell} from '@mui/material';
import CCheckbox from 'components/CCheckbox';
import {TableHeadCell} from 'pages/interface';

interface Props {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: TableHeadCell[];
  isHavingAction?: boolean;
}

const CTableHead = (props: Props) => {
  const {onSelectAllClick, numSelected, rowCount, headCells} = props;

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
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.padding}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CTableHead;
