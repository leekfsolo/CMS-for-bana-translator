import CButton from 'components/CButton';
import CSelect from 'components/CSelect';
import React, {useState} from 'react';
import {FormControlLabel, SelectChangeEvent, LinearProgress} from '@mui/material';
import CSwitch from 'components/CSwitch/CSwitch';
import {ITrainingOptionSelect, ITrainingOptionValues} from 'pages/interface';
import {useAppDispatch} from 'app/hooks';
import {sleep} from 'utils/helpers/sleep';

const trainingOptions: ITrainingOptionSelect[] = [
  {title: 'Tập dữ liệu', options: ['test', 'asdf'], type: 'dataset'},
  {title: 'Loại Model', options: ['123', '43'], type: 'model'},
  {title: 'Vùng', options: ['Asd', 'cbvc'], type: 'region'},
  {title: 'File Checkpoint', options: ['.ste', 'asd'], type: 'checkpoint'}
];

const defaultOptionValues: ITrainingOptionValues = {
  dataset: 'default',
  model: 'default',
  region: 'default',
  checkpoint: 'default'
};

const Training = () => {
  const dispatch = useAppDispatch();
  const [optionValues, setOptionValues] = useState<ITrainingOptionValues>(defaultOptionValues);
  const [isTesting, setIstesting] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const canStartRunning = Object.values(optionValues).every((value) => value !== 'default');

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
      await sleep(2000);
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
              />
            </div>
          ))}
        </div>
      </div>

      <div className='training-controls d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center'>
        <FormControlLabel
          value='start'
          control={<CSwitch color='primary' checked={isTesting} onChange={() => setIstesting(!isTesting)} />}
          label='Testing mode'
          labelPlacement='start'
          className='training-label ms-0 mb-2'
        />

        <div className='training-controls__button d-flex gap-2'>
          <CButton type='reset' variant='contained' color='error' onClick={resetOptions}>
            Reset
          </CButton>
          <CButton variant='contained' color='success' onClick={startRunning} disabled={!canStartRunning}>
            Start
          </CButton>
        </div>
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
