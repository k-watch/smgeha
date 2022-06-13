require('dotenv').config();
import express from 'express';
import jwtMiddleware from './lib/jwtMiddleware';
import visitorsCnt from './lib/visitorsCnt';
import { createConnection } from 'typeorm';
import router from './router';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: '*',
    credential: 'true',
  }),
);
app.enable('trust proxy');
app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleware);

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(visitorsCnt);
app.use('/api', router);

app.use(express.static(path.join(__dirname, process.env.STATIC_PATH)));
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, process.env.NOT_PAGE));
});

createConnection().then((connection) => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('server is listening');
  });
});
