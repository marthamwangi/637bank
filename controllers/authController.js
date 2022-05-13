const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async function (req, res) {
    const { userName, password } = req.body;
    let user;
    user = new User({
        userName,
        password
    })
    let existingUser 
    try {
        existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res
                .status(400)
                .send({ err: 'User already exists'});
        }
        await user.save();
        return res
            .status(200)
            .send({ msg: 'User registered!' })
    }
    catch (err) {

        if (err.code === 11000) {
            return res
                .status(400)
                .send({ err: 'User already exists' });

        }
        res.status(500).send({ msg: 'Server error'});
    }
}
exports.loginUser = async function (req, res) {
    const { userName, password } = req.body;
    let user;
    try {
        user = await User.findOne({ userName, password });

    } catch (error) {
        if (error.code === 400) {
            return res
                .status(400)
                .send({ msg: 'User not found!' })
        }
        return res.status(500).send({ msg: 'Server error' });

    }


    if (user) {
        const payload = {
            id: user.id
        }
        await jwt.sign(payload, 'secret', { expiresIn: 28800000 }, (err, token) => {
            if (err) {
                return res
                    .status(400)
                    .send({ msg: 'User not found!' })
            }

            res.json({
                userName,
                token
            });
        })
    } else {
        return res
            .status(400)
            .send({ msg: 'User not found!' })
    }
}