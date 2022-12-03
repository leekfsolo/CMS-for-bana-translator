import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CTableToolbar from 'components/CTableToolbar';
import {Paper} from '@mui/material';
import {ITrainingHistory, TableHeadCell} from 'pages/interface';
import React, {useState} from 'react';

function createData(
  user: string,
  dataVersion: string,
  dataType: string,
  region: string,
  time: string,
  status: string
): ITrainingHistory {
  return {
    user,
    dataVersion,
    dataType,
    region,
    time,
    status
  };
}

const rows = [
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'waiting'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'pending'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'pending'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'waiting'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'done'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'waiting'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'pending'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'done'),
  createData('Janne Cooper', '1.0.1', 'NMT', 'Binh Dinh', '27/10/2022 10:00 am', 'done')
];

const headCells: TableHeadCell[] = [
  {
    id: 'user',
    disablePadding: true,
    label: 'User',
    align: 'left'
  },
  {
    id: 'dataVersion',
    disablePadding: false,
    label: 'Data Version',
    align: 'left'
  },
  {
    id: 'modelType',
    disablePadding: false,
    label: 'Model Type',
    align: 'left'
  },
  {
    id: 'region',
    disablePadding: false,
    label: 'Region',
    align: 'left'
  },
  {
    id: 'time',
    disablePadding: false,
    label: 'Time',
    align: 'left'
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
    align: 'left'
  }
];

const Dashboard = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <div className='dashboard'>
      <div className='dashboard-overview w-100 d-flex gap-3 justify-content-between mb-4'>
        <div className='dashboard-overview__card'></div>
        <div className='dashboard-overview__card'></div>
      </div>
      <div className='dashboard-training'>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Training History' numSelected={selected.length} />
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
      </div>
    </div>
  );
};

export default Dashboard;
