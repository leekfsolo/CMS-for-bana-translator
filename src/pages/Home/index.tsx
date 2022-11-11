import React from 'react';
import MainLayout from 'components/MainLayout';
import {StaffData, StaffHeadCell} from 'pages/interface';
import {Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import CTableToolbar from 'components/CTableToolbar';
import CTableHead from 'components/CTableHead';
import CPagination from 'components/CPagination';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number): StaffData {
  return {
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
];

const headCells: StaffHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)'
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories'
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)'
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)'
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)'
  }
];

const Home = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
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
    <MainLayout>
      <main className='home'>
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
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
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
                          {row.name}
                        </TableCell>
                        <TableCell align='right'>{row.calories}</TableCell>
                        <TableCell align='right'>{row.fat}</TableCell>
                        <TableCell align='right'>{row.carbs}</TableCell>
                        <TableCell align='right'>{row.protein}</TableCell>
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
    </MainLayout>
  );
};

export default Home;
