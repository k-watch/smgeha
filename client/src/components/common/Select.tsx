import { styled } from '@mui/material/styles';
import { FormControl, Select as MaterialSelect, MenuItem } from '@mui/material';
import React from 'react';
import { grey, purple } from '@mui/material/colors';

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '& fieldset': {
      borderColor: `${grey[500]}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${grey[700]}`,
    },
    borderRadius: 0,
    height: 45,
  },
}));

// const SelectStyle = (props: any) => (
//   <div
//   >
//     <Select {...props}/>
//   </div>
// )

export type SelectProps = {
  name: string;
  label: string;
  value: any;
  categories: any;
  onClick?: (e: any) => void;
};

function Select({ name, value, label, categories, onClick }: SelectProps) {
  //   const classes = useStyles();

  return (
    <>
      <FormControlStyle variant="outlined" /*className={classes.formControl}*/>
        <MaterialSelect name={name} value={value}>
          {categories &&
            categories.map((category: any) => (
              <MenuItem
                key={category.id}
                value={label === '제품' ? category.name : category.name}
                onClick={onClick ? () => onClick(category.id) : undefined}
              >
                {category.name}
              </MenuItem>
            ))}
        </MaterialSelect>
      </FormControlStyle>
    </>
  );
}

export default Select;
