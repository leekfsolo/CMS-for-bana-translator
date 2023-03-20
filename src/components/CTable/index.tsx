import React from 'react';
import CTableHead from 'components/CTableHead';
import {Table, TableBody, TableCell, TableRow, TableContainer} from '@mui/material';
import CCheckbox from 'components/CCheckbox';
import {getCellData} from 'utils/helpers/getCellData';
import {TableHeadCell} from 'pages/interface';
interface Props {
  page: number;
  rowsPerPage: number;
  data: any[];
  headCells: TableHeadCell[];
  viewData?: (id: string) => void;
  isSelected: (id: string) => boolean;
  handleClick: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string[];
  handleAction?: (id: string) => Promise<void>;
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
            const {id, ...dataRow} = row;
            const isItemSelected = isSelected(id);
            const labelId = `enhanced-table-checkbox-${index}`;
            const displayData = {order: index + 1, ...dataRow};

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, id)}
                role='checkbox'
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={`row-${index}`}
                selected={isItemSelected}
              >
                <TableCell padding='checkbox'>
                  <CCheckbox
                    color='primary'
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </TableCell>
                {Object.keys(displayData).map((key, idx) => (
                  <TableCell key={`cell-${idx}`} align={idx < Object.keys(displayData).length - 1 ? 'left' : 'center'}>
                    <span className={key === 'status' ? `cell-variant cell-variant__${displayData[key]}` : ''}>
                      {getCellData(displayData[key])}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
