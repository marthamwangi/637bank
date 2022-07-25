var operationsRouter = require("express").Router();
import { auth } from "../../shared-middlewares/auth";
import { createBankAccount, getFinalBalances } from "../../shared-controllers/account.controller";

operationsRouter
    .route("/create-account")
    .post([auth], createBankAccount);

operationsRouter.route("/get-balances")
    .get(getFinalBalances)
export default operationsRouter;