import { Router } from 'express';
import * as productCtrl from '../controller/productCtrl';
import checkLoggedIn from '../lib/checkLoggedIn';

const product = Router();

product.get('/:id', productCtrl.findOneProduct);
product.post('/', checkLoggedIn, productCtrl.write);
product.patch('/:id', checkLoggedIn, productCtrl.update);
product.delete('/:id', checkLoggedIn, productCtrl.remove);

export default product;
