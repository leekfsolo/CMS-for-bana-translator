import React from 'react';
import CTableHead from 'components/CTableHead';
import {Table, TableBody, TableCell, TableRow, TableContainer} from '@mui/material';

interface Props {
  page: number;
  rowsPerPage: number;
  data: any[];
  headCells: any[];
  viewData?: (id: string) => void;
}

const CTable = (props: Props) => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const {data, headCells, page, rowsPerPage, viewData} = props;

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <TableContainer>
      <Table aria-labelledby='customer' size='medium' sx={{borderCollapse: 'collapse'}}>
        <CTableHead
          headCells={headCells}
          numSelected={selected.length}
          rowCount={data.length}
          onSelectAllClick={handleSelectAllClick}
        />
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            return (
              <TableRow hover role='checkbox' tabIndex={-1} key={row.customerId} sx={{cursor: 'pointer'}}>
                {Object.keys(row).map((cell: any, idx) => {
                  return (
                    <TableCell key={`cell-${cell}-${idx}`} align='left'>
                      {row[cell]}
                    </TableCell>
                  );
                })}
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
