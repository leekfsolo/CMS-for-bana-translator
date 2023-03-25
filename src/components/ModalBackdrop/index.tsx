import React from 'react';
import {handleBackdrop, handleSidebar} from 'app/globalSlice';
import {useAppDispatch} from 'app/hooks';
import {globalSelector} from 'app/selectors';
import classNames from 'classnames';
import {useSelector} from 'react-redux';

const ModalBackdrop = () => {
  const dispatch = useAppDispatch();
  const global = useSelector(globalSelector);
  const {isShowModalBackdrop} = global;

  const hideModalBackdrop = () => {
    dispatch(handleBackdrop(false));
    dispatch(handleSidebar(false));
  };

  const modalBackdropClassname = classNames('modal-backdrop', {showModal: isShowModalBackdrop});

  return <div onClick={hideModalBackdrop} className={modalBackdropClassname}></div>;
};

export default ModalBackdrop;
