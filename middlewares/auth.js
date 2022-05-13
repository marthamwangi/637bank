const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');
dotenv.config();
exports.auth = (req, res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).send(
            {
                msg: 'Denied Access'
            }
        );
    }
    try{
        user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error){
        res.status(401).json({errors: [{msg: 'invalid token'}]})
    }
}