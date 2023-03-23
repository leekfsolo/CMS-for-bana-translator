import React from 'react';
import CTableHead from 'components/CTableHead';
import {Table, TableBody, TableContainer} from '@mui/material';

import {TableHeadCell} from 'pages/interface';
import CTableRow from 'components/CTableRow';
interface Props {
  page: number;
  rowsPerPage: number;
  data: any[];
  headCells: TableHeadCell[];
  viewData?: (id: string) => void;
  isSelected: (id: string) => boolean;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string[];
}

const CTable = (props: Props) => {
  const {data, headCells, selected, handleSelectAllClick, isSelected, handleClick} = props;

  return (
    <TableContainer>
      <Table sx={{minWidth: 750}} aria-labelledby='tableTitle' size='medium'>
        <CTableHead
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={data.length}
          headCells={headCells}
        />
        <TableBody>
          {data.map((row, index) => {
            const {id} = row;
            const isItemSelected = isSelected(id);

            return (
              <CTableRow row={row} key={index} isSelected={isItemSelected} index={index} handleClick={handleClick} />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
