import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const TextFieldStyle = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    '& fieldset': {
      borderColor: `${grey[400]}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${grey[400]}`,
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
    },
    '& .Mui-disabled': {
      backgroundColor: `${grey[300]}`,
    },
  },
});

function TextField(props: TextFieldProps) {
  return <TextFieldStyle {...props}>{props.children}</TextFieldStyle>;
}

export default TextField;
