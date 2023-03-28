import React, {useLayoutEffect} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from 'app/hooks';
import {regionTypeSelectData} from 'utils/base/constants';
import CSelect from 'components/CSelect';
import CButton from 'components/CButton';
import {updateDataFile} from '../dataManagementSlice';
import {IData} from 'pages/model';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import CInput from 'components/CInput';

type SubmitDataProps = {
  nosample: number;
  region: string;
  filename: string;
};

interface Props {
  open: boolean;
  handleClose: () => void;
  dataValue: Partial<IData>;
  handleUpdate: () => Promise<void>;
}

const defaultValues: SubmitDataProps = {
  nosample: 0,
  filename: '',
  region: 'defaultValue'
};

const EditForm = (props: Props) => {
  const {open, handleClose, dataValue, handleUpdate} = props;

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
    try {
      const res: any = await dispatch(updateDataFile({...data, id: dataValue.filename})).unwrap();

      if (res && res.msg === 'done') {
        customToast(ToastType.SUCCESS, 'Thay đổi thành công');
        handleUpdate();
        handleClose();
      } else customToast(ToastType.ERROR, 'Thay đổi thất bại');
    } catch (err: any) {
      const {status} = err;

      if (status === 405) {
        customToast(ToastType.ERROR, 'Tập dữ liệu đang được sử dụng');
      } else if (status === 409) {
        customToast(ToastType.ERROR, 'Tên tập dữ liệu bị trùng, vui lòng nhập tên khác');
      } else {
        customToast(ToastType.ERROR, 'Thay đổi thất bại');
      }
    }
  };

  useLayoutEffect(() => {
    const {nosample, region, filename} = dataValue;
    if (nosample) setValue('nosample', nosample);
    if (region) setValue('region', region);
    if (filename) setValue('filename', filename);
  }, [dataValue]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      fullWidth={true}
      maxWidth='xs'
      className='dialog dialog-form'
    >
      <DialogTitle className='d-flex justify-content-between'>
        Chỉnh sửa tập dữ liệu
        <CloseIcon onClick={handleClose} />
      </DialogTitle>
      <form onSubmit={handleSubmit(onValidSubmit)} method='POST' action='#' noValidate className='dialog-form '>
        <DialogContent className='d-flex flex-column gap-4'>
          <Controller
            name='filename'
            control={control}
            render={({field}) => (
              <CInput
                {...field}
                className='w-100'
                placeholder='Điền tên tập dữ liệu'
                size='medium'
                label='Tên tập dữ liệu'
              />
            )}
          />

          <Controller
            name='nosample'
            control={control}
            render={({field}) => (
              <CInput {...field} className='w-100' placeholder='Nhập số sample' size='medium' label='Samples' />
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
                size='medium'
              />
            )}
          />
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
