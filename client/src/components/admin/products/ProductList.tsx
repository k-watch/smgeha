import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import { Chip, Grid } from '@mui/material';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import useDraggableScroll from 'use-draggable-scroll';
import { useRef } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from 'components/common/Button';

const ListWrap = styled('ul')(({ theme }) => ({
  '& li': {
    '&:first-of-type': {},
  },
}));

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

const ListItem = styled('li')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  margin: '10px 2px',

  '& .imgWrap': {
    position: 'relative',
    marginBottom: 7,

    '& img': {
      width: '100%',
      objectFit: 'cover',
      borderRadius: 4,
    },

    '& .imageBtn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 2.5,

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
  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref, { direction: 'horizontal' });
  return (
    <>
      <ListWrap>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item md={3} sm={4} xs={6}>
              <div className="imgWrap">
                <img src="images/1651131602811.png" alt="이미지" />
                <div className="imageBtn">
                  <Button variant="text">
                    <AutoFixHighIcon />
                  </Button>
                  <Button variant="text">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </div>
              <div className="contentWrap">
                <p className="manufacture">삼성전자</p>
                <p className="title">삼성 냉장고</p>
                <div className="content" ref={ref} onMouseDown={onMouseDown}>
                  <ChipStyle label="일반형" />
                  <ChipStyle label="200L" />
                </div>
                <p className="link">
                  <InsertLinkOutlinedIcon />
                  <a href="www.naver.com">www.naver.com www.naver.com</a>
                </p>

                <p className="recommend">추천</p>
              </div>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <div className="imgWrap">
                <img src="images/1651131602811.png" alt="이미지" />
                <div className="imageBtn">
                  <Button variant="text">
                    <AutoFixHighIcon />
                  </Button>
                  <Button variant="text">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </div>
              <div className="contentWrap">
                <p className="title">삼성 냉장고</p>
                <div className="content" ref={ref} onMouseDown={onMouseDown}>
                  <ChipStyle label="삼성" />
                  <ChipStyle label="일반형" />
                </div>
                <p className="link">
                  <InsertLinkOutlinedIcon />
                  <a href="www.naver.com">www.naver.com www.naver.com</a>
                </p>

                <p className="recommend">추천</p>
              </div>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <div className="imgWrap">
                <img src="images/1651131602811.png" alt="이미지" />
                <div className="imageBtn">
                  <Button variant="text">
                    <AutoFixHighIcon />
                  </Button>
                  <Button variant="text">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </div>
              <div className="contentWrap">
                <p className="title">삼성 냉장고</p>
                <div className="content" ref={ref} onMouseDown={onMouseDown}>
                  <ChipStyle label="삼성" />
                  <ChipStyle label="일반형" />
                </div>
                <p className="link">
                  <InsertLinkOutlinedIcon />
                  <a href="www.naver.com">www.naver.com www.naver.com</a>
                </p>

                <p className="recommend">추천</p>
              </div>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <div className="imgWrap">
                <img src="images/1651131602811.png" alt="이미지" />
                <div className="imageBtn">
                  <Button variant="text">
                    <AutoFixHighIcon />
                  </Button>
                  <Button variant="text">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </div>
              <div className="contentWrap">
                <p className="title">삼성 냉장고</p>
                <div className="content" ref={ref} onMouseDown={onMouseDown}>
                  <ChipStyle label="삼성" />
                  <ChipStyle label="일반형" />
                </div>
                <p className="link">
                  <InsertLinkOutlinedIcon />
                  <a href="www.naver.com">www.naver.com www.naver.com</a>
                </p>

                <p className="recommend">추천</p>
              </div>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <div className="imgWrap">
                <img src="images/1651131602811.png" alt="이미지" />
                <div className="imageBtn">
                  <Button variant="text">
                    <AutoFixHighIcon />
                  </Button>
                  <Button variant="text">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </div>
              <div className="contentWrap">
                <p className="title">삼성 냉장고</p>
                <div className="content" ref={ref} onMouseDown={onMouseDown}>
                  <ChipStyle label="삼성" />
                  <ChipStyle label="일반형" />
                </div>
                <p className="link">
                  <InsertLinkOutlinedIcon />
                  <a href="www.naver.com">www.naver.com www.naver.com</a>
                </p>

                <p className="recommend">추천</p>
              </div>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <div className="imgWrap">
                <img src="images/1651131602811.png" alt="이미지" />
                <div className="imageBtn">
                  <Button variant="text">
                    <AutoFixHighIcon />
                  </Button>
                  <Button variant="text">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </div>
              <div className="contentWrap">
                <p className="title">삼성 냉장고</p>
                <div className="content" ref={ref} onMouseDown={onMouseDown}>
                  <ChipStyle label="삼성" />
                  <ChipStyle label="일반형" />
                </div>
                <p className="link">
                  <InsertLinkOutlinedIcon />
                  <a href="www.naver.com">www.naver.com www.naver.com</a>
                </p>

                <p className="recommend">추천</p>
              </div>
            </Grid>
          </Grid>
        </ListItem>
      </ListWrap>
    </>
  );
}

export default ProductList;
