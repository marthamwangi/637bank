import { Response, Request } from "express";
import User from "../users/schema";
import jwt from "jsonwebtoken";
export const registerUser = async function (req: Request, res: Response) {
    const { userName, password } = req.body;
    let user = new User({
        userName,
        password
    })
    try {
        let existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res
                .status(400)
                .send({ err: "User already exists" });
        }
        await user.save();
        return res
            .status(200)
            .send({ msg: "User registered!" })
    }
    catch (err: any) {

        if (err.code === 11000) {
            return res
                .status(400)
                .send({ err: "User already exists" });

        }
        res.status(500).send({ err: err.message });
    }
}
export const loginUser = async function (req: Request, res: Response) {
    const { userName, password } = req.body;
    let user: any;
    try {
        user = await User.findOne({ userName, password });

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
        jwt.sign(payload, "secret", { expiresIn: 28800000 }, (err: any, token: any) => {
            if (err) {
                return res
                    .status(400)
                    .send({ msg: "User not found!" });
            }

            res.json({
                userName,
                token
            });
        })
    } else {
        return res
            .status(400)
            .send({ msg: "User not found!" })
    }
}