import { styled } from '@mui/system';
import { grey, lightBlue } from '@mui/material/colors';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Desktop, Mobile } from 'lib/styles/common';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useHeader from './useHeader';
import Button from '../Button';
import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Search from '../Search';

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
    paddingTop: 20,

    '& img': {
      width: 130,
      height: 30,
    },

    '& li': {
      marginLeft: '70px',
      cursor: 'pointer',

      '&:first-of-type': {
        marginLeft: '0',
      },

      '& span': {
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

  [theme.breakpoints.down('md')]: {
    '& ul': {
      paddingTop: 15,

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
          marginRight: 10,

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

const DrawerStyles = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 300,
    '& li': {
      padding: '18px 15px',
      borderBottom: `1px solid ${grey[300]}`,
      fontSize: 17,
      fontWeight: 300,
      color: `${grey[800]}`,

      '&:first-of-type': {
        borderBottom: 0,
        padding: '5px 0',

        '& .MuiSvgIcon-root': {
          fontSize: 35,
          color: `${grey[700]}`,
        },
      },

      '&:nth-of-type(2)': {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 50px 40px 50px',
        padding: 0,
        borderBottom: 0,
      },

      '&:nth-of-type(3)': {
        borderTop: `1px solid ${grey[300]}`,
      },

      '&:hover': {
        cursor: 'pointer',

        '& span': {
          color: `${lightBlue[400]}`,
        },
      },
    },
  },
}));

function Header() {
  const {
    auth,
    categories,
    menuFlag,
    setMenuFlag,
    searchFlag,
    setSearchFlag,
    onHeaderClick,
    navigate,
    onLogout,
  } = useHeader();

  return (
    <Wrap>
      <ul>
        <Mobile>
          <li>
            <Button variant="text" onClick={() => setMenuFlag(true)}>
              <MenuIcon />
            </Button>
          </li>
          <li>
            <img
              src="/logo.png"
              alt="logo"
              onClick={() => navigate('/introduce')}
            />
          </li>
          <DrawerStyles
            anchor="left"
            open={menuFlag}
            onClose={() => setMenuFlag(false)}
          >
            <li>
              <Button variant="text" onClick={() => setMenuFlag(false)}>
                <CloseIcon />
              </Button>
            </li>
            <li>
              <img
                src="/logo.png"
                alt="logo"
                onClick={() => navigate('/introduce')}
              />
            </li>
            {categories &&
              categories.map((category) => (
                <li key={category.id}>
                  <span onClick={() => onHeaderClick(Number(category.id))}>
                    {category.name}
                  </span>
                </li>
              ))}
          </DrawerStyles>
        </Mobile>

        <Desktop>
          <li>
            <img
              src="/logo.png"
              alt="logo"
              onClick={() => navigate('/introduce')}
            />
          </li>
          {categories &&
            categories.map((category) => (
              <li key={category.id}>
                <span onClick={() => onHeaderClick(Number(category.id))}>
                  {category.name}
                </span>
              </li>
            ))}
        </Desktop>
        <li>
          <span onClick={() => setSearchFlag(true)}>
            <SearchIcon />
          </span>
          {auth && (
            <>
              <span onClick={() => navigate('/admin')}>
                <ManageAccountsOutlinedIcon />
              </span>
              <span onClick={onLogout}>
                <LogoutIcon />
              </span>
            </>
          )}
        </li>
      </ul>
      <Search searchFlag={searchFlag} setSearchFlag={setSearchFlag} />
    </Wrap>
  );
}

export default Header;
