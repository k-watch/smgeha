import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';
import React from 'react';

const Wrap = styled('div')(({ theme }) => ({
  height: '130px',
  backgroundColor: `${grey[200]}`,

  fontSize: '13px',
  color: `${grey[600]}`,
  fontWeight: 400,
  borderTop: `1px solid ${grey[400]}`,

  '& a': {
    color: `${lightBlue[900]}`,
  },

  '& ul': {
    position: 'relative',
    display: 'flex',
    paddingTop: '0px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px 0',
  },

  '& li': {
    '& span': {
      paddingRight: '20px',
    },
  },

  '& .blog': {
    '& img': {
      marginRight: '5px',
    },

    '& a': {
      position: 'absolute',
      display: 'flex',

      bottom: '12%',
      right: '17.5%',
      alignItems: 'center',
    },

    '& span': {
      fontSize: '16px',
      color: `${grey[600]}`,
      fontWeight: 600,
    },
  },

  [theme.breakpoints.down('md')]: {
    '& ul': {
      padding: '30px 30px',
    },
    height: '250px',
    '& .blog': {
      '& a': {
        bottom: '-5%',
        right: '9%',
      },
    },
  },
}));

function Footer() {
  return (
    <Wrap>
      <ul>
        <Grid container spacing={2}>
          <Grid item md={2} xs={12}>
            <li>
              <span>상호</span>
              <a href="https://bit.ly/3rBhpm7">새만금중고</a>
            </li>
          </Grid>
          <Grid item md={2} xs={12}>
            <li>
              <span>대표자명</span>
              <strong>김순자</strong>
            </li>
          </Grid>
          <Grid item md={3} xs={12}>
            <li>
              <span>대표전화번호</span>
              <strong>063-453-4137</strong>
            </li>
          </Grid>
          <Grid item md={3} xs={12}>
            <li>
              <span>사업자등록번호</span>
              <strong>111-12-11111</strong>
            </li>
          </Grid>
          <Grid item xs={12}>
            <li>
              <span>영업시간</span>
              09:00 ~ 19:00 (일요일 휴무)
            </li>
          </Grid>
          <Grid item xs={12}>
            <li>
              <span>오시는 길</span>
              <a href="https://bit.ly/3rBhpm7">
                54123 전라북도 군산시 팔마로 46 (군산시 문화동 908-21)
              </a>
            </li>
          </Grid>
        </Grid>
        <div className={'blog'}>
          <a href="https://blog.naver.com/apt4137">
            <img src="/blog.png" alt="blog" />
            <span>NAVER</span>
            &nbsp;
            <span>blog</span>
          </a>
        </div>
      </ul>
    </Wrap>
  );
}

export default Footer;
