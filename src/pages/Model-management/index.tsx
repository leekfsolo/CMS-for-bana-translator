import {TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import React, {useState, useEffect} from 'react';
import CSelect from 'components/CSelect';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {modelManagementSelector} from 'app/selectors';
import {getAllModelData, getAllNMTModelData, getAllTTSModelData} from './modelManagementSlice';
import {handleLoading} from 'app/globalSlice';

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

const modelTypeSelectData = ['NMT', 'TTS'];
const regionTypeSelectData = ['Gia Lai', 'Kon Tum', 'Bình Định'];

const ModelManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {modelData} = useAppSelector(modelManagementSelector);
  const [modelType, setModelType] = useState<string>('default');
  const [region, setRegion] = useState<string>('default');

  const handleModelChange = (e: any) => setModelType(e.target.value);
  const handleRegionChange = (e: any) => setRegion(e.target.value);

  useEffect(() => {
    try {
      dispatch(handleLoading(true));
      const fetchData = async () => {
        await dispatch(
          modelType === 'default'
            ? getAllModelData()
            : modelType === 'NMT'
            ? getAllNMTModelData()
            : getAllTTSModelData()
        );
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (error) {
      console.error(error);
      dispatch(handleLoading(false));
    }
  }, [modelType]);

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
            setSelected={setSelected}
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
