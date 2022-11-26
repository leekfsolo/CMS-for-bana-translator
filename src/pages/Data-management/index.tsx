import React, {useState} from 'react';
import {StaffData, StaffHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CButton from 'components/CButton';
import CSelect from 'components/CSelect/CSelect';

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
    label: 'Version',
    align: 'left'
  },
  {
    id: 'createdDate',
    disablePadding: false,
    label: 'Created Date',
    align: 'left'
  },
  {
    id: 'region',
    disablePadding: false,
    label: 'Region',
    align: 'left'
  },
  {
    id: 'quantity',
    disablePadding: false,
    label: 'Quantity',
    align: 'left'
  }
];
const options: string[] = [];
const DataManagement = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <main className='dashboard'>
      <Box sx={{width: '100%'}}>
        <Box className='d-flex justify-content-between align-items-center mb-4'>
          <Box className='d-flex align-items-center gap-2'>
            <CSelect options={options} placeholder='Data type' size='small' />
            <CSelect options={options} placeholder='Data region' size='small' />
          </Box>
          <CButton variant='outlined'>+ Import Data</CButton>
        </Box>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar numSelected={selected.length} />
          <CTable
            data={rows}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            setSelected={setSelected}
          />
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
