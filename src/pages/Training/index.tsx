import CButton from 'components/CButton';
import CSelect from 'components/CSelect';
import React, {useState} from 'react';
import {SelectChangeEvent, LinearProgress} from '@mui/material';
import {ITrainingOptionSelect, ITrainingOptionValues} from 'pages/interface';
import {useAppDispatch} from 'app/hooks';
import {sleep} from 'utils/helpers/sleep';
import CInput from 'components/CInput';
import {addTask} from './trainingSlice';

const trainingOptions: ITrainingOptionSelect[] = [
  {title: 'Tập dữ liệu', options: ['test', 'asdf'], type: 'dataset', placeholder: 'Chọn tập dữ liệu'},
  {title: 'Loại Model', options: ['nmt', 'tts'], type: 'model', placeholder: 'Chọn loại model'},
  {title: 'Vùng', options: ['Gia Lai', 'Kon Tum', 'Bình Định'], type: 'region', placeholder: 'Chọn vùng'},
  {title: 'File Checkpoint', options: ['.ste', 'asd'], type: 'checkpoint', placeholder: 'Chọn file checkpoint'},
  {title: 'Loại task', options: ['train', 'test'], type: 'taskType', placeholder: 'Chọn loại task'}
];

const defaultOptionValues: ITrainingOptionValues = {
  dataset: 'default',
  model: 'default',
  region: 'default',
  checkpoint: 'default',
  taskType: 'default'
};

const Training = () => {
  const dispatch = useAppDispatch();
  const [optionValues, setOptionValues] = useState<ITrainingOptionValues>(defaultOptionValues);
  const [epochNumber, setEpochNumber] = useState<number>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const canStartRunning =
    Object.values(optionValues).every((value) => value !== 'default') && epochNumber !== undefined;

  const resetOptions = () => setOptionValues(defaultOptionValues);

  const handleFilterChange = (e: SelectChangeEvent<unknown>) => {
    const newFilterValues = {
      ...optionValues,
      [e.target.name]: e.target.value
    };

    setOptionValues(newFilterValues);
  };

  const startRunning = async () => {
    setIsRunning(true);
    try {
      // Running Model
      const {checkpoint, dataset, model, region, taskType} = optionValues;
      await dispatch(
        addTask({
          ckpt: checkpoint,
          epoch: epochNumber ? epochNumber : 0,
          taskType,
          region,
          filename: dataset,
          modelType: model
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className='training'>
      <div className='container-fluid m-0 p-0'>
        <div className='row justify-content-between m-0'>
          {trainingOptions.map((filter) => (
            <div key={filter.title} className='training-filter col-5 p-0'>
              <p className='mb-2'>{filter.title}</p>
              <CSelect
                size='small'
                options={filter.options}
                disabled={isRunning}
                name={filter.type}
                onChange={handleFilterChange}
                value={optionValues[filter.type]}
                variant='standard'
                placeholder={filter.placeholder}
              />
            </div>
          ))}

          <div className='training-filter col-5 p-0'>
            <p className='mb-2'>Epoch</p>
            <CInput
              type='number'
              value={epochNumber ? epochNumber : 0}
              onChange={(e: any) => setEpochNumber(Number(e.target.value))}
              variant='standard'
            />
          </div>
        </div>
      </div>

      <div className='training-controls d-flex flex-column flex-sm-row justify-content-end align-items-start align-items-sm-center gap-2'>
        <CButton type='reset' variant='contained' color='error' onClick={resetOptions}>
          Reset
        </CButton>
        <CButton variant='contained' color='success' onClick={startRunning} disabled={!canStartRunning}>
          Start
        </CButton>
      </div>

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
