import React from 'react';
import Sidebar from 'components/Sidebar';
import {BaseProps} from 'utils/base/model';

const MainLayout = (props: BaseProps) => {
  const {children} = props;

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row m-0'>
        <div className='col-1 col-md-3 col-lg-2 p-0'>
          <Sidebar />
        </div>
        <div className='col p-0'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
