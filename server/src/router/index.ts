import { Router } from 'express';
import common from './common';
import auth from './auth';
import category from './category';
import product from './product';
import products from './products';

const routes = Router();

routes.use('/common', common);
routes.use('/auth', auth);
routes.use('/products', products);
routes.use('/product', product);
routes.use('/category', category);

export default routes;
