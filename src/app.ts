"use strict";
import express from "express";
import bodyParser from "body-parser";
const app = express();
/**ROUTES*/
import userRoutes from "./users/routes/user.routes";
import transactionRoutes from "./transactions/routes/transactions.routes";
import operationsRoutes from "./operations/routes/operations.routes";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", function (req: any, res: { send: (arg0: string) => void; }) {
    res.send("637 Bank")
});
app.use("/auth", userRoutes);
app.use("/transact", transactionRoutes);
app.use("/operation", operationsRoutes);

export default app;

