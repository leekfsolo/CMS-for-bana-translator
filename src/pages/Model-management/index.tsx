import {TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import React, {useState, useEffect} from 'react';
import CSelect from 'components/CSelect';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {modelManagementSelector} from 'app/selectors';
import {deleteModelFile, getAllModelData} from './modelManagementSlice';
import {handleLoading} from 'app/globalSlice';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';
import {getDataParams} from 'utils/helpers/getDataParams';
import customToast, {ToastType} from 'components/CustomToast/customToast';

const headCells: TableHeadCell[] = [
  {
    id: 'stt',
    disablePadding: true,
    label: 'STT',
    align: 'left'
  },
  {
    id: 'model_name',
    disablePadding: false,
    label: 'Model',
    align: 'left'
  },
  {
    id: 'createdDate',
    disablePadding: false,
    label: 'Ngày tạo',
    align: 'left'
  },
  {
    id: 'region',
    disablePadding: false,
    label: 'Vùng',
    align: 'left'
  },
  {
    id: 'dataVersion',
    disablePadding: false,
    label: 'Tập dữ liệu',
    align: 'left'
  },
  {
    id: 'accuracy',
    disablePadding: false,
    label: 'Loại model',
    align: 'left'
  },
  {
    id: 'epoch',
    disablePadding: false,
    label: 'Epoch',
    align: 'left'
  }
];

const ModelManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {modelData} = useAppSelector(modelManagementSelector);
  const [modelType, setModelType] = useState<string>('defaultValue');
  const [region, setRegion] = useState<string>('defaultValue');

  const handleModelChange = (e: any) => setModelType(e.target.value);
  const handleRegionChange = (e: any) => setRegion(e.target.value);

  const handleDelete = async () => {
    try {
      dispatch(handleLoading(true));
      for (const data of selected) {
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
      const newSelected = modelData.map((n) => {
        return `${n.id} ${n.model_type}`;
      });
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
          <CTableToolbar tableTitle='Model Management' numSelected={selected.length} />
          <CTable
            data={modelData}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            handleDelete={handleDelete}
            handleClick={handleClick}
            handleSelectAllClick={handleSelectAllClick}
            isSelected={isSelected}
            manageType='activate'
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
