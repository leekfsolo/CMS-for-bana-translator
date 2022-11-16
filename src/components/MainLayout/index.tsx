import React, {useEffect, useMemo, useState} from 'react';
import Sidebar from 'components/Sidebar';
import {Outlet, useNavigate} from 'react-router-dom';
import {PageUrl} from 'configuration/enum';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import ModelTrainingOutlinedIcon from '@mui/icons-material/ModelTrainingOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import {ISidebarItem} from 'components/interface';

const MainLayout = () => {
  const sidebarItems: Array<ISidebarItem[]> = useMemo(
    () => [
      [
        {
          label: 'Dashboard',
          src: PageUrl.DASHBOARD,
          icon: <GridViewOutlinedIcon />
        },
        {
          label: 'Model Management',
          src: PageUrl.MODEL_MANAGEMENT,
          icon: <AssignmentOutlinedIcon />
        },
        {
          label: 'Data Management',
          src: PageUrl.DATA_MANAGEMENT,
          icon: <DataThresholdingOutlinedIcon />
        },
        {
          label: 'Training',
          src: PageUrl.TRAINING,
          icon: <ModelTrainingOutlinedIcon />
        },
        {
          label: 'Testing',
          src: PageUrl.TESTING,
          icon: <BoltOutlinedIcon />
        }
      ],
      [
        {
          label: 'Profile',
          src: PageUrl.PROFILE,
          icon: <AssignmentIndOutlinedIcon />
        },
        {
          label: 'Sign up',
          src: PageUrl.SIGNUP,
          icon: <KeyOutlinedIcon />
        },
        {
          label: 'Log out',
          src: `/${PageUrl.LOGIN}`,
          icon: <LogoutOutlinedIcon />
        }
      ]
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
      <div className='wrapper d-flex'>
        <div className='wrapper-sidebar'>
          <Sidebar
            sideBarItems={sidebarItems}
            setActiveSidebarTitle={setActiveSidebarTitle}
            activeSidebarTitle={activeSidebarTitle}
          />
        </div>
        <div className='wrapper-main'>
          <main className='main'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
