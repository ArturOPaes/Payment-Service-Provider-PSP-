import { Router } from 'express';

import TransactionController from './app/controllers/TransactionController';
import PayableController from './app/controllers/PayableController';

const routes = new Router();

routes.post('/transactions', TransactionController.insert);
routes.get('/transactions', TransactionController.findAll);

routes.get('/payables', PayableController.findAll);

export default routes;
