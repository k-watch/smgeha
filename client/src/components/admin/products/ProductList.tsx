import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import {
  Backdrop,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton,
  Snackbar,
  Tooltip,
} from '@mui/material';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from 'components/common/Button';
import useProductList from './useProductList';
import { ProductsData } from 'modules/products/state';
import CloseIcon from '@mui/icons-material/Close';

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
    },

    '& .imageBtn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,

      width: '100%',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      backgroundColor: 'rgba(37, 37, 37, 0.5)',

      '& .MuiButton-root': {
        minWidth: 50,
        padding: '6px 0',
        color: 'white',
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

    '& .link': {
      display: 'flex',
      alignItems: 'center',
      fontSize: 15,
      color: `${lightBlue[900]}`,

      '& .MuiSvgIcon-root': {
        paddingRight: 3,
      },

      '& a': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: `${lightBlue[900]}`,
      },
    },

    '& .recommend': {
      width: 23,
      padding: 5,
      borderRadius: 5,
      backgroundColor: `${lightBlue[400]}`,
      fontSize: 12,
      color: 'white',
    },
  },
}));

function ProductList() {
  const {
    listMutation,
    slideRef,
    onMouseDown,
    onRemove,
    removeLodingOpen,
    removeSuccessClose,
    removeSuccessOpen,
    setPorductInfo,
  } = useProductList();
  const { isLoading, isSuccess, data } = listMutation;

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={removeSuccessClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Wrap>
        <Grid container spacing={3}>
          {isLoading
            ? Array.from(new Array(10)).map((item, index) => (
                <Grid key={index} item md={3} sm={4} xs={12}>
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
          {data &&
            data.map((product: ProductsData) => (
              <Grid key={product.id} item lg={3} md={4} sm={4} xs={12}>
                <div className="imgWrap">
                  <img src={`images/${product.image}`} alt={product.name} />
                  <div className="imageBtn">
                    <Button
                      variant="text"
                      onClick={() => setPorductInfo(product)}
                    >
                      <AutoFixHighIcon />
                    </Button>
                    <Button variant="text" onClick={() => onRemove(product.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </div>
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

                  <p className="link">
                    <InsertLinkOutlinedIcon />
                    <Tooltip title="www.naver.com www.naver.com" arrow>
                      <a href="www.naver.com">www.naver.com www.naver.com</a>
                    </Tooltip>
                  </p>
                  {product.recommend ? <p className="recommend">추천</p> : null}
                </div>
              </Grid>
            ))}
        </Grid>
      </Wrap>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={removeLodingOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={removeSuccessOpen}
        autoHideDuration={6000}
        onClose={removeSuccessClose}
        message="삭제가 완료되었습니다."
        action={action}
      />
    </>
  );
}

export default ProductList;
