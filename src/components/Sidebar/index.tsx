import React from 'react';
import SidebarItem from './SidebarItem';
import {Logo} from 'assets';
import {ISidebarList} from 'components/interface';

type Props = {
  sideBarItems: ISidebarList[];
  setActiveSidebarTitle: (label: string) => void;
  activeSidebarTitle: string;
};

const Sidebar = (props: Props) => {
  const {sideBarItems, setActiveSidebarTitle, activeSidebarTitle} = props;

  return (
    <div className='sidebar'>
      <div className='sidebar-info d-flex align-items-center gap-3'>
        <div className='sidebar-info__logo'>
          <img src={Logo} alt='logo' className='img-fluid' />
        </div>
        <div className='sidebar-info__user'>Tên người dùng</div>
      </div>
      <nav className='sidebar-list'>
        {sideBarItems.map((list) => (
          <section key={list.title} className='sidebar-list__section'>
            <h4>{list.title}</h4>
            {list.items.map((item) => (
              <SidebarItem
                key={item.label}
                item={item}
                setActiveSidebarTitle={setActiveSidebarTitle}
                activeSidebarTitle={activeSidebarTitle}
              />
            ))}
          </section>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
