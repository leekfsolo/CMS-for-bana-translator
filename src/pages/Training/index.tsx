import CButton from 'components/CButton';
import CSelect from 'components/CSelect/CSelect';
import React, {useState} from 'react';
import {FormControlLabel, SelectChangeEvent} from '@mui/material';
import CSwitch from 'components/CSwitch/CSwitch';
import {IOptionValues} from 'pages/interface';

const trainingOptions = [
  {title: 'Tập dữ liệu', options: ['test', 'asdf'], type: 'dataset'},
  {title: 'Loại Model', options: ['123', '43'], type: 'model'},
  {title: 'Vùng', options: ['Asd', 'cbvc'], type: 'region'},
  {title: 'File Checkpoint', options: ['.ste', 'asd'], type: 'checkpoint'}
];

const defaultOptionValues: IOptionValues = {
  dataset: '',
  model: '',
  region: '',
  checkpoint: ''
};

const Training = () => {
  const [optionValues, setOptionValues] = useState<IOptionValues>(defaultOptionValues);
  const [isTesting, setIstesting] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const canStartRunning = Object.values(optionValues).every((value) => value !== '');

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
              />
            </div>
          ))}
        </div>
      </div>

      <div className='training-controls d-flex justify-content-between align-items-center'>
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

      <div className='training-output my-3'></div>
      <div className='training-cancel d-flex justify-content-end'>
        <CButton variant='outlined' color='primary'>
          Cancel
        </CButton>
      </div>
    </div>
  );
};

export default Training;
