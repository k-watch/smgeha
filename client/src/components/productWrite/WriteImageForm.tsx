import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import TextField from 'components/common/TextField';

const GirdStyle = styled(Grid)(() => ({
  fontWeight: 500,
  '&.MuiGrid-root': {
    display: 'flex',
    alignItems: 'center',

    '& span': {
      width: 60,
    },

    '& .MuiFormControl-root': {
      marginLeft: 20,
    },
  },
}));

function WriteImageForm() {
  return (
    <div>
      <span>제품명</span>
      <TextField name="name" fullWidth />
    </div>
  );
}

export default WriteImageForm;
