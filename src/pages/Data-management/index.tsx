import React from 'react';
import {StaffData, StaffHeadCell} from 'pages/interface';
import {Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import CTableToolbar from 'components/CTableToolbar';
import CTableHead from 'components/CTableHead';
import CPagination from 'components/CPagination';

function createData(version: string, createdDate: string, region: string, quantity: number): StaffData {
  return {
    version,
    createdDate,
    region,
    quantity
  };
}

const rows = [
  createData('Cupcake', '305', '3.7', 67),
  createData('Donut', '452', '25.0', 51),
  createData('Eclair', '262', '16.0', 24),
  createData('Frozen yoghurt', '159', '6.0', 24),
  createData('Gingerbread', '356', '16.0', 49),
  createData('Honeycomb', '408', '3.2', 87),
  createData('Ice cream sandwich', '', '237', 9.0),
  createData('Jelly Bean', '375', '0.0', 94),
  createData('KitKat', '518', '26.0', 65),
  createData('Lollipop', '392', '0.2', 98),
  createData('Marshmallow', '318', '0', 81),
  createData('Nougat', '360', '19.0', 9),
  createData('Oreo', '437', '18.0', 63)
];

const headCells: StaffHeadCell[] = [
  {
    id: 'version',
    disablePadding: true,
    label: 'Version'
  },
  {
    id: 'createdDate',
    disablePadding: false,
    label: 'Created Date'
  },
  {
    id: 'region',
    disablePadding: false,
    label: 'Region'
  },
  {
    id: 'quantity',
    disablePadding: false,
    label: 'Quantity'
  }
];
const DataManagement = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.version);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <main className='dashboard'>
      <Box sx={{width: '100%'}}>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{minWidth: 750}} aria-labelledby='tableTitle' size='medium'>
              <CTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.version}
                      </TableCell>
                      <TableCell align='left'>{row.createdDate}</TableCell>
                      <TableCell align='left'>{row.region}</TableCell>
                      <TableCell align='left'>{row.quantity}</TableCell>
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
          <CPagination
            maxLength={rows.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Paper>
      </Box>
    </main>
  );
};

export default DataManagement;
