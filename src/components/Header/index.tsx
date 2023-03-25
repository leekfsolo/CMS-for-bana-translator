import React from 'react';
import {Divide as Hamburger} from 'hamburger-react';
import {useAppDispatch} from 'app/hooks';
import {handleBackdrop, handleSidebar} from 'app/globalSlice';

type Props = {
  activeSidebarTitle: string;
  isShowSidebar: boolean;
};

const Header = (props: Props) => {
  const {activeSidebarTitle, isShowSidebar} = props;
  const dispatch = useAppDispatch();

  const toggleMenu = (toggled: boolean) => {
    dispatch(handleBackdrop(toggled));
    dispatch(handleSidebar(toggled));
  };

  return (
    <header className='header'>
      <h1>{activeSidebarTitle}</h1>
      <div className='d-block d-lg-none header-collapse'>
        <Hamburger size={20} toggled={isShowSidebar} onToggle={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
