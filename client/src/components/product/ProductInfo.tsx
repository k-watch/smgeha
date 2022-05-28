import { Chip, Grid, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import Button from 'components/common/Button';
import Slider from 'react-slick';
import useProductInfo from './useProductInfo';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Desktop, Mobile } from 'lib/styles/common';

const Wrap = styled('div')(({ theme }) => ({
  margin: '30px 0',

  '& img': {
    height: 500,
    objectFit: 'cover',
  },

  '& .slides': {
    position: 'relative',
    '& .slick-prev, .slick-next': {
      position: 'absolute',
      top: '50%',
      opacity: 'none',
      '&:before': {
        fontSize: 30,
      },
    },
    '& .slick-prev': {
      left: 5,
      zIndex: 1,
    },
    '& .slick-next': {
      right: 15,
      zIndex: 1,
    },
  },

  '& .rightWrap': {
    marginLeft: 20,
    padding: 20,
    border: `1px solid ${grey[200]}`,
    borderRadius: 4,

    '& .title': { fontWeight: 500 },
    '& .question': { marginTop: 20, marginBottom: 10, color: `${grey[600]}` },
    '& .phone': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      height: 50,
      marginTop: 15,
      fontSize: '1.125rem',
    },

    [theme.breakpoints.down('lg')]: {
      margin: '10px 0',
      '& .phone': {
        marginBottom: 0,
      },
    },
  },

  '& .contentWrap': {
    marginTop: 20,

    '& .manufacture': {
      fontSize: '1rem',
      fontWeight: 500,
      color: `${grey[600]}`,
    },
    '& .name': {
      margin: '10px 0',
      fontSize: '2.1875rem',
      fontWeight: 600,
    },
  },

  '& .content': {
    margin: '30px 0',
    lineHeight: 1.5,
  },
}));

const ChipStyle = styled(Chip)({
  marginBottom: 6,

  '&.MuiChip-root': {
    height: 30,
    marginRight: 10,
    borderRadius: 19,

    '& .MuiChip-label': {
      padding: '8px 13px',
      fontSize: '0.8125rem',
      fontWeight: 600,
      color: `${grey[700]}`,
    },
  },
  '&.MuiChip-filled': {
    border: `1px solid ${grey[400]}`,
    backgroundColor: 'white',
  },
});

function ProductInfo() {
  const { product, settings } = useProductInfo();

  return (
    <Wrap>
      <Grid container>
        <Grid item lg={8} sm={12} xs={12}>
          <Slider {...settings}>
            {product &&
              product.image.map((image, index) => (
                <img key={index} src={`/images/${image}`} alt={`${image}`} />
              ))}
          </Slider>
        </Grid>
        <Grid item lg={4} sm={12} xs={12}>
          {product && (
            <div className="rightWrap">
              <p className="title">군산 새만금중고</p>
              <p className="question">문의전화</p>
              <p className="phone">
                <LocalPhoneIcon />
                &nbsp;063-453-4137
              </p>
              {product.url && (
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" fullWidth>
                    블로그 가기
                  </Button>
                </a>
              )}
              <a
                href="http://naver.me/xIh4bleL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" fullWidth>
                  오시는 길
                </Button>
              </a>
            </div>
          )}
        </Grid>
        <Grid item lg={8} sm={12} xs={12}>
          {product && (
            <div className="contentWrap">
              <p className="manufacture">{product.manufacture} </p>
              <p className="name">{product.name} </p>
              <ChipStyle label={`#${product.type}`} />
              <ChipStyle label={`#${product.size}`} />
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Wrap>
  );
}
export default ProductInfo;
