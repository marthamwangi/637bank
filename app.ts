import express, { ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
const app = express();

/**ROUTES*/
import userRoutes from "./users/routes/user.routes";
import transactionRoutes from "./transactions/routes/transactions.routes";
import operationsRoutes from "./operations/routes/operations.routes";
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.send(err)
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get(
    "/",
    (req, res) => {
        // res.send("637 Bank");
        return res.send("637 Bank");
    }
);
app.use("/auth", userRoutes);
app.use("/transact", transactionRoutes);
app.use("/operation", operationsRoutes);
app.use(errorHandler);

export default app;
