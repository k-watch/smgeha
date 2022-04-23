import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from 'components/common/Chip';
import useWrite, { CateogryData } from './useWrite';
import useWriteHeader from './useWriteHeader';

const Wrap = styled('div')(() => ({
  marginBottom: 30,
  '& ul': {
    display: 'flex',

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
      },
    },
  },
}));

function WriteFormHeader() {
  const { productData, productClick, recommendClick } = useWriteHeader();
  return (
    <Wrap>
      <ul>
        {productData.map((product: CateogryData) => (
          <li key={product.id}>
            <Chip
              label={product.name}
              onClick={() => productClick(product.id)}
              variant={product.check === true ? 'filled' : 'outlined'}
            />
          </li>
        ))}
        <li>
          추천상품
          <Switch color="primary" onClick={recommendClick} />
        </li>
      </ul>
    </Wrap>
  );
}

export default WriteFormHeader;
