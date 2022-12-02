import React from 'react';
import CTableHead from 'components/CTableHead';
import {Table, TableBody, TableCell, TableRow, TableContainer} from '@mui/material';
import CCheckbox from 'components/CCheckbox';
import EditIcon from '@mui/icons-material/Edit';
interface Props {
  page: number;
  rowsPerPage: number;
  data: any[];
  headCells: any[];
  viewData?: (id: string) => void;
  setSelected: (selected: string[]) => void;
  selected: string[];
}

const CTable = (props: Props) => {
  const {data, headCells, page, rowsPerPage, setSelected, selected} = props;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.version);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const isItemSelected = isSelected(row.version);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.version)}
                role='checkbox'
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.version}
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
                {Object.values(row).map((cell: any, idx) => {
                  return (
                    <TableCell key={`cell-${idx}`} align='left'>
                      {cell}
                    </TableCell>
                  );
                })}
                <TableCell align='center' padding='checkbox'>
                  <EditIcon />
                </TableCell>
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