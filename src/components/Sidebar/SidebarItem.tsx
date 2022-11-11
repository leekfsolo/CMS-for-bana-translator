import React from 'react';
import {ISidebarItem} from 'components/interface';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  item: ISidebarItem;
  title: string;
  changeActiveSidebarItem: (title: string, label: string) => void;
};

const SidebarItem = ({changeActiveSidebarItem, item, title}: Props) => {
  const {label, src, icon = null, isActive = false, subItems = []} = item;
  const navigate = useNavigate();

  const handleClick = () => {
    changeActiveSidebarItem(title, label);
    // navigate(src);
  };

  const classnames = classNames('sidebar-item', {active: isActive});

  return (
    <div key={label} onClick={handleClick} className={classnames}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
