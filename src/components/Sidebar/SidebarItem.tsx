import React from 'react';
import {ISidebarItem} from 'components/interface';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useAppDispatch} from 'app/hooks';
import {logout} from 'pages/Auth/authSlice';
import {handleLoading} from 'app/globalSlice';
import customToast, {ToastType} from 'components/CustomToast/customToast';

type Props = {
  item: ISidebarItem;
  activeSidebarTitle: string;
  setActiveSidebarTitle: (label: string) => void;
};

const SidebarItem = ({setActiveSidebarTitle, item, activeSidebarTitle}: Props) => {
  const {label, src, icon = null} = item;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    setActiveSidebarTitle(label);
    navigate(src);

    if (label === 'Log out') {
      dispatch(handleLoading(true));
      try {
        const res: any = await dispatch(logout()).unwrap();
        const {msg, isSuccess = true} = res;

        if (isSuccess) {
          customToast(ToastType.SUCCESS, msg);
        } else customToast(ToastType.ERROR, msg);

        dispatch(handleLoading(false));
      } catch (err: any) {
        customToast(ToastType.ERROR, err.message);
        dispatch(handleLoading(false));
      }
    }
  };

  const classnames = classNames('sidebar-item', {active: activeSidebarTitle === label});

  return (
    <div key={label} onClick={handleClick} className={classnames}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
