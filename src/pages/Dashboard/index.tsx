import {TableHeadCell} from 'pages/interface';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {getMyInfo} from 'pages/Auth/authSlice';
import {handleLoading} from 'app/globalSlice';
import {cancelTask, deleteTask, getTotalTasks, getTotalTasksInQueue} from './dashboardSlice';
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
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [modelContent, setModelContent] = useState<CModalProps>();
  const cardProgressInnerRef = useRef<HTMLDivElement | null>(null);
  const dashboard = useAppSelector(dashboardSelector);
  const {tasksData, totalTasks} = dashboard;

  const handleAction = async ({type, payload}: IHandleActionParams) => {
    const modalPopupState: CModalProps = {
      closeText: 'Đóng',
      content: '',
      title: 'Xác nhận'
    };

    let contentText = '';

    switch (type) {
      case ActionType.LOG:
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
          maxWidth: 'xs'
        });
        contentText = 'Bạn có chắc chắn hủy task này?';
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
          maxWidth: 'xs'
        });
        contentText = 'Bạn có chắc chắn xóa task này?';
        break;
      default:
        break;
    }

    modalPopupState.content = (
      <div className='d-flex justify-content-center align-items-center gap-2 modal-delete'>{contentText}</div>
    );

    setModelContent(modalPopupState);
  };

  const displayData = tasksData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
    const {status} = data;
    let tableRowActions: IRowAction[] = [
      {
        icon: <AssignmentIcon />,
        actionType: ActionType.LOG,
        title: 'Xem chi tiết',
        handle: handleAction
      },
      {
        icon: <DeleteIcon />,
        actionType: ActionType.DELETE,
        title: 'Xóa Task',
        handle: handleAction
      }
    ];

    if (status === 'processing' || status === 'waiting') {
      tableRowActions.splice(1, 0, {
        icon: <DoNotDisturbIcon />,
        actionType: ActionType.CANCEL,
        title: 'Hủy Task',
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
        cardProgressInnerRef.current.style.width = `${Math.floor(totalTasks / tasksData.length)}%`;
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

  const canceledTasks = displayData
    .filter((task) => task.status === 'processing' || task.status === 'waiting')
    .map((task) => task.id);
  const selectedCanceledTasks = selected.filter((id) => canceledTasks.includes(id));

  const actionBarControlButtons: actionBarControlButtonsProps[] = [
    {
      label: `Xóa tất cả (${formatQuantity(selected.length)})`,
      variant: 'text',
      color: 'error',
      onClick: () => handleDelete(selected)
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
