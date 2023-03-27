import {TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import React, {useState, useEffect, useCallback, Suspense, lazy} from 'react';
import CSelect from 'components/CSelect';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {modelManagementSelector} from 'app/selectors';
import {activateModel, deleteModelFile, downloadModelFile, getAllModelData} from './modelManagementSlice';
import {handleLoading} from 'app/globalSlice';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';
import {getDataParams} from 'utils/helpers/getDataParams';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {IHandleActionParams} from 'components/interface';
import {CModalProps} from 'components/CModal/CModal';
import {ActionType} from 'configuration/enum';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionBar, {actionBarControlButtonsProps} from 'components/ActionBar/ActionBar';
import {formatQuantity} from 'utils/helpers/formatQuantity';
import DownloadIcon from '@mui/icons-material/Download';
const CModal = lazy(() => import('components/CModal/CModal'));

const ModelManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {modelData} = useAppSelector(modelManagementSelector);
  const [modelType, setModelType] = useState<string>('nmt');
  const [region, setRegion] = useState<string>('defaultValue');
  const [modelContent, setModelContent] = useState<CModalProps>();

  const headCells: TableHeadCell[] = [
    {
      id: 'stt',
      padding: 'normal',
      label: 'STT',
      align: 'left'
    },
    {
      id: 'model_name',
      padding: 'normal',
      label: 'Model',
      align: 'left'
    },
    {
      id: 'createdDate',
      padding: 'normal',
      label: 'Ngày tạo',
      align: 'left'
    },
    {
      id: 'region',
      padding: 'normal',
      label: 'Vùng',
      align: 'left'
    },
    {
      id: 'dataVersion',
      padding: 'normal',
      label: 'Tập dữ liệu',
      align: 'left'
    },
    {
      id: 'accuracy',
      padding: 'normal',
      label: 'Loại model',
      align: 'left'
    },
    {
      id: 'size',
      padding: 'normal',
      label: 'kích thước (MB)',
      align: 'left'
    },
    {
      id: 'epoch',
      padding: 'normal',
      label: 'Epoch',
      align: 'left'
    },
    {id: 'Action', label: 'Thao tác', align: 'center', padding: 'normal'}
  ];

  if (modelType === 'tts') {
    headCells.splice(
      headCells.length - 1,
      0,
      {align: 'left', label: 'diff_loss', padding: 'normal', id: 'diff_loss'},
      {align: 'left', label: 'dur_loss', padding: 'normal', id: 'dur_loss'},
      {align: 'left', label: 'prior_loss', padding: 'normal', id: 'prior_loss'}
    );
  } else {
    headCells.splice(headCells.length - 1, 0, {
      id: 'score',
      padding: 'normal',
      label: 'bleu score',
      align: 'left'
    });
  }

  const handleAction = async ({type, payload}: IHandleActionParams) => {
    const modalPopupState: CModalProps = {
      closeText: 'Đóng',
      content: '',
      title: 'Xác nhận'
    };

    let contentText = '';

    switch (type) {
      case ActionType.DOWNLOAD:
        await dispatch(downloadModelFile(payload[0]));
        break;
      case ActionType.ACTIVATE:
        Object.assign(modalPopupState, {
          handleConfirm: async () => {
            dispatch(handleLoading(true));
            for (const id of payload) {
              await dispatch(activateModel(id));
            }
            customToast(ToastType.SUCCESS, 'Kích hoạt thành công');
            dispatch(handleLoading(false));
            handleUpdate();
          },
          confirmText: 'Xác nhận',
          maxWidth: 'xs'
        });
        contentText = 'Bạn có chắc chắn chọn model này?';
        break;
      case ActionType.DELETE:
        Object.assign(modalPopupState, {
          handleConfirm: async () => {
            dispatch(handleLoading(true));
            for (const data of payload) {
              await dispatch(deleteModelFile({name: data}));
            }
            customToast(ToastType.SUCCESS, 'Xoá thành công');
            dispatch(handleLoading(false));
            handleUpdate();
          },
          confirmText: 'Xóa',
          maxWidth: 'xs'
        });
        contentText = 'Bạn có chắc chắn xóa model này?';
        break;
      default:
        break;
    }

    modalPopupState.content = (
      <div className='d-flex justify-content-center align-items-center gap-2 modal-delete'>{contentText}</div>
    );

    setModelContent(modalPopupState);
  };

  const displayData = modelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
    return {
      ...data,
      action: [
        {
          icon: (
            <IconButton disableFocusRipple sx={{padding: '4px'}}>
              <PowerSettingsNewIcon />
            </IconButton>
          ),
          actionType: ActionType.ACTIVATE,
          title: 'Kích hoạt model',
          handle: handleAction
        },
        {
          icon: (
            <IconButton disableFocusRipple sx={{padding: '4px'}}>
              <DownloadIcon />
            </IconButton>
          ),
          actionType: ActionType.DOWNLOAD,
          title: 'Tải xuống',
          handle: handleAction
        },
        {
          icon: (
            <IconButton disableFocusRipple sx={{padding: '4px'}}>
              <DeleteIcon />
            </IconButton>
          ),
          actionType: ActionType.DELETE,
          title: 'Xóa model',
          handle: handleAction
        }
      ]
    };
  });

  const handleModelChange = (e: any) => setModelType(e.target.value);
  const handleRegionChange = (e: any) => setRegion(e.target.value);

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

  const actionBarControlButtons: actionBarControlButtonsProps[] = [
    {
      label: `Xóa tất cả (${formatQuantity(selected.length)})`,
      variant: 'text',
      color: 'error',
      onClick: () => handleDelete(selected)
    }
  ];

  const handleUpdate = useCallback(async () => {
    dispatch(handleLoading(true));
    try {
      const params = getDataParams(region, modelType);
      await dispatch(getAllModelData(params));
      dispatch(handleLoading(false));
      setSelected([]);
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
    }
  }, [region, modelType]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  return (
    <main className='model-management'>
      <Suspense>{modelContent && <CModal {...modelContent} />}</Suspense>
      <Box sx={{width: '100%'}}>
        <Box className='model-management__controls d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 w-100'>
          <Box className='control-model d-flex flex-column flex-sm-row align-items-center gap-2 w-100'>
            <div className='control-model__select'>
              <CSelect
                className='w-100'
                options={modelTypeSelectData}
                placeholder='Chọn loại model'
                size='small'
                value={modelType}
                onChange={handleModelChange}
              />
            </div>
            <div className='control-model__select'>
              <CSelect
                className='w-100'
                options={regionTypeSelectData}
                placeholder='Chọn vùng'
                size='small'
                value={region}
                onChange={handleRegionChange}
              />
            </div>
          </Box>
        </Box>

        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Quản lý model' />
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
            maxLength={modelData.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Paper>
        {selected.length > 0 && (
          <ActionBar
            handleSelectAllClick={handleSelectAllClick}
            selectedRows={selected.length}
            rowCount={displayData.length}
            actionBarControlButtons={actionBarControlButtons}
          />
        )}
      </Box>
    </main>
  );
};

export default ModelManagement;
