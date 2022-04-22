import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from 'components/common/Chip';
import useWrite, { CateogryData } from './useWrite';

const Wrap = styled('div')(() => ({
  marginBottom: 30,
  '& ul': {
    display: 'flex',

    '& li': {
      marginRight: 15,

      '&:last-of-type': {
        marginLeft: 'auto',
        fontWeight: '400',
        '& .MuiSwitch-switchBase': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
}));

function WriteFormHeader() {
  const { productData, productHandleClick, recommendHandleClick } = useWrite();
  return (
    <Wrap>
      <ul>
        {productData.map((product: CateogryData) => (
          <li>
            <Chip
              label={product.name}
              onClick={() => productHandleClick(product.id)}
              variant={product.check === true ? 'filled' : 'outlined'}
            />
          </li>
        ))}
        <li>
          추천상품
          <Switch color="primary" onClick={recommendHandleClick} />
        </li>
      </ul>
    </Wrap>
  );
}

export default WriteFormHeader;
