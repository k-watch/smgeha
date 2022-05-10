import { green, grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import { Chip, Grid, Skeleton } from '@mui/material';
import { ProductsData } from 'modules/products/state';
import useProducts from './useProducts';

const ChipStyle = styled(Chip)({
  marginBottom: 6,

  '&.MuiChip-root': {
    height: 22,
    marginRight: 8,
    borderRadius: 19,

    '& .MuiChip-label': {
      padding: '5px 10px',
      fontSize: 12,
      fontWeight: 600,
      color: `${grey[700]}`,
    },
  },
  '&.MuiChip-filled': {
    border: `1px solid ${grey[400]}`,
    backgroundColor: 'white',
  },
});

const Wrap = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  margin: '10px 2px',

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
      borderRadius: 4,
      transform: 'scale(1.0)',
      transition: '.3s',

      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.2)',
        transition: '.3s',
      },
    },
  },

  '& .contentWrap': {
    padding: '0 7px',
    '& p': {
      paddingBottom: 7,
    },

    '& .manufacture': {
      fontSize: 12,
      fontWeight: 400,
      color: `${grey[600]}`,
    },

    '& .title': {
      fontWeight: 500,
    },

    '& .content': {
      overflow: 'auto',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
    },

    '& .size': {
      display: 'flex',
      alignItems: 'center',
      fontSize: 15,
      color: `${grey[800]}`,
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },

    '& .blockWrap': {
      display: 'flex',

      '& .recommend': {
        width: 23,
        marginRight: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: `${lightBlue[400]}`,
        fontSize: 12,
        color: 'white',
      },

      '& .blog': {
        width: 23,
        padding: 5,
        borderRadius: 5,
        backgroundColor: `${green[500]}`,
        fontSize: 12,
        color: 'white',
      },
    },
  },
}));

function ProductList() {
  const { slideRef, onMouseDown, isLoading, list } = useProducts();

  return (
    <>
      <Wrap>
        <Grid container spacing={3}>
          {isLoading
            ? Array.from(new Array(12)).map((item, index) => (
                <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={225}
                  />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" height={23} />
                  <Skeleton animation="wave" height={28} />
                </Grid>
              ))
            : null}
          {list &&
            list.map((product: ProductsData) => (
              <Grid key={product.id} item lg={3} md={4} sm={6} xs={6}>
                <div className="imgWrap">
                  <img src={`images/${product.image}`} alt={product.name} />
                </div>
                <div className="contentWrap">
                  <p className="manufacture">{product.manufacture}</p>
                  <p className="title">{product.name}</p>
                  <div
                    className="content"
                    ref={slideRef}
                    onMouseDown={onMouseDown}
                  >
                    <ChipStyle label={product.type} />
                    <ChipStyle label={product.size} />
                  </div>

                  <div className="blockWrap">
                    {product.recommend ? (
                      <p className="recommend">추천</p>
                    ) : null}
                    {product.url ? <p className="blog">blog</p> : null}
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
      </Wrap>
    </>
  );
}

export default ProductList;
