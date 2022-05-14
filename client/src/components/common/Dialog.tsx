import {
  Alert,
  AlertTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  styled,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from './Button';

const Wrap = styled('div')({
  minWidth: 360,

  '& .MuiAlert-root': {
    padding: 15,
    fontSize: 16,
    fontWeight: 500,

    '& .MuiTypography-root': {
      marginBottom: 15,
      fontSize: 17,
      fontWeight: 600,
    },
  },
});

interface DialogProps extends MuiDialogProps {
  type: 'error' | 'warning';
}

function Dialog(props: DialogProps) {
  return (
    <MuiDialog open={props.open} onClick={props.onClick}>
      <Wrap>
        {props.type === 'error' && (
          <Alert severity="error">
            <AlertTitle>에러</AlertTitle>
            {props.children}
          </Alert>
        )}
        {props.type === 'warning' && (
          <Alert severity="warning">
            <AlertTitle>주의</AlertTitle>
            {props.children}
          </Alert>
        )}
        <DialogActions>
          <Button variant="text" size="small" onClick={() => props.onClick}>
            확인
          </Button>
        </DialogActions>
      </Wrap>
    </MuiDialog>
  );
}

export default Dialog;
