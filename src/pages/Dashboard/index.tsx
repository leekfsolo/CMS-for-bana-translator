import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CTableToolbar from 'components/CTableToolbar';
import {Paper} from '@mui/material';
import {TableHeadCell} from 'pages/interface';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import CampaignIcon from '@mui/icons-material/Campaign';
import QueueIcon from '@mui/icons-material/Queue';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {getMyInfo} from 'pages/Auth/authSlice';
import {handleLoading} from 'app/globalSlice';
import {cancelTask, deleteTask, getTotalTasks, getTotalTasksInQueue} from './dashboardSlice';
import {dashboardSelector} from 'app/selectors';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import IconButton from '@mui/material/IconButton';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells: TableHeadCell[] = [
  {
    id: 'stt',
    padding: 'normal',
    label: 'STT',
    align: 'left'
  },
  {
    id: 'user',
    padding: 'normal',
    label: 'Người thực hiện',
    align: 'left'
  },
  {
    id: 'model_name',
    padding: 'normal',
    label: 'Model',
    align: 'left'
  },
  {
    id: 'filename',
    padding: 'normal',
    label: 'Tập dữ liệu',
    align: 'left'
  },
  {
    id: 'taskType',
    padding: 'normal',
    label: 'Loại task',
    align: 'left'
  },
  {
    id: 'accuracy',
    padding: 'normal',
    label: 'Độ chính xác',
    align: 'left'
  },
  {
    id: 'state',
    padding: 'normal',
    label: 'Trạng thái',
    align: 'left'
  },
  {id: 'Action', label: 'Thao tác', align: 'center', padding: 'none'}
];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cardProgressInnerRef = useRef<HTMLDivElement | null>(null);
  const dashboard = useAppSelector(dashboardSelector);
  const {tasksData, totalTasks} = dashboard;
  const displayData = tasksData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
    const {status, id} = data;

    return {
      ...data,
      action: (
        <div className='d-flex align-items-center justify-content-center'>
          {(status === 'processing' || status === 'waiting') && (
            <IconButton
              disableFocusRipple
              sx={{padding: '4px'}}
              onClick={(e) => {
                e.stopPropagation();
                handleCancelTask(id);
              }}
            >
              <DoNotDisturbIcon />
            </IconButton>
          )}
          <IconButton
            disableFocusRipple
            sx={{padding: '4px'}}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete([id]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    };
  });

  const handleCancelTask = async (id: string) => {
    try {
      dispatch(handleLoading(true));
      await dispatch(cancelTask(id));
      handleUpdate();
      customToast(ToastType.SUCCESS, 'Hủy task thành công');
    } catch (e: any) {
      customToast(ToastType.ERROR, 'Có lỗi vừa xảy ra, xin hãy thử lại');
    } finally {
      dispatch(handleLoading(false));
    }
  };

  const handleDelete = async (selectedIds: string[]) => {
    try {
      dispatch(handleLoading(true));
      for (const id of selectedIds) {
        await dispatch(deleteTask(id));
      }
      handleUpdate();
      customToast(ToastType.SUCCESS, 'Xoá thành công');
    } catch (e: any) {
      customToast(ToastType.ERROR, 'Có lỗi vừa xảy ra, xin hãy thử lại');
    } finally {
      dispatch(handleLoading(false));
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = displayData.map((n) => n.id);
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

  useLayoutEffect(() => {
    setTimeout(() => {
      if (cardProgressInnerRef.current) {
        cardProgressInnerRef.current.style.width = `${Math.floor(totalTasks / tasksData.length)}%`;
      }
    }, 200);
  }, [totalTasks, tasksData]);

  const handleUpdate = async () => {
    try {
      dispatch(handleLoading(true));
      await dispatch(getTotalTasksInQueue());
      await dispatch(getTotalTasks());
      dispatch(handleLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
    }
  };

  useEffect(() => {
    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <span className='current-count'>{totalTasks}</span>
              <span className='max-count'>/{tasksData.length}</span>
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
          <CTableToolbar tableTitle='Lịch sử train' selected={selected} handleDelete={handleDelete} />
          <CTable
            data={displayData}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            handleClick={handleClick}
            handleSelectAllClick={handleSelectAllClick}
            isSelected={isSelected}
          />
          <CPagination
            maxLength={tasksData.length}
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
