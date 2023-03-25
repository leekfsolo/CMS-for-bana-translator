import React, {ReactNode, useEffect, useState} from 'react';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import CButton from 'components/CButton';

export interface CModalProps extends Partial<DialogProps> {
  isDelete?: boolean;
  content: ReactNode;
  handleConfirm?: () => Promise<void>;
  closeText: string;
  confirmText?: string;
  handleClose?: () => void;
}

export default function CModal(props: CModalProps) {
  const {content, handleClose, handleConfirm, title, closeText, confirmText, isDelete = true, ...restProps} = props;

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const closeModal = () => {
    toggle();
  };

  const doClose = () => {
    if (handleClose) handleClose();
    closeModal();
  };

  const doConfirm = () => {
    if (handleConfirm) handleConfirm();
    closeModal();
  };

  useEffect(() => {
    if (title && content) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  return (
    <Dialog
      {...restProps}
      fullWidth={true}
      open={open}
      onClose={doClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={`dialog dialog-basic`}
    >
      <DialogTitle className='dialog-title' id='alert-dialog-title'>
        <span>{title}</span>
        <button className='dialog-title__close'>
          <CloseIcon onClick={doClose} />
        </button>
      </DialogTitle>
      <DialogContent className='dialog-content'>{content}</DialogContent>
      <DialogActions className='dialog-actions'>
        <CButton size='medium' variant='text' onClick={doClose}>
          {closeText}
        </CButton>
        {!!handleConfirm && (
          <CButton size='medium' color={isDelete ? 'error' : 'primary'} onClick={doConfirm}>
            {confirmText}
          </CButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
