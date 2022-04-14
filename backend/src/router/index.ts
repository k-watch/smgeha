import { Router } from 'express';
import auth from './auth';
import product from './product';
import products from './products';

const routes = Router();

routes.use('/auth', auth);
routes.use('/products', products);
routes.use('/product', product);

export default routes;
