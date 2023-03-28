import React, {useLayoutEffect} from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from 'app/hooks';
import {modelTypeSelectData, regionTypeSelectData} from 'utils/base/constants';
import CSelect from 'components/CSelect';
import CButton from 'components/CButton';
import {updateDataFile} from '../dataManagementSlice';
import {IData} from 'pages/model';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import CInput from 'components/CInput';

type SubmitDataProps = {
  nosample: number;
  region: string;
  type: string;
};

interface Props {
  open: boolean;
  handleClose: () => void;
  dataValue: Partial<IData>;
}

const defaultValues: SubmitDataProps = {
  nosample: 0,
  type: 'defaultValue',
  region: 'defaultValue'
};

const EditForm = (props: Props) => {
  const {open, handleClose, dataValue} = props;

  const {
    handleSubmit,
    control,
    setValue,
    formState: {isDirty}
  } = useForm<SubmitDataProps>({
    defaultValues
  });
  const dispatch = useAppDispatch();

  const onValidSubmit: SubmitHandler<SubmitDataProps> = async (data) => {
    const res: any = await dispatch(updateDataFile({filename: dataValue.filename, ...data})).unwrap();

    if (res.msg === 'done') customToast(ToastType.SUCCESS, 'Thay đổi thành công');
    else customToast(ToastType.ERROR, 'Thay đổi thất bại');
  };

  useLayoutEffect(() => {
    const {nosample, region, type} = dataValue;
    if (nosample) setValue('nosample', nosample);
    if (region) setValue('region', region);
    if (type) setValue('type', type);
  }, [dataValue]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      fullWidth={true}
      maxWidth='sm'
      className='dialog dialog-form'
    >
      <DialogTitle className='d-flex justify-content-between'>
        Chỉnh sửa tập dữ liệu
        <CloseIcon onClick={handleClose} />
      </DialogTitle>
      <form onSubmit={handleSubmit(onValidSubmit)} method='POST' action='#' noValidate className='dialog-form'>
        <DialogContent>
          <Box>
            <Box className='control-model d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 gap-3 mb-3'>
              <Controller
                name='type'
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
            </Box>
            <Controller
              name='nosample'
              control={control}
              render={({field}) => (
                <CInput {...field} className='w-100' placeholder='Nhập số sample' size='small' label='Samples' />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions className='d-flex justify-content-end px-4'>
          <CButton size='medium' type='button' variant='text' onClick={handleClose}>
            Đóng
          </CButton>
          <CButton type='submit' disabled={!isDirty}>
            Xác nhận
          </CButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditForm;
