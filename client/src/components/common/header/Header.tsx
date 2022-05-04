import { styled } from '@mui/system';
import { grey, lightBlue } from '@mui/material/colors';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Desktop, Mobile } from 'lib/styles/common';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useHeader from './useHeader';

const Wrap = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '70px',
  backgroundColor: `white`,
  borderBottom: `1px solid ${grey[300]}`,
  boxShadow: `0px 3px 6px ${grey[200]}`,
  fontWeight: '400',
  color: `${grey[500]}`,

  '& ul': {
    display: 'flex',
    alignItems: 'center',
    padding: '0 calc(25% - 150px)',
    paddingTop: '20px',

    '& img': {
      width: 130,
      height: 30,
    },

    '& li': {
      marginLeft: '70px',

      '&:first-of-type': {
        marginLeft: '0',
      },

      '& span': {
        cursor: 'pointer',
        '&:hover': {
          color: `${lightBlue[400]}`,
        },
      },

      '&:last-of-type': {
        marginLeft: 'auto',
        '& span': {
          paddingLeft: '15px',
        },
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: '24px',
    },
  },

  // '&.fixedHeader': {
  //   position: 'fixed',
  //   top: 0,
  //   zIndex: 1,
  // },

  [theme.breakpoints.down('md')]: {
    '& ul': {
      '& li': {
        '& img': {
          width: 130,
          height: 30,
        },
        '&:nth-of-type(2)': {
          margin: '0 auto',
        },

        '&:last-of-type': {
          marginLeft: 0,
          '& span': {
            paddingLeft: '12px',
          },
        },
      },
      '& .MuiSvgIcon-root': {
        fontSize: '30px',
      },
    },
  },
}));

function Header() {
  const { auth, scrollActive, onLogout } = useHeader();

  return (
    <Wrap className={scrollActive ? 'none' : 'fixedHeader'}>
      <ul>
        <Mobile>
          <li>
            <MenuIcon />
          </li>
          <li>
            <a href="/">
              <img src="/logo.png" alt="logo" />
            </a>
          </li>
        </Mobile>

        <Desktop>
          <li>
            <a href="/">
              <img src="/logo.png" alt="logo" />
            </a>
          </li>
          <li>
            <span>냉장고</span>
          </li>
          <li>
            <span>에어컨</span>
          </li>
          <li>
            <span>세탁기</span>
          </li>
          <li>
            <span>TV</span>
          </li>
          <li>
            <span>기타</span>
          </li>
        </Desktop>
        <li>
          <span>
            <ManageAccountsOutlinedIcon />
          </span>
          {auth && (
            <span onClick={onLogout}>
              <LogoutIcon />
            </span>
          )}
        </li>
      </ul>
    </Wrap>
  );
}

export default Header;
