import {CircularProgress} from '@mui/material';
import {useAppSelector} from 'app/hooks';
import {globalSelector} from 'app/selectors';
import React from 'react';

const GlobalLoading = () => {
  const {isLoading} = useAppSelector(globalSelector);

  return (
    <div className={`globalLoading ${isLoading ? ' globalLoading-open' : ''}`}>
      <CircularProgress />
    </div>
  );
};

export default GlobalLoading;
