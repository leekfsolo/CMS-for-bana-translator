import React from 'react';
import SidebarItem from './SidebarItem';
import {Logo} from 'assets';
import {ISidebarItem} from 'components/interface';
import {useAppSelector} from 'app/hooks';
import {authSelector} from 'app/selectors';

type Props = {
  sideBarItems: Array<ISidebarItem[]>;
  setActiveSidebarTitle: (label: string) => void;
  activeSidebarTitle: string;
};

const Sidebar = (props: Props) => {
  const {sideBarItems, setActiveSidebarTitle, activeSidebarTitle} = props;
  const auth = useAppSelector(authSelector);
  const {userInfo} = auth;

  return (
    <div className='sidebar'>
      <div className='sidebar-info d-flex align-items-center'>
        <div className='sidebar-info__logo'>
          <img src={Logo} alt='logo' className='img-fluid' />
        </div>
        <div className='sidebar-info__user'>
          <div className='username'>{userInfo?.username}</div>
          <div className='role'>{userInfo?.accountRole}</div>
        </div>
      </div>
      <hr className='section-divider' />
      <nav className='sidebar-list pt-1'>
        {sideBarItems.map((section, idx) => (
          <section key={`sidebar-section-${idx}`} className='sidebar-list__section'>
            {section.map((item) => (
              <SidebarItem
                key={item.label}
                item={item}
                setActiveSidebarTitle={setActiveSidebarTitle}
                activeSidebarTitle={activeSidebarTitle}
              />
            ))}

            {idx < sideBarItems.length - 1 && <hr className='section-divider' />}
          </section>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
