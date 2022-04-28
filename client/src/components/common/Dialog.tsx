import * as React from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  styled,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { grey, red } from '@mui/material/colors';

const Wrap = styled('div')({
  maxWidth: 360,

  '& .error': {
    display: 'flex',
    color: `${red[700]}`,
  },

  '& .MuiTypography-root': {
    fontSize: 17,
    fontWeight: 700,

    '& .MuiSvgIcon-root': {
      paddingRight: 5,
    },
  },
  '& .MuiDialogContentText-root': {
    fontSize: 15,
  },

  '& .MuiDialogActions-root': {
    padding: 10,
    backgroundColor: `${grey[100]}`,
  },
});

interface DialogProps extends MuiDialogProps {
  type: 'error';
}

function Dialog(props: DialogProps) {
  return (
    <MuiDialog open={props.open} onClick={props.onClick}>
      <Wrap>
        <DialogTitle>
          {props.type === 'error'}
          {
            <div className="error">
              <ErrorOutlineOutlinedIcon />
              {'ERROR'}
            </div>
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => props.onClick}>
            확인
          </Button>
        </DialogActions>
      </Wrap>
    </MuiDialog>
  );
}

export default Dialog;
