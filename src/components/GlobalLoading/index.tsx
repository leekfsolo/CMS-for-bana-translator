import {CircularProgress} from '@mui/material';
import {useAppSelector} from 'app/hooks';
import {globalSelector} from 'app/selectors';
import React from 'react';

const GlobalLoading = () => {
  const {isLoading} = useAppSelector(globalSelector);

  return (
    <div aria-hidden={!isLoading} className='globalLoading'>
      <CircularProgress />
    </div>
  );
};

export default GlobalLoading;
