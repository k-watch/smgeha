import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { checkImg } from '../../src/lib/fileManager';
import * as productCtrl from '../controller/productCtrl';
import checkLoggedIn from '../lib/checkLoggedIn';

// 파일 경로 및 이름 설정 옵션
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, process.env.IMAGE_PATH)); // 파일 업로드 경로
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); //파일 이름 설정
  },
});

//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const product = Router();

product.get('/:id', productCtrl.findOneProduct);
product.get('/write/:id', productCtrl.findOneProductWrite);
product.post('/', upload.array('file', 5), checkImg, productCtrl.write);
product.patch('/:id', upload.array('file', 5), productCtrl.update);
product.delete('/:id', /*checkLoggedIn,*/ productCtrl.remove);
product.get('/unit/:id', productCtrl.findOneUnit);

export default product;
