require('dotenv').config();
import express from 'express';
import jwtMiddleware from './lib/jwtMiddleware';
import { createConnection } from 'typeorm';
import router from './router';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

// body-parser는 내장되어 있음. json 파싱하기 위해서 설정만 추가
app.use(express.json());
// 미들웨어 설정 전에 cookieParser 설정해줘야 쿠키를 얻을 수 있음
app.use(cookieParser());
app.use(jwtMiddleware);

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// '/' <-> '/api' 랑 다름
// api 무조건 붙여야 함, react proxy도 /api 붙여야 함
// 안 붙이면 3000으로 붙는게 아니라 8080으로 붙음
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

createConnection().then((connection) => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('server is listening 8080');
  });
});
