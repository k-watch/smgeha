import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import Button from 'components/common/Button';
import Slider from 'react-slick';
import useProductInfo from './useProductInfo';

const Wrap = styled('div')(({ theme }) => ({
  margin: '30px 0',

  '& img': {
    height: 500,
    objectFit: 'cover',
  },

  '& .contentWrap': {
    position: 'relative',
    height: '100%',
    marginLeft: 70,

    '& .manufacture': {
      fontSize: '1.5625rem',
      fontWeight: 500,
      color: `${grey[600]}`,
    },
    '& .name': {
      margin: '20px 0',
      fontSize: '3.4375rem',
      fontWeight: 600,
    },
    '& .size': {
      position: 'absolute',
      bottom: '30%',
      right: 0,
      fontSize: '1.875rem',
      fontWeight: 500,
      color: `${grey[700]}`,
    },
    '& .type': {
      position: 'absolute',
      bottom: '20%',
      right: 0,
      fontSize: '1.875rem',
      fontWeight: 500,
      color: `${grey[700]}`,
    },
    '& .MuiButton-root': {
      position: 'absolute',
      bottom: 0,
      marginTop: 20,
      height: 60,
      fontSize: '1.25rem',
    },

    [theme.breakpoints.down('lg')]: {
      height: 400,
      margin: '40px 0',
    },
  },
}));

function ProductInfo() {
  const { product, settings } = useProductInfo();
  return (
    <Wrap>
      <Grid container>
        <Grid lg={6} sm={12} xs={12}>
          <Slider {...settings}>
            {product &&
              product.image.map((image, index) => (
                <img key={index} src={`/images/${image}`} alt={`${image}`} />
              ))}
          </Slider>
        </Grid>
        <Grid lg={6} sm={12} xs={12}>
          {product && (
            <div className="contentWrap">
              <p className="manufacture">{product.manufacture} </p>
              <p className="name">{product.name} </p>
              <p className="size">크기 : {product.size} </p>
              <p className="type">유형 : {product.type} </p>
              {product.url ? (
                <a
                  href={`${product.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained" fullWidth>
                    블로그
                  </Button>
                </a>
              ) : (
                <a
                  href="http://naver.me/xIh4bleL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained" fullWidth>
                    오시는 길
                  </Button>
                </a>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </Wrap>
  );
}
export default ProductInfo;
