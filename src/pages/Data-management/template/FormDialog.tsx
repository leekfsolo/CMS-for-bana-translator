import React, {ChangeEvent} from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import CloseIcon from '@mui/icons-material/Close';
import PreviewFiles from './PreviewFiles';
import {NoContent, UploadFile} from 'assets';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import Box from '@mui/material/Box';
import CButton from 'components/CButton';

interface Props {
  selectedFiles: File[];
  handleClose: () => void;
  handleUploadFiles: (e: ChangeEvent<HTMLInputElement>) => void;
  openImportDataForm: boolean;
  handleRemoveFile: (filename: string) => void;
}

const FormDialog = (props: Props) => {
  const {selectedFiles, handleClose, handleUploadFiles, openImportDataForm, handleRemoveFile} = props;
  const {register, handleSubmit} = useForm<{files: File[]}>({defaultValues: {files: []}});

  const onValidSubmit: SubmitHandler<{files: File[]}> = (data) => {
    console.log(data);
  };

  return (
    <Dialog
      open={openImportDataForm}
      onClose={handleClose}
      scroll='paper'
      fullWidth={true}
      maxWidth='md'
      className='dialog'
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
          <div className='row align-items-center dialog-content'>
            <div className='col-12 col-md-6 h-100'>
              <FormGroup className='dialog-content__files'>
                <input
                  id='files'
                  type='file'
                  multiple
                  accept='.csv, .txt'
                  className='input-files'
                  {...register('files')}
                  onChange={handleUploadFiles}
                />
                <Box className='input-content text-center'>
                  <img src={UploadFile} alt='upload file' />
                  <h4>Drag & Drop</h4>
                  <p className='my-1'>Files here or browse your file</p>
                  <span>Only CSV and TXT files with max size of 15 MB</span>
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
        <DialogActions className='d-flex justify-content-center px-4'>
          <CButton type='submit' className='w-50'>
            Upload
          </CButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
