import React, {ChangeEvent, useState} from 'react';
import {IDataHead, TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CButton from 'components/CButton';
import CSelect from 'components/CSelect';
import FormDialog from './template/FormDialog';

function createData(version: string, createdDate: string, region: string, quantity: number): IDataHead {
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

const headCells: TableHeadCell[] = [
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
  const [openImportDataForm, setOpenImportDataForm] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClickOpen = () => {
    setOpenImportDataForm(true);
  };

  const handleClose = () => {
    setOpenImportDataForm(false);
    setSelectedFiles([]);
  };

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleRemoveFile = (filename: string) => {
    const newSelectedFiles = selectedFiles.filter((file) => file.name !== filename);
    setSelectedFiles(newSelectedFiles);
  };

  return (
    <main className='data-management'>
      <Box sx={{width: '100%'}}>
        <Box className='data-management__controls d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 w-100'>
          <Box className='control-data d-flex flex-column flex-sm-row align-items-center gap-2 w-100'>
            <div className='control-data__select'>
              <CSelect className='w-100' options={options} placeholder='Data type' size='small' />
            </div>
            <div className='control-data__select'>
              <CSelect className='w-100' options={options} placeholder='Data region' size='small' />
            </div>
          </Box>
          <CButton className='control-import' variant='outlined' onClick={handleClickOpen}>
            + Import Data
          </CButton>

          <FormDialog
            handleClose={handleClose}
            handleRemoveFile={handleRemoveFile}
            handleUploadFiles={handleUploadFiles}
            openImportDataForm={openImportDataForm}
            selectedFiles={selectedFiles}
          />
        </Box>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Data Management' numSelected={selected.length} />
          <CTable
            data={rows}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            setSelected={setSelected}
            manageType='edit'
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
