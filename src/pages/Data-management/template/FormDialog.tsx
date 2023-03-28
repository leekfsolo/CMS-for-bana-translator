import React, {ChangeEvent} from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import CloseIcon from '@mui/icons-material/Close';
import PreviewFiles from './PreviewFiles';
import {UploadFile} from 'assets';
import {Dialog, DialogActions, DialogContent, DialogTitle, FormControl} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Box from '@mui/material/Box';
import CButton from 'components/CButton';
import {useAppDispatch} from 'app/hooks';
import {uploadDataFile} from '../dataManagementSlice';
import CSelect from 'components/CSelect';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import CInput from 'components/CInput';

interface Props {
  selectedFiles: File[];
  handleClose: () => void;
  handleUploadFiles: (e: ChangeEvent<HTMLInputElement>) => void;
  openImportDataForm: boolean;
  handleRemoveFile: (filename: string) => void;
  handleUpdate: () => Promise<void>;
}

interface SubmitDataProps {
  files: File[];
  modelType: string;
  region: string;
  nosample: number;
}

const defaultValues = {files: [], modelType: 'nmt', region: 'Gia Lai', nosample: 0};

const FormDialog = (props: Props) => {
  const {selectedFiles, handleClose, handleUploadFiles, openImportDataForm, handleRemoveFile, handleUpdate} = props;
  const {register, handleSubmit, control} = useForm<SubmitDataProps>({
    defaultValues
  });
  const dispatch = useAppDispatch();

  const onValidSubmit: SubmitHandler<SubmitDataProps> = async (data) => {
    const {files, modelType, region, nosample} = data;

    for (const file of files) {
      const formData = new FormData();
      formData.append('region', region);
      formData.append('type', modelType);
      formData.append('nosample', nosample.toString());
      formData.append('training_file', file);
      await dispatch(uploadDataFile(formData));
    }

    customToast(ToastType.SUCCESS, 'Upload dữ liệu thành công');
    handleUpdate();
    handleClose();
  };

  return (
    <Dialog
      open={openImportDataForm}
      onClose={handleClose}
      scroll='paper'
      fullWidth={true}
      maxWidth='sm'
      className='dialog dialog-form'
    >
      <DialogTitle className='d-flex justify-content-between'>
        Tải tập dữ liệu
        <CloseIcon onClick={handleClose} />
      </DialogTitle>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit(onValidSubmit)}
        method='POST'
        action='#'
        noValidate
        className='dialog-form'
      >
        <DialogContent>
          <Box className='control-model d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 px-3 gap-2'>
            <FormControl>
              <Controller
                name='modelType'
                control={control}
                render={({field}) => (
                  <CSelect
                    {...field}
                    className='w-100'
                    options={modelTypeSelectData}
                    placeholder='Chọn loại model'
                    size='small'
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name='region'
                control={control}
                render={({field}) => (
                  <CSelect
                    {...field}
                    className='w-100'
                    options={regionTypeSelectData}
                    placeholder='Chọn vùng'
                    size='small'
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name='nosample'
                control={control}
                render={({field}) => (
                  <CInput
                    {...field}
                    className='w-100'
                    placeholder='Nhập số sample'
                    size='small'
                    label='Samples'
                    type={'number'}
                  />
                )}
              />
            </FormControl>
          </Box>
          <div className='row align-items-center dialog-content'>
            {selectedFiles.length < 10 && (
              <div className='col-12 h-100'>
                <FormGroup className='dialog-content__files'>
                  <p className='files-counting'>{selectedFiles.length}/10</p>
                  <input
                    id='files'
                    type='file'
                    multiple
                    accept='.zip'
                    className='input-files'
                    {...register('files')}
                    onChange={handleUploadFiles}
                  />
                  <Box className='input-content text-center'>
                    <img src={UploadFile} alt='upload file' />
                    <h4>Kéo & Thả</h4>
                    <p className='my-1'>Tệp ở đây hoặc duyệt tệp của bạn</p>
                    <span>Chỉ cho phép các tệp Zip</span>
                  </Box>
                </FormGroup>
              </div>
            )}
            {selectedFiles.length > 0 && (
              <div className='col-12 h-100 mt-4 mt-md-4'>
                <div className='preview-list'>
                  {selectedFiles.map((item, idx) => (
                    <PreviewFiles key={idx} file={item} onRemoveFile={handleRemoveFile} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center px-4'>
          <CButton type='submit' className='w-50'>
            Tải lên
          </CButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
