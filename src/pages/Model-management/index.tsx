import {TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import React, {useState, useEffect} from 'react';
import CSelect from 'components/CSelect';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {modelManagementSelector} from 'app/selectors';
import {activateModel, deleteModelFile, getAllModelData} from './modelManagementSlice';
import {handleLoading} from 'app/globalSlice';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';
import {getDataParams} from 'utils/helpers/getDataParams';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

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
    id: 'epoch',
    padding: 'normal',
    label: 'Epoch',
    align: 'left'
  },
  {id: 'Action', label: 'Thao tác', align: 'center', padding: 'none'}
];

const ModelManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {modelData} = useAppSelector(modelManagementSelector);
  const [modelType, setModelType] = useState<string>('defaultValue');
  const [region, setRegion] = useState<string>('defaultValue');
  const displayData = modelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
    return {
      ...data,
      action: (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleActivate(data.model_name);
          }}
        >
          <ArrowCircleUpIcon />
        </IconButton>
      )
    };
  });

  const handleModelChange = (e: any) => setModelType(e.target.value);
  const handleRegionChange = (e: any) => setRegion(e.target.value);

  const handleDelete = async (selectedIds: string[]) => {
    try {
      dispatch(handleLoading(true));
      for (const data of selectedIds) {
        const [id, modelType] = data.split(' ');
        await dispatch(deleteModelFile({id: Number(id), modelType}));
      }
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

  const handleActivate = async (id: string) => {
    try {
      dispatch(handleLoading(true));
      await dispatch(activateModel(id));
      customToast(ToastType.SUCCESS, 'Kích hoạt thành công');
    } catch (e: any) {
      customToast(ToastType.ERROR, 'Có lỗi vừa xảy ra, xin hãy thử lại');
    } finally {
      dispatch(handleLoading(false));
    }
  };

  useEffect(() => {
    try {
      dispatch(handleLoading(true));
      const fetchData = async () => {
        const params = getDataParams(region, modelType);
        await dispatch(getAllModelData(params));
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (error) {
      console.error(error);
      dispatch(handleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelType, region]);

  return (
    <main className='model-management'>
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
          <CTableToolbar tableTitle='Model Management' selected={selected} handleDelete={handleDelete} />
          <CTable
            data={displayData}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            handleClick={handleClick}
            handleSelectAllClick={handleSelectAllClick}
            isSelected={isSelected}
            handleAction={handleActivate}
          />
          <CPagination
            maxLength={modelData.length}
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
