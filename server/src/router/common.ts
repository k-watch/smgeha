import { Router } from 'express';
import * as commonCtrl from '../controller/commonCtrl';

const common = Router();

common.post('/findVisitorsCntWeek', commonCtrl.findVisitorsCntWeek);
common.post('/findImage', commonCtrl.findImage);

export default common;
