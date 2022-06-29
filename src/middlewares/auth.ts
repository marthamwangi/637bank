import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
declare module "express" {
    export interface Request {
        user: any
    }
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send(
            {
                msg: "Denied Access"
            }
        );
    }
    try {
        let user: any;
        user = jwt.verify(token, config.secret);
        req.user = user;
        next();
    }
    catch (error: any) {
        res.status(401).json({ errors: [{ msg: "invalid token" }] })
    }
}