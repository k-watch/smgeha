import { Router } from 'express';
import * as categroyCtrl from '../controller/categoryCtrl';

const category = Router();

category.get('/header', categroyCtrl.getHeaderCategory);
category.get(
  '/productWirteCategory/:id',
  categroyCtrl.findProductWirteCategory,
);
category.get('/productManufacture/:id', categroyCtrl.findProductManufacture);
category.get('/productType/:id', categroyCtrl.findProductTypeCategory);

export default category;
