import { styled } from '@mui/system';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';
import React from 'react';

const Wrap = styled('div')(({ theme }) => ({
  height: '80px',
  borderBottom: `1px solid ${grey[300]}`,
  boxShadow: `0px 3px 6px ${grey[200]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  color: `${grey[800]}`,
  fontWeight: '300',

  '& ul': {
    width: '1000px',
  },
  '& li': {
    alignItems: 'center',
  },
  '& img': {
    width: 110,
    height: 27,
    lineHeight: 100,
  },
}));

const TabStyle = styled(Tab)({
  '&.MuiButtonBase-root': {
    color: `${grey[700]}`,
    fontWeight: '500',
    fontSize: '16px',
    margin: '0 10px',

    '&:hover': {
      color: `${lightBlue[400]}`,
    },
  },
});

function Header() {
  return (
    <Wrap>
      <ul>
        <Grid container>
          <li>
            <img src="/logo.png" alt="logo" />
          </li>
          <Tabs centered>
            <TabStyle disableRipple label="냉장고" />
            <TabStyle disableRipple label="에어컨" />
            <TabStyle disableRipple label="세탁기" />
            <TabStyle disableRipple label="TV" />
            <TabStyle disableRipple label="기타" />
          </Tabs>
        </Grid>
      </ul>
    </Wrap>
  );
}

export default Header;
