var transactionsRouter = require("express").Router();
import { auth } from '../middlewares/auth';
import { depositAmount, transferAmount, withdrawAmount } from '../controllers/account.controller';
transactionsRouter
    .route('/:accountId/deposit')
    .post([auth], depositAmount)

transactionsRouter
    .route('/:accountId/transfer')
    .post([auth], transferAmount)

transactionsRouter
    .route('/:accountId/withdraw')
    .post([auth], withdrawAmount)

export default transactionsRouter;