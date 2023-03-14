import React from 'react';
import CTableHead from 'components/CTableHead';
import {Table, TableBody, TableCell, TableRow, TableContainer} from '@mui/material';
import CCheckbox from 'components/CCheckbox';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {getCellData} from 'utils/helpers/getCellData';
interface Props {
  page: number;
  rowsPerPage: number;
  data: any[];
  headCells: any[];
  viewData?: (id: string) => void;
  manageType?: 'activate' | 'edit';
  handleDelete: () => Promise<void>;
  isSelected: (id: string) => boolean;
  handleClick: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string[];
}

const CTable = (props: Props) => {
  const {
    data,
    headCells,
    page,
    rowsPerPage,
    selected,
    handleSelectAllClick,
    isSelected,
    handleClick,
    manageType = ''
  } = props;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <TableContainer>
      <Table sx={{minWidth: 750}} aria-labelledby='tableTitle' size='medium'>
        <CTableHead
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={data.length}
          headCells={headCells}
          isHavingAction={manageType !== ''}
        />
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            const {id, ...dataRow} = row;
            const displayData = {order: index + 1, ...dataRow};

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
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
                  <TableCell key={`cell-${idx}`} align='left'>
                    <span className={key === 'status' ? `cell-variant cell-variant__${displayData[key]}` : ''}>
                      {getCellData(displayData[key])}
                    </span>
                  </TableCell>
                ))}
                {manageType !== '' && (
                  <TableCell align='center' padding='checkbox'>
                    {manageType === 'activate' ? <ArrowCircleUpIcon /> : <EditIcon />}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
