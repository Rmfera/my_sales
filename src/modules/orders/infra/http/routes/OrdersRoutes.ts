import isAuthenticated from '@shared/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

import {
  createOrderValidate,
  idParamsValidate,
} from '../schemas/OrdersSchemas';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);
// Adicione esta linha antes ou depois das outras
ordersRouter.get('/', ordersController.index);
ordersRouter.get('/:id', idParamsValidate, ordersController.show);
ordersRouter.post('/', createOrderValidate, ordersController.create);

export default ordersRouter;
