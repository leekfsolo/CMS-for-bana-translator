import React, {ChangeEvent, useEffect, useState} from 'react';
import {IDataHead, TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CButton from 'components/CButton';
import CSelect from 'components/CSelect';
import FormDialog from './template/FormDialog';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {handleLoading} from 'app/globalSlice';
import {dataManagerSelector} from 'app/selectors';
import {getAllDataData, uploadDataFile} from './dataManagementSlice';

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
    id: 'quantity',
    disablePadding: false,
    label: 'Số lượng',
    align: 'left'
  },
  {
    id: 'type',
    disablePadding: false,
    label: 'Loại',
    align: 'left'
  }
];
const modelTypeSelectData = ['NMT', 'TTS'];
const regionTypeSelectData = ['Gia Lai', 'Kon Tum', 'Bình Định'];
const DataManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [openImportDataForm, setOpenImportDataForm] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {dataData} = useAppSelector(dataManagerSelector);
  const [modelType, setModelType] = useState<string>('default');
  const [region, setRegion] = useState<string>('default');

  const handleModelChange = (e: any) => setModelType(e.target.value);
  const handleRegionchange = (e: any) => setRegion(e.target.value);

  const handleClickOpen = () => {
    setOpenImportDataForm(true);
  };

  const handleClose = () => {
    setOpenImportDataForm(false);
    setSelectedFiles([]);
  };

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleRemoveFile = (filename: string) => {
    const newSelectedFiles = selectedFiles.filter((file) => file.name !== filename);
    setSelectedFiles(newSelectedFiles);
  };

  useEffect(() => {
    try {
      dispatch(handleLoading(true));
      const fetchData = async () => {
        await dispatch(getAllDataData());
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (error) {
      console.log(error);
      dispatch(handleLoading(false));
    }
  }, []);
  console.log(dataData);
  return (
    <main className='data-management'>
      <Box sx={{width: '100%'}}>
        <Box className='data-management__controls d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 w-100'>
          <Box className='control-data d-flex flex-column flex-sm-row align-items-center gap-2 w-100'>
            <div className='control-data__select'>
              <CSelect
                className='w-100'
                options={modelTypeSelectData}
                placeholder='Chọn loại dữ liệu'
                size='small'
                value={modelType}
                onChange={handleModelChange}
              />
            </div>
            <div className='control-data__select'>
              <CSelect
                className='w-100'
                options={regionTypeSelectData}
                placeholder='Chọn vùng'
                size='small'
                value={region}
                onChange={handleRegionchange}
              />
            </div>
          </Box>
          <CButton className='control-import' variant='outlined' onClick={handleClickOpen}>
            + Import Data
          </CButton>

          <FormDialog
            region={region}
            modelType={modelType}
            handleClose={handleClose}
            handleRemoveFile={handleRemoveFile}
            handleUploadFiles={handleUploadFiles}
            openImportDataForm={openImportDataForm}
            selectedFiles={selectedFiles}
          />
        </Box>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Data Management' numSelected={selected.length} />
          <CTable
            data={dataData}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            setSelected={setSelected}
            manageType='edit'
          />
          <CPagination
            maxLength={dataData.length}
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

export default DataManagement;
