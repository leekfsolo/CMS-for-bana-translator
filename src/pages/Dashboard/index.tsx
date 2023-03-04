import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CTableToolbar from 'components/CTableToolbar';
import {Paper} from '@mui/material';
import {ITrainingHistory, TableHeadCell} from 'pages/interface';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import CampaignIcon from '@mui/icons-material/Campaign';
import QueueIcon from '@mui/icons-material/Queue';
import {useAppDispatch} from 'app/hooks';
import {getMyInfo} from 'pages/Auth/authSlice';
import {handleLoading} from 'app/globalSlice';

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
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cardProgressInnerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (cardProgressInnerRef.current) {
        cardProgressInnerRef.current.style.width = '50%';
      }
    }, 200);
  }, []);

  useEffect(() => {
    dispatch(handleLoading(true));

    try {
      const fetchData = async () => {
        await dispatch(getMyInfo());
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard-overview w-100 d-flex flex-wrap gap-3 justify-content-between mb-3'>
        <div className='dashboard-overview__card card-translate'>
          <div className='card-info d-flex align-items-center mb-3'>
            <p className='m-0 pe-1'>NMT</p>
            <span className='ps-1 card-version'>1.0.1</span>
          </div>

          <div className='card-icon d-flex align-items-center gap-3'>
            <div className='card-icon__svg'>
              <TranslateIcon />
            </div>

            <div className='card-extend'>
              <p className='card-extend__accuracy mb-1'>
                Accuracy: <span>93.8%</span>
              </p>
              <p className='card-extend__date'>
                Training date: <span>10/21/2022</span>
              </p>
            </div>
          </div>
        </div>
        <div className='dashboard-overview__card card-speech'>
          <div className='card-info d-flex align-items-center mb-3'>
            <p className='m-0 pe-1'>TTS</p>
            <span className='ps-1 card-version'>1.0.1</span>
          </div>

          <div className='card-icon d-flex align-items-center gap-3'>
            <div className='card-icon__svg'>
              <CampaignIcon />
            </div>

            <div className='card-extend'>
              <p className='card-extend__accuracy mb-1'>
                Accuracy: <span>93.8%</span>
              </p>
              <p className='card-extend__date'>
                Training date: <span>10/21/2022</span>
              </p>
            </div>
          </div>
        </div>
        <div className='dashboard-overview__card card-queue'>
          <div className='card-info d-flex align-items-center mb-3 justify-content-between'>
            <p className='m-0 pe-1'>Training Queue</p>
            <div className='queue-count'>
              <span className='current-count'>4</span>
              <span className='max-count'>/8</span>
            </div>
          </div>

          <div className='card-icon d-flex align-items-center gap-4'>
            <div className='card-icon__svg'>
              <QueueIcon />
            </div>
            <div className='card-progress'>
              <div className='progress-inner' ref={cardProgressInnerRef}></div>
            </div>
          </div>
        </div>
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
