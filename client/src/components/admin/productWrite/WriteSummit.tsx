import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from 'components/common/Button';
import Dialog from 'components/common/Dialog';
import useWriteBtn from './useWriteSummit';

const Wrap = styled('div')(() => ({
  '& .MuiButton-root': {
    width: 120,
    fontSize: 17,
  },
}));

function WriteSummit() {
  const { id, formCheck, open, handleClose, onClick, successLodingOpen } =
    useWriteBtn();

  return (
    <Wrap>
      {id ? (
        <Button variant="contained" size="large" onClick={onClick}>
          수정
        </Button>
      ) : (
        <Button variant="contained" size="large" onClick={onClick}>
          저장
        </Button>
      )}

      <Dialog open={open} type="warning" onClick={handleClose}>
        {`${formCheck} 내용을 입력해주세요.`}
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={successLodingOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrap>
  );
}

export default WriteSummit;
