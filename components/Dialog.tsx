import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface PopUpDialogProps {
  open: boolean;
  title: string;
  content: string;
  onOkHandled: React.MouseEventHandler<HTMLButtonElement>;
  okButtonText: string;
}

const PopUpDialog: React.FC<PopUpDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
    >
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onOkHandled} color='primary' autoFocus>
          {props.okButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpDialog;
