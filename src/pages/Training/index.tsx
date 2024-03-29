import CButton from 'components/CButton';
import CSelect from 'components/CSelect';
import React, {useEffect} from 'react';
import {ITrainingOptionSelect} from 'pages/interface';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import CInput from 'components/CInput';
import {addTask, getAllDataDetail, getAllModelDetail} from './trainingSlice';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ITaskUpload} from 'pages/model';
import {globalSelector, trainingSelector} from 'app/selectors';
import {modelTypeSelectData, regionTypeSelectData, taskTypeSelectData} from 'utils/base/constants';
import {handleLoading} from 'app/globalSlice';
import {getDataParams} from 'utils/helpers/getDataParams';
import {useNavigate} from 'react-router-dom';
import {PageUrl} from 'configuration/enum';

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
  const navigate = useNavigate();
  const training = useAppSelector(trainingSelector);
  const global = useAppSelector(globalSelector);
  const {dataDetail, modelDetail} = training;
  const {handleSubmit, control, watch, reset, setValue} = useForm<ITaskUpload>({defaultValues});

  const watchAllFields = watch();
  const modelType = watchAllFields['modelType'];

  const canStartRunning = Object.values(watchAllFields).every((value) => value !== '');
  const canSelectOtherSubSelection = modelType !== '';

  const trainingOptions: ITrainingOptionSelect[] = [
    {title: 'Loại Model', options: modelTypeSelectData, name: 'modelType', placeholder: 'Chọn loại model'},
    {
      title: 'Tập dữ liệu',
      options: dataDetail.map((data) => {
        return {
          id: data.filename,
          value: data.filename
        };
      }),
      name: 'filename',
      placeholder: 'Chọn tập dữ liệu'
    },
    {
      title: 'Vùng',
      options: regionTypeSelectData,
      name: 'region',
      placeholder: 'Chọn vùng'
    },
    {
      title: 'Checkpoint',
      options: modelDetail.map((data) => {
        return {
          id: data.model_name,
          value: data.model_name
        };
      }),
      name: 'ckpt',
      placeholder: 'Chọn Checkpoint'
    },
    {title: 'Loại task', options: taskTypeSelectData, name: 'taskType', placeholder: 'Chọn loại task'},
    {title: 'Epoch', name: 'epoch', placeholder: 'Chọn số epoch'}
  ];

  const resetOptions = () => reset(defaultValues);
  const startRunning: SubmitHandler<ITaskUpload> = async (data) => {
    dispatch(handleLoading(true));
    try {
      // Running Model
      const res: any = await dispatch(addTask(data)).unwrap();
      if (res.task_id) {
        navigate(PageUrl.DASHBOARD);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(handleLoading(false));
    }
  };

  useEffect(() => {
    setValue('filename', '');
    setValue('ckpt', '');
    try {
      dispatch(handleLoading(true));
      const fetchData = async () => {
        const params = getDataParams('defaultValue', modelType);
        await dispatch(getAllDataDetail(params));
        await dispatch(getAllModelDetail(params));
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (error) {
      console.error(error);
      dispatch(handleLoading(false));
    }
  }, [modelType]);

  return (
    <div className='training'>
      <form noValidate method='POST' action='#' onSubmit={handleSubmit(startRunning)}>
        <div className='container-fluid m-0 p-0'>
          <div className='row justify-content-between m-0'>
            {trainingOptions.map((input, idx) => {
              const {title, name, placeholder, options} = input;
              const isFirstInputs = idx === 0;
              const disabled = global.isLoading || (!isFirstInputs && !canSelectOtherSubSelection);

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
                          disabled={disabled}
                          placeholder={placeholder}
                        />
                      ) : (
                        <CInput
                          {...field}
                          size='small'
                          variant='standard'
                          disabled={disabled}
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
    </div>
  );
};

export default Training;
