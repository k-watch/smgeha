import { Router } from 'express';
import * as authCtrl from '../controller/auth.ctrl';

const auth = Router();

// 회원가입은 현재 사용하지 않음
auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;
