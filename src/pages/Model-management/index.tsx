import {StaffHeadCell, StaffModel} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import React, {useState} from 'react';
import CSelect from 'components/CSelect';
import CButton from 'components/CButton';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';

function createData(
  version: string,
  dataVersion: string,
  createdDate: string,
  region: string,
  accuracy: number,
  epoch: number
): StaffModel {
  return {
    version,
    dataVersion,
    createdDate,
    region,
    accuracy,
    epoch
  };
}

const rows = [
  createData('1.0.1', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.0.2', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.0.3', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.0.4', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.0.5', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.0.6', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.1.1', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.1.2', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.1.3', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.2.0', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.2.1', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2),
  createData('1.3.1', '1.0.1', '2022-10-10', 'Binh Dinh', 90, 2)
];

const headCells: StaffHeadCell[] = [
  {
    id: 'version',
    disablePadding: true,
    label: 'Version',
    align: 'left'
  },
  {
    id: 'dataVersion',
    disablePadding: false,
    label: 'Data Version',
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
    id: 'accuracy',
    disablePadding: false,
    label: 'Accuracy',
    align: 'left'
  },
  {
    id: 'epoch',
    disablePadding: false,
    label: 'Epoch',
    align: 'left'
  }
];

const options: string[] = [];

const ModelManagement = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <main className='model-management'>
      <Box sx={{width: '100%'}}>
        <Box className='model-management__controls d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 w-100'>
          <Box className='control-model d-flex flex-column flex-sm-row align-items-center gap-2 w-100'>
            <div className='control-model__select'>
              <CSelect className='w-100' options={options} placeholder='Model type' size='small' />
            </div>
            <div className='control-model__select'>
              <CSelect className='w-100' options={options} placeholder='Model region' size='small' />
            </div>
          </Box>
        </Box>

        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Model Management' numSelected={selected.length} />
          <CTable
            data={rows}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            setSelected={setSelected}
            manageType='model'
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

export default ModelManagement;
