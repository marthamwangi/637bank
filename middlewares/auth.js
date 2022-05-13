const jwt = require('jsonwebtoken');
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
        user = jwt.verify(token, 'secret');
        req.user = user;
        next();
    }
    catch (error){
        res.status(401).json({errors: [{msg: 'invalid token'}]})
    }
}