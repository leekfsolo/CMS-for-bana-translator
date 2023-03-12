import CButton from 'components/CButton';
import CSelect from 'components/CSelect';
import React, {useState, useEffect} from 'react';
import {SelectChangeEvent, LinearProgress} from '@mui/material';
import {ITrainingOptionSelect} from 'pages/interface';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import CInput from 'components/CInput';
import {addTask, getAllNMTModelData, getAllTTSModelData} from './trainingSlice';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ITaskUpload} from 'pages/model';
import {trainingSelector} from 'app/selectors';

const defaultValues: ITaskUpload = {
  ckpt: '',
  epoch: '',
  filename: '',
  modelType: '',
  region: '',
  taskType: ''
};

const Training = () => {
  const dispatch = useAppDispatch();
  const training = useAppSelector(trainingSelector);
  const {modelData} = training;
  const {handleSubmit, control, watch, reset} = useForm<ITaskUpload>({defaultValues});
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const watchAllFields = watch();
  const modelTypeData = watchAllFields['modelType'];
  const canStartRunning = Object.values(watchAllFields).every((value) => value !== '');

  const trainingOptions: ITrainingOptionSelect[] = [
    {title: 'Loại Model', options: ['nmt', 'tts'], name: 'modelType', placeholder: 'Chọn loại model'},
    {
      title: 'Tập dữ liệu',
      options: modelData.map((data) => data.model_name),
      name: 'filename',
      placeholder: 'Chọn tập dữ liệu'
    },
    {
      title: 'Vùng',
      options: ['Gia Lai', 'Kon Tum', 'Bình Định'],
      name: 'region',
      placeholder: 'Chọn vùng'
    },
    {
      title: 'File Checkpoint',
      options: modelData.map((data) => data.ckpt_file),
      name: 'ckpt',
      placeholder: 'Chọn file checkpoint'
    },
    {title: 'Loại task', options: ['train', 'test'], name: 'taskType', placeholder: 'Chọn loại task'},
    {title: 'Epoch', name: 'epoch', placeholder: 'Chọn số epoch'}
  ];

  const resetOptions = () => reset(defaultValues);
  const startRunning: SubmitHandler<ITaskUpload> = async (data) => {
    setIsRunning(true);
    try {
      // Running Model
      await dispatch(addTask(data));
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (modelTypeData && modelTypeData.length > 0) {
      if (modelTypeData === 'nmt') {
        dispatch(getAllNMTModelData());
      } else {
        dispatch(getAllTTSModelData());
      }
    }
  }, [modelTypeData]);

  return (
    <div className='training'>
      <form noValidate method='POST' action='#' onSubmit={handleSubmit(startRunning)}>
        <div className='container-fluid m-0 p-0'>
          <div className='row justify-content-between m-0'>
            {trainingOptions.map((input) => {
              const {title, name, placeholder, options} = input;

              return (
                <div key={name} className='training-filter col-5 p-0'>
                  <p className='mb-2'>{title}</p>
                  <Controller
                    name={name}
                    control={control}
                    render={({field}) =>
                      options ? (
                        <CSelect
                          {...field}
                          options={options}
                          size='small'
                          variant='standard'
                          disabled={isRunning}
                          placeholder={placeholder}
                        />
                      ) : (
                        <CInput
                          {...field}
                          size='small'
                          variant='standard'
                          disabled={isRunning}
                          placeholder={placeholder}
                        />
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className='training-controls d-flex flex-column flex-sm-row justify-content-end align-items-start align-items-sm-center gap-2'>
          <CButton type='reset' variant='contained' color='error' onClick={resetOptions}>
            Reset
          </CButton>
          <CButton variant='contained' color='success' disabled={!canStartRunning} type='submit'>
            Start
          </CButton>
        </div>
      </form>

      <div className='training-output my-3'>
        <div className='training-output__progress'>{isRunning && <LinearProgress />}</div>

        <div className='training-output__content'></div>
      </div>
      <div className='training-cancel d-flex justify-content-end'>
        <CButton variant='outlined' color='primary'>
          Cancel
        </CButton>
      </div>
    </div>
  );
};

export default Training;
