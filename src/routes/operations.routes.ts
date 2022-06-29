var operationsRouter = require("express").Router();
import { auth } from '../middlewares/auth';
import { createBankAccount, getFinalBalances } from '../controllers/account.controller';

operationsRouter
    .route('/create-account')
    .post([auth], createBankAccount);

operationsRouter.route('/get-balances')
    .get(getFinalBalances)
export default operationsRouter;