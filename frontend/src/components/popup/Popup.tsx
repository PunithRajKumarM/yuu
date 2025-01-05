import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({
  open,
  handleAgree,
  handlerDisagree,
  title,
  description,
}: {
  open: boolean;
  title: string;
  description: string;
  handleAgree: () => void;
  handlerDisagree: () => void;
}) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlerDisagree}>Cancel</Button>
        <Button onClick={handleAgree} autoFocus>
          Unfollow
        </Button>
      </DialogActions>
    </Dialog>
  );
}
