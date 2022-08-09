import { Response, Request, NextFunction } from "express";
import Joi from "joi";
import User from "../schema";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { createUser } from "../services";
//user interface
export const registerUser = async function (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body)
        jwt.sign(user, config.secret, { expiresIn: 28800000 }, (err: any, token: string) => {
            return res.json({ token });
        })
    } catch (error) {
        return next(error);
    }

    // let user = new User(req.body);
    // try {
    //     let existingUser = await User.findOne({ username: req.body.username });
    //     if (existingUser) {
    //         return res
    //             .status(400)
    //             .send({ err: "User already exists" });
    //     }
    //     await user.save();
    //     return res
    //         .status(200)
    //         .send({ msg: "User registered!" })
    // }
    // catch (error: any) {

    //     if (error.code.includes("duplicate key error collection")) {
    //         return res
    //             .status(400)
    //             .send({ error: "User already exists" });

    //     }
    //     res.status(500).send({ error: "Internal server error" }); //don't send error to client
    // }
}
export const loginUser = async function (req: Request, res: Response) {
    const { username, password } = req.body;
    let user: any;
    try {
        user = await User.findOne({ username, password });

    } catch (error: any) {
        if (error.code === 400) {
            return res
                .status(400)
                .send({ msg: "User not found!" })
        }
        return res.status(500).send({ msg: "Server error" });

    }


    if (user) {
        const payload = {
            id: user.id
        }
        jwt.sign(payload, config.secret, { expiresIn: 28800000 }, (err: any, token: any) => {
            if (err) {
                return res
                    .status(400)
                    .send({ msg: "User not found!" });
            }

            res.json({
                username,
                token
            });
        })
    } else {
        return res
            .status(400)
            .send({ msg: "User not found!" })
    }
}