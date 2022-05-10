import { ProductsData } from 'modules/products/state';
import { styled } from '@mui/system';
import useProductsRecommend from './useProductsRecommend';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { grey } from '@mui/material/colors';

const Wrap = styled('div')(({ theme }) => ({
  position: 'relative',
  marginBottom: 30,
  padding: 25,
  border: `2px solid ${grey[300]}`,
  borderRadius: 10,

  [theme.breakpoints.down('sm')]: {
    padding: 10,
  },

  '& h1': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 20,
    backgroundColor: 'white',
    textAlign: 'center',
    color: `${grey[800]}`,
    fontSize: 33,
    fontWeight: 700,

    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
    },
  },
}));

const ListStyle = styled('div')(({ theme }) => ({
  '& li': {
    position: 'relative',
    margin: 10,

    '& img': {
      transform: 'scale(1.0)',
      transition: '.3s',
    },

    '&:hover': {
      cursor: 'pointer',
      borderRadius: 8,

      '& img': {
        transform: 'scale(1.2)',
        transition: '.3s',
      },
    },

    '& .number': {
      position: 'absolute',
      top: -5,
      right: 0,
      zIndex: 1,
      margin: 15,
      padding: 4,
      fontSize: 35,
      fontWeight: 700,
      color: 'white',
    },

    '& .imgWrap': {
      position: 'relative',
      marginBottom: 7,
      width: '100%',
      height: 0,
      paddingBottom: '100%',
      overflow: 'hidden',

      '& img': {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8,
      },
    },

    '& .contentWrap': {
      position: 'absolute',
      bottom: -10,
      margin: 20,
      color: 'white',

      '& p': {
        marginBottom: 10,
      },

      '& .manufacture': {
        display: 'inline-block',
        padding: 5,
        fontSize: 14,
        fontWeight: 500,
        border: '1px solid white',
        borderRadius: 6,
      },

      '& .title': {
        fontSize: 30,
        fontWeight: 800,
      },

      '& .content': {
        display: 'flex',
        fontSize: 18,
        fontWeight: 500,

        '& p': {
          marginRight: 10,
        },
      },
    },
  },
}));

function ProductsRecommend() {
  const { recommendList, settings } = useProductsRecommend();

  return (
    <Wrap>
      <h1>추천 제품</h1>
      <Slider {...settings}>
        {recommendList &&
          recommendList.map((product: ProductsData, index: number) => (
            <ListStyle key={product.id}>
              <li>
                <p className="number">
                  {(index + 1).toString().padStart(2, '0')}
                </p>
                <div className="imgWrap">
                  <img src={`images/${product.image}`} alt={product.name} />
                </div>
                <div className="contentWrap">
                  <p className="manufacture">{product.manufacture}</p>
                  <p className="title">{product.name}</p>
                  <div className="content">
                    <p>{`#${product.type}`}</p>
                    <p>{`#${product.size}`}</p>
                  </div>
                </div>
              </li>
            </ListStyle>
          ))}
      </Slider>
    </Wrap>
  );
}

export default ProductsRecommend;
