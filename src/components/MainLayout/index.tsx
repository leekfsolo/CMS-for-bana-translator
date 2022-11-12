import React from 'react';
import Sidebar from 'components/Sidebar';
import {Outlet} from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row m-0'>
        <div className='col-1 col-md-3 col-lg-2 p-0'>
          <Sidebar />
        </div>
        <div className='col p-0'>
          <main className='main'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
