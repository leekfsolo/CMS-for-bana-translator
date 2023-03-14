import React, {ChangeEvent, useEffect, useState} from 'react';
import {TableHeadCell} from 'pages/interface';
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
import {deleteDataFile, getAllDataData, uploadDataFile} from './dataManagementSlice';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';
import {getDataParams} from 'utils/helpers/getDataParams';
import customToast, {ToastType} from 'components/CustomToast/customToast';

const headCells: TableHeadCell[] = [
  {
    id: 'order',
    disablePadding: true,
    label: 'STT',
    align: 'left'
  },
  {
    id: 'filename',
    disablePadding: false,
    label: 'Tập dữ liệu',
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
    label: 'Loại Data',
    align: 'left'
  }
];

const DataManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [openImportDataForm, setOpenImportDataForm] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {dataData} = useAppSelector(dataManagerSelector);
  const [modelType, setModelType] = useState<string>('defaultValue');
  const [region, setRegion] = useState<string>('defaultValue');

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

  const handleDelete = async () => {
    try {
      dispatch(handleLoading(true));
      for (const id of selected) {
        await dispatch(deleteDataFile(id));
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
      const newSelected = dataData.map((n) => n.id);
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
      const params = getDataParams(region, modelType);

      dispatch(handleLoading(true));
      const fetchData = async () => {
        await dispatch(getAllDataData(params));
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (error) {
      console.log(error);
      dispatch(handleLoading(false));
    }
  }, [region, modelType]);

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
            manageType='edit'
            handleDelete={handleDelete}
            handleClick={handleClick}
            handleSelectAllClick={handleSelectAllClick}
            isSelected={isSelected}
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
