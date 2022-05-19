import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { grey } from '@mui/material/colors';

const Wrap = styled('div')(() => ({
  '&:before': {
    width: '100vh',
    background: 'black',
  },

  '& .header': {
    paddingTop: 150,
    paddingBottom: 50,
    fontSize: 35,
    fontWeigth: 500,
    textAlign: 'center',
  },

  '& .imgWrap': {
    position: 'relative',
    marginBottom: 7,
    width: '100%',
    height: 0,
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
  },

  '& .contentWrap': {
    padding: '10px 15px',

    '& p': {
      marginBottom: 10,
    },
    '& .title': {
      fontSize: 19,
      fontWeight: 400,
    },
    '& .content': {
      lineHeight: 1.3,
      fontSize: 15,
      fontWeight: 300,
      color: `${grey[700]}`,
    },
  },
}));

const HeaderWrap = styled('div')({
  marginTop: 100,

  '& img': {
    width: '100%',
    maxHeight: 500,
    objectFit: 'cover',
    borderRadius: 6,
  },

  '& p': {
    lineHeight: 1.8,
    fontSize: 20,
    fontWeight: 400,
    color: `${grey[800]}`,

    '& .MuiSvgIcon-root': {
      fontSize: 16,
    },
  },
});

const ShopWrap = styled('div')(() => ({
  '& .imgWrap': {
    paddingBottom: '70%',
  },
}));

const ServiceWrap = styled('div')(() => ({
  marginBottom: 30,

  '& .imgWrap': {
    paddingBottom: '100%',
  },
}));

function Main() {
  return (
    <Wrap>
      <div className="bgColor" />
      <HeaderWrap>
        <Grid container spacing={{ lg: 10, xs: 2 }}>
          <Grid item lg={6} xs={12}>
            <Fade direction="up">
              <img src="/images/main.png" alt="main" />
            </Fade>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Fade direction="up" delay={300}>
              <p>
                안녕하세요.
                <br />
                최고의 중고제품만 취급하는 군산 새만금 중고 마트입니다.
                <br />
                <br />
                저희는 제품 판매뿐만이 아닌 매입도 함께 하고 있으며, 최저가 판매
                및 최고가 매입을 원칙으로 운영중입니다.
                <br />
                고객님께서 제품 구매 시 배달, 설치 뿐 아니라 사용하셨던 제품까지
                철거해드리고 있습니다.
                <br />
                <br />
                언제나 최고의 품질과 서비스로 여러분을 찾아뵙겠습니다.
                <br />
                감사합니다.
              </p>
            </Fade>
          </Grid>
        </Grid>
      </HeaderWrap>
      <ShopWrap>
        <Fade direction="up">
          <p className="header">매장소개</p>
        </Fade>
        <Grid container spacing={5}>
          <Grid item md={4} xs={12}>
            <Fade direction="up">
              <div className="imgWrap">
                <img src="/images/shopOut.png" alt="매장" />
              </div>
              <div className="contentWrap">
                <p className="title">매장전경</p>
                <p className="content">
                  군산 최고의 중고 제품을 판매하는 새만금중고마트의 매장
                  전경입니다.
                </p>
              </div>
            </Fade>
          </Grid>

          <Grid item md={4} xs={12}>
            <Fade direction="up" delay={200}>
              <div className="imgWrap">
                <img src="/images/shopIn.png" alt="매장입구" />
              </div>
              <div className="contentWrap">
                <p className="title">매장입구</p>
                <p className="content">
                  매장에 방문하시면 냉장고, 에어컨, 세탁기, TV 외 다양한
                  가전제품을 만나실 수 있습니다.
                </p>
              </div>
            </Fade>
          </Grid>

          <Grid item md={4} xs={12}>
            <Fade direction="up" delay={400}>
              <div className="imgWrap">
                <img src="/images/shopIn2.png" alt="매장내부" />
              </div>
              <div className="contentWrap">
                <p className="title">매장내부</p>
                <p className="content">
                  직접 매장에 방문하시면, 최고의 서비스로 보답하겠습니다. 배달,
                  AS, 철거 전부 가능합니다.
                </p>
              </div>
            </Fade>
          </Grid>
        </Grid>
      </ShopWrap>

      <ServiceWrap>
        <Fade direction="up">
          <p className="header">설치과정</p>
        </Fade>
        <Grid container spacing={3}>
          <Grid item md={3} xs={6}>
            <Fade direction="left">
              <div className="imgWrap">
                <img src="/images/productCheck.png" alt="매장" />
              </div>
              <div className="contentWrap">
                <p className="title">제품검수</p>
                <p className="content">
                  제품 문제를 미연에 방지하기 위해 전문가가 제품을 꼼꼼하게
                  검수합니다.
                </p>
              </div>
            </Fade>
          </Grid>

          <Grid item md={3} xs={6}>
            <Fade direction="left" delay={200}>
              <div className="imgWrap">
                <img src="/images/productDelivery.png" alt="매장입구" />
              </div>
              <div className="contentWrap">
                <p className="title">배달</p>
                <p className="content">
                  고객님이 구매하신 제품에 어떠한 하자도 발생시키지 않기 위해
                  최대한 빠르고 안전하게 배달해드립니다.
                </p>
              </div>
            </Fade>
          </Grid>

          <Grid item md={3} xs={6}>
            <Fade direction="left" delay={400}>
              <div className="imgWrap">
                <img src="/images/productInstall.png" alt="매장내부" />
              </div>
              <div className="contentWrap">
                <p className="title">설치</p>
                <p className="content">
                  제품을 원하시는 위치에 설치해드리고, 문제가 없는지 작동 후
                  체크합니다.
                </p>
              </div>
            </Fade>
          </Grid>

          <Grid item md={3} xs={6}>
            <Fade direction="left" delay={600}>
              <div className="imgWrap">
                <img src="/images/productService.png" alt="매장내부" />
              </div>
              <div className="contentWrap">
                <p className="title">AS</p>
                <p className="content">
                  제품 설치 후 제품에 하자가 발생하였을 경우 구매 후 6개월 경과
                  전이라면 즉시 AS 해드립니다.
                </p>
              </div>
            </Fade>
          </Grid>
        </Grid>
      </ServiceWrap>
    </Wrap>
  );
}

export default Main;
