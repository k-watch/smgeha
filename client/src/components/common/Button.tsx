import React from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';

const ButtonStyle = styled(MuiButton)({
  borderRadius: 0,
  boxShadow: 'none',
  '&.MuiButton-contained': {
    color: 'white',
  },

  '&:hover': {
    backgroundColor: `${lightBlue[400]}`,
    boxShadow: 'none',
  },

  '&.MuiButton-sizeLarge': {
    padding: '12px 4px ',
    fontSize: '18px',
    fontWeight: '600',
  },

  '&.MuiButton-text': {
    color: `black`,
    fontSize: 16,
    fontWeight: '600',

    '& .MuiSvgIcon-root': {
      paddingRight: 3,
    },

    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      color: `${grey[400]}`,
    },
  },
});

function Button(props: ButtonProps) {
  return <ButtonStyle {...props}>{props.children}</ButtonStyle>;
}

export default Button;
