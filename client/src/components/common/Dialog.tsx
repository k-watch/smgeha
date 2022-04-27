import * as React from 'react';
import { Dialog as MuiDialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';

function Dialog({ children }: any) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MuiDialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>확인</Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
}

export default Dialog;
