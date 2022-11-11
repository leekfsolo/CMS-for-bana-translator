import React from 'react';
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
import SidebarItem from './SidebarItem';
import {Logo} from 'assets';

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = React.useState<ISidebarList[]>([
    {
      title: 'App',
      items: [
        {
          label: 'Dashboard',
          src: PageUrl.DASHBOARD,
          icon: <DashboardIcon />,
          isActive: true
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
          src: `/${PageUrl.SIGNUP}`,
          icon: <VpnKeyIcon />
        },
        {
          label: 'Log out',
          src: `/${PageUrl.LOGIN}`,
          icon: <LogoutIcon />
        }
      ]
    }
  ]);

  const changeActiveSidebarItem = (label: string) => {
    const newSidebarItems = sidebarItems.map((list) => {
      list.items.map((sidebarItem) => {
        sidebarItem.isActive = sidebarItem.label === label;

        return sidebarItem;
      });

      return list;
    });

    setSidebarItems(newSidebarItems);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-info d-flex align-items-center gap-3'>
        <div className='sidebar-info__logo'>
          <img src={Logo} alt='logo' className='img-fluid' />
        </div>
        <div className='sidebar-info__user'>Tên người dùng</div>
      </div>
      <nav className='sidebar-list'>
        {sidebarItems.map((list) => (
          <section key={list.title} className='sidebar-list__section'>
            <h4>{list.title}</h4>
            {list.items.map((item) => (
              <SidebarItem key={item.label} item={item} changeActiveSidebarItem={changeActiveSidebarItem} />
            ))}
          </section>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
