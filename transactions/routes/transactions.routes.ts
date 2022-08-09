var transactionsRouter = require("express").Router();
import { auth } from '../../shared-middlewares/auth';
import { depositAmount, transferAmount, withdrawAmount } from '../../shared-controllers/account.controller';
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