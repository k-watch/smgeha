import { ProductsData } from 'modules/products/state';
import { styled } from '@mui/system';
import useProductsRecommend from './useProductsRecommend';
import Slider from 'react-slick';
import { grey } from '@mui/material/colors';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Wrap = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '98.9vw',
  height: '16vw',
  marginLeft: 'calc(-50vw + 50.9%)',
  marginBottom: 30,
  padding: '30px 0',
  backgroundColor: `${grey[50]}`,

  [theme.breakpoints.down('lg')]: {
    height: '29vw',
  },

  [theme.breakpoints.down('md')]: {
    width: 'inherit',
    height: '41vw',
    marginLeft: 0,
  },

  [theme.breakpoints.down('sm')]: {
    height: '68vw',
    marginBottom: 20,
    padding: '20px 0',
  },

  '& h1': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 20,
    color: `${grey[800]}`,
    fontSize: '2rem',
    fontWeight: 700,

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5625rem',
    },
  },

  '& .slides': {
    position: 'relative',
    height: 'inherit',
    '& .slick-prev, .slick-next': {
      position: 'absolute',
      top: '50%',
      opacity: 'none',

      '&:before': {
        fontSize: '1.875rem',
      },
    },
    '& .slick-prev': {
      left: 20,
      zIndex: 1,
    },
    '& .slick-next': {
      right: 30,
      zIndex: 1,
    },

    [theme.breakpoints.down('sm')]: {
      '& .slick-prev, .slick-next': {
        '&:before': {
          fontSize: '1.5625rem',
        },
      },

      '& .slick-prev': {
        left: 5,
      },
      '& .slick-next': {
        right: 10,
      },
    },
  },
}));

const ListStyle = styled('div')(({ theme }) => ({
  '& li': {
    position: 'relative',
    margin: '0 15px',

    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },

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
      top: 7,
      right: 7,
      zIndex: 1,
      fontSize: '1.5625rem',
      fontWeight: 700,
      color: 'white',
    },

    '& .imgWrap': {
      position: 'relative',
      width: '100%',
      height: 0,
      marginBottom: 7,
      paddingBottom: '70%',
      overflow: 'hidden',

      [theme.breakpoints.down('lg')]: {
        paddingBottom: '96%',
      },

      [theme.breakpoints.down('sm')]: {
        paddingBottom: '77%',
      },

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
      bottom: 10,
      left: 10,
      color: 'white',

      '& p': {
        marginTop: 10,
        marginRight: 10,
      },

      '& .manufacture': {
        display: 'inline-block',
        padding: 5,
        fontSize: '0.8125rem',
        fontWeight: 500,
        border: '1px solid white',
        borderRadius: 6,
      },

      '& .title': {
        fontSize: '1.5625rem',
        fontWeight: 800,
      },

      '& .content': {
        display: 'flex',
        fontSize: '16px',
        fontWeight: 500,
      },

      [theme.breakpoints.down('sm')]: {
        '& p': {
          marginTop: 7,
          marginRight: 7,
        },

        '& .manufacture': {
          fontSize: '0.625rem',
        },

        '& .title': {
          fontSize: '1.375rem',
          fontWeight: 700,
        },

        '& .content': {
          fontSize: '0.875rem',
        },
      },
    },
  },
}));

function ProductsRecommend() {
  const { recommendProducts, settings, onClick } = useProductsRecommend();

  return (
    <Wrap>
      <h1>추천 제품</h1>
      <Slider {...settings}>
        {recommendProducts &&
          recommendProducts.map((product: ProductsData, index: number) => (
            <ListStyle key={product.id} onClick={() => onClick(product.id)}>
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
