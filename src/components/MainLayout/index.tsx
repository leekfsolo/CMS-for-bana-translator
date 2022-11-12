import React, {useEffect, useMemo, useState} from 'react';
import Sidebar from 'components/Sidebar';
import {Outlet, useNavigate} from 'react-router-dom';
import {ISidebarList} from 'components/interface';
import {PageUrl} from 'configuration/enum';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import TaskIcon from '@mui/icons-material/Task';
import BoltIcon from '@mui/icons-material/Bolt';
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const MainLayout = () => {
  const sidebarItems: ISidebarList[] = useMemo(
    () => [
      {
        title: 'App',
        items: [
          {
            label: 'Dashboard',
            src: PageUrl.DASHBOARD,
            icon: <DashboardIcon />
          },
          {
            label: 'Model Management',
            src: PageUrl.MODEL_MANAGEMENT,
            icon: <TaskIcon />
          },
          {
            label: 'Data Management',
            src: PageUrl.DATA_MANAGEMENT,
            icon: <DataThresholdingIcon />
          },
          {
            label: 'Training',
            src: PageUrl.TRAINING,
            icon: <ModelTrainingIcon />
          },
          {
            label: 'Testing',
            src: PageUrl.TESTING,
            icon: <BoltIcon />
          }
        ]
      },
      {
        title: 'Accounts',
        items: [
          {
            label: 'Profile',
            src: PageUrl.PROFILE,
            icon: <AssignmentIndIcon />
          },
          {
            label: 'Sign up',
            src: PageUrl.SIGNUP,
            icon: <VpnKeyIcon />
          },
          {
            label: 'Log out',
            src: `/${PageUrl.LOGIN}`,
            icon: <LogoutIcon />
          }
        ]
      }
    ],
    []
  );
  const [activeSidebarTitle, setActiveSidebarTitle] = useState<string>('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    navigate(activeSidebarTitle.toLowerCase(), {replace: true});
  }, []);

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row m-0'>
        <div className='col-1 col-md-3 col-lg-2 p-0'>
          <Sidebar
            sideBarItems={sidebarItems}
            setActiveSidebarTitle={setActiveSidebarTitle}
            activeSidebarTitle={activeSidebarTitle}
          />
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
