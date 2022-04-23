import { styled } from '@mui/material/styles';
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import { grey } from '@mui/material/colors';

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 0,
    '& fieldset': {
      borderColor: `${grey[400]}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${grey[400]}`,
    },
  },
}));

interface SelectProps extends MuiSelectProps {
  menus: Array<any>;
  onClick: any;
}

function Select(props: SelectProps) {
  return (
    <>
      <FormControlStyle variant="outlined" fullWidth>
        <MuiSelect name={props.name} value={props.value}>
          {props.menus &&
            props.menus.map((menu: any) => (
              <MenuItem
                key={menu.id}
                value={menu.name}
                onClick={() => props.onClick(props.name, menu)}
              >
                {menu.name}
              </MenuItem>
            ))}
        </MuiSelect>
      </FormControlStyle>
    </>
  );
}

export default Select;
