import {TableHeadCell} from 'pages/interface';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {getMyInfo} from 'pages/Auth/authSlice';
import {handleLoading} from 'app/globalSlice';
import {cancelTask, deleteTask, getCurrentModels, getTotalTasks, getTotalTasksInQueue} from './dashboardSlice';
import {dashboardSelector} from 'app/selectors';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';
import {IHandleActionParams, IRowAction} from 'components/interface';
import {ActionType} from 'configuration/enum';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {CModalProps} from 'components/CModal/CModal';
import DashboardMainView, {DashboardMainViewProps} from './DashboardMainView';
import {actionBarControlButtonsProps} from 'components/ActionBar/ActionBar';
import {formatQuantity} from 'utils/helpers/formatQuantity';
import CInput from 'components/CInput';
import {IconButton, Skeleton} from '@mui/material';

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
    label: 'bleu score',
    align: 'left'
  },
  {align: 'left', label: 'diff_loss', padding: 'normal', id: 'diff_loss'},
  {align: 'left', label: 'dur_loss', padding: 'normal', id: 'dur_loss'},
  {align: 'left', label: 'prior_loss', padding: 'normal', id: 'prior_loss'},
  {
    id: 'state',
    padding: 'normal',
    label: 'Trạng thái',
    align: 'left'
  },
  {id: 'Action', label: 'Thao tác', align: 'center', padding: 'normal'}
];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [modelContent, setModelContent] = useState<CModalProps>();
  const cardProgressInnerRef = useRef<HTMLDivElement | null>(null);
  const dashboard = useAppSelector(dashboardSelector);
  const {tasksData, totalTasks} = dashboard;

  const handleAction = async ({type, payload}: IHandleActionParams) => {
    const modalPopupState: CModalProps = {
      closeText: 'Đóng',
      content: ''
    };

    switch (type) {
      case ActionType.LOG:
        Object.assign(modalPopupState, {
          title: 'Task Log',
          content: (
            <div className='d-flex flex-column justify-content-center gap-2 w-100 mt-3 log-textarea'>
              <CInput id='log-input' rows={15} className='w-100' InputLabelProps={{shrink: true}} multiline disabled />
              <div className='log-textarea__loading' id='log-loading'>
                {Array(10)
                  .fill(0)
                  .map((_, idx) => (
                    <Skeleton key={idx} animation={'wave'} />
                  ))}
              </div>
            </div>
          ),
          handleClose: () => source.close()
        });

        const source = new EventSource(`https://bahnar.dscilab.site:20007/api/queue/stream_log_task/${payload[0]}`);

        source.onmessage = (e: MessageEvent<any>) => {
          const {data} = e;
          const log = document.getElementById('log-input') as HTMLTextAreaElement;
          const loadingLog = document.getElementById('log-loading');

          loadingLog?.classList.add('d-none');

          let logValue = log?.value;

          if (data[0] === '{') {
            const msg = e.data.slice(1, e.data.length - 1);
            logValue += msg + '\n';
          } else {
            logValue += data.replaceAll('[ENTER_CHAR]', '\n') + '\n';
          }

          log.value = logValue;
          log.scrollTop = log.scrollHeight;
        };
        source.onerror = (e) => source.close();

        break;
      case ActionType.CANCEL:
        Object.assign(modalPopupState, {
          handleConfirm: async () => {
            dispatch(handleLoading(true));
            for (const id of payload) {
              await dispatch(cancelTask(id));
            }
            customToast(ToastType.SUCCESS, 'Hủy task thành công');
            dispatch(handleLoading(false));
            handleUpdate();
          },
          confirmText: 'Hủy',
          maxWidth: 'xs',
          title: 'Xác nhận'
        });
        modalPopupState.content = (
          <div className='d-flex justify-content-center align-items-center gap-2 mt-3'>
            Bạn có chắc chắn hủy task này?
          </div>
        );
        break;
      case ActionType.DELETE:
        Object.assign(modalPopupState, {
          handleConfirm: async () => {
            dispatch(handleLoading(true));
            for (const id of payload) {
              await dispatch(deleteTask({taskID: [id]}));
            }
            customToast(ToastType.SUCCESS, 'Xóa task thành công');
            dispatch(handleLoading(false));
            handleUpdate();
          },
          confirmText: 'Xóa',
          maxWidth: 'xs',
          title: 'Xác nhận'
        });
        modalPopupState.content = (
          <div className='d-flex justify-content-center align-items-center gap-2 mt-3'>
            Bạn có chắc chắn xóa task này?
          </div>
        );
        break;
      default:
        break;
    }

    setModelContent(modalPopupState);
  };

  const displayData = tasksData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
    const {status} = data;
    let tableRowActions: IRowAction[] = [
      {
        icon: (
          <IconButton disableFocusRipple sx={{padding: '4px'}}>
            <AssignmentIcon />
          </IconButton>
        ),
        actionType: ActionType.LOG,
        title: 'Xem chi tiết',
        handle: handleAction
      }
    ];

    if (status === 'processing' || status === 'waiting') {
      tableRowActions.push({
        icon: (
          <IconButton disableFocusRipple sx={{padding: '4px'}}>
            <DoNotDisturbIcon />
          </IconButton>
        ),
        actionType: ActionType.CANCEL,
        title: 'Hủy Task',
        handle: handleAction
      });
    } else {
      tableRowActions.push({
        icon: (
          <IconButton disableFocusRipple sx={{padding: '4px'}}>
            <DeleteIcon />
          </IconButton>
        ),
        actionType: ActionType.DELETE,
        title: 'Xóa Task',
        handle: handleAction
      });
    }

    return {
      ...data,
      action: tableRowActions
    };
  });

  const handleDelete = async (selectedIds: string[]) => {
    await handleAction({type: ActionType.DELETE, payload: selectedIds});
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = displayData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
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
        cardProgressInnerRef.current.style.width = `${Math.floor((totalTasks / tasksData.length) * 100)}%`;
      }
    }, 200);
  }, [totalTasks, tasksData]);

  const handleUpdate = useCallback(async () => {
    dispatch(handleLoading(true));
    try {
      await dispatch(getTotalTasksInQueue());
      await dispatch(getTotalTasks());
      dispatch(handleLoading(false));
      setSelected([]);
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
      setSelected([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canceledTasks: string[] = [],
    deletedTasks: string[] = [];

  displayData.forEach((task) => {
    if (task.status === 'processing' || task.status === 'waiting') {
      canceledTasks.push(task.id);
    } else deletedTasks.push(task.id);
  });

  const selectedCanceledTasks = selected.filter((id) => canceledTasks.includes(id));
  const selectedDeletedTasks = selected.filter((id) => deletedTasks.includes(id));

  const actionBarControlButtons: actionBarControlButtonsProps[] = [
    {
      label: `Xóa tất cả (${formatQuantity(selectedDeletedTasks.length)})`,
      variant: 'text',
      color: 'error',
      onClick: () => handleDelete(selectedDeletedTasks)
    },
    {
      label: `Hủy tất cả (${formatQuantity(selectedCanceledTasks.length)})`,
      variant: 'contained',
      color: 'warning',
      onClick: () => handleAction({type: ActionType.CANCEL, payload: selectedCanceledTasks})
    }
  ];

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  useEffect(() => {
    dispatch(handleLoading(true));

    try {
      const fetchData = async () => {
        await dispatch(getMyInfo());
        await dispatch(getCurrentModels());
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashboardMainViewProps: DashboardMainViewProps = {
    modelContent,
    dashboardData: dashboard,
    headCells,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    cardRef: cardProgressInnerRef,
    selected,
    handleSelectAllClick,
    isSelected,
    handleClick,
    displayData,
    actionBarControlButtons
  };

  return <DashboardMainView {...dashboardMainViewProps} />;
};

export default Dashboard;
