import React, {ChangeEvent} from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import CloseIcon from '@mui/icons-material/Close';
import PreviewFiles from './PreviewFiles';
import {NoContent, UploadFile} from 'assets';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Box from '@mui/material/Box';
import CButton from 'components/CButton';
import {handleLoading} from 'app/globalSlice';
import {useAppDispatch} from 'app/hooks';
import {uploadDataFile} from '../dataManagementSlice';
import CSelect from 'components/CSelect';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';

interface Props {
  selectedFiles: File[];
  handleClose: () => void;
  handleUploadFiles: (e: ChangeEvent<HTMLInputElement>) => void;
  openImportDataForm: boolean;
  handleRemoveFile: (filename: string) => void;
}

interface SubmitDataProps {
  files: File[];
  modelType: string;
  region: string;
}

const defaultValues = {files: [], modelType: 'nmt', region: 'Gia Lai'};

const FormDialog = (props: Props) => {
  const {selectedFiles, handleClose, handleUploadFiles, openImportDataForm, handleRemoveFile} = props;
  const {register, handleSubmit, control} = useForm<SubmitDataProps>({
    defaultValues
  });
  const dispatch = useAppDispatch();

  const onValidSubmit: SubmitHandler<SubmitDataProps> = async (data) => {
    const {files, modelType, region} = data;

    for (const file of files) {
      const formData = new FormData();
      formData.append('region', region);
      formData.append('type', modelType);
      formData.append('nosample', '1000');
      formData.append('training_file', file);
      await dispatch(uploadDataFile(formData));
    }
  };

  return (
    <Dialog
      open={openImportDataForm}
      onClose={handleClose}
      scroll='paper'
      fullWidth={true}
      maxWidth='md'
      className='dialog dialog-form'
    >
      <DialogTitle className='d-flex justify-content-between'>
        Upload data
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
          <Box className='control-model d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 ps-3'>
            <div className='d-flex align-items-center gap-2'>
              <div className='control-model__select'>
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
              </div>
              <div className='control-model__select'>
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
              </div>
            </div>
            <CButton type='submit'>Upload</CButton>
          </Box>
          <div className='row align-items-center dialog-content'>
            <div className='col-12 col-md-6 h-100'>
              <FormGroup className='dialog-content__files'>
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
                  <h4>Drag & Drop</h4>
                  <p className='my-1'>Files here or browse your file</p>
                  <span>Only Zip files are allowed</span>
                </Box>
              </FormGroup>
            </div>

            <div className='col-12 col-md-6 h-100 mt-4 mt-md-0'>
              <div className='preview-list'>
                {selectedFiles.length > 0 ? (
                  selectedFiles.map((item, idx) => (
                    <PreviewFiles key={idx} file={item} onRemoveFile={handleRemoveFile} />
                  ))
                ) : (
                  <div className='h-100 d-flex flex-column align-items-center no-content'>
                    <p className='my-4'>No Files Chosen</p>
                    <img src={NoContent} alt='no files chosen' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default FormDialog;
