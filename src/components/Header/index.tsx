import React from 'react';
import {Divide as Hamburger} from 'hamburger-react';

type Props = {
  activeSidebarTitle: string;
  isShowSideBar: boolean;
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = (props: Props) => {
  const {activeSidebarTitle, isShowSideBar, setIsShowSideBar} = props;

  return (
    <header className='header'>
      <h1>{activeSidebarTitle}</h1>
      <div className='d-block d-lg-none header-collapse'>
        <Hamburger size={20} toggled={isShowSideBar} toggle={setIsShowSideBar} />
      </div>
    </header>
  );
};

export default Header;
