import { Router } from 'express';
import * as productCtrl from '../controller/productCtrl';

const products = Router();

products.get('/:id', productCtrl.findAllProduct);

export default products;
