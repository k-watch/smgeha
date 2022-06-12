import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from 'components/common/Chip';
import { CategoryProps } from 'modules/category/props';
import useWriteHeader from './useProductHeader';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { grey } from '@mui/material/colors';

const Wrap = styled('div')(({ theme }) => ({
  marginBottom: 30,
  '& ul': {
    display: 'flex',

    [theme.breakpoints.down('md')]: {
      overflow: 'scroll',
      whiteSpace: 'nowrap',
    },

    '& li': {
      marginRight: 15,

      '&:last-of-type': {
        marginRight: 0,
        marginLeft: 'auto',
        fontWeight: '400',
        '& .MuiSwitch-switchBase': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        '& .MuiSvgIcon-root': {
          paddingTop: 6,
          fontSize: 30,
          color: `${grey[600]}`,
          cursor: 'pointer',

          '&:hover': {
            color: `${grey[900]}`,
          },
        },
      },
    },
  },
}));

function ProductHeader() {
  const {
    productCategory,
    productClick,
    recommendDisabled,
    recommendClick,
    path,
    navigate,
  } = useWriteHeader();
  return (
    <Wrap>
      <ul>
        {productCategory &&
          productCategory.map((product: CategoryProps) => (
            <li key={product.id}>
              <Chip
                label={product.name}
                onClick={() => productClick(product.id)}
                variant={product.check === true ? 'filled' : 'outlined'}
              />
            </li>
          ))}
        {path && path ? (
          <li>
            추천제품
            <Switch
              color="primary"
              checked={Boolean(recommendDisabled)}
              onClick={recommendClick}
            />
          </li>
        ) : (
          <li>
            <EditOutlinedIcon onClick={() => navigate('/admin/write')} />
          </li>
        )}
      </ul>
    </Wrap>
  );
}

export default ProductHeader;
