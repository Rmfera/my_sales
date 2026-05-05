import { Router } from 'express';
// import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';

import {
  createCustomerSchema,
  idParamsValidate,
  updateCustomerSchema,
} from '../schemas/CustomersSchemas';
import isAuthenticated from '@shared/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.index);

customersRouter.get('/:id', idParamsValidate, customersController.show);

customersRouter.post('/', createCustomerSchema, customersController.create);

customersRouter.patch(
  '/:id',
  idParamsValidate,
  updateCustomerSchema,
  customersController.update,
);

customersRouter.delete('/:id', idParamsValidate, customersController.delete);

export default customersRouter;
