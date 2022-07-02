var authRouter = require("express").Router();
import { registerUser, loginUser } from '../../controllers/auth.controller';
authRouter
    .route('/register')
    .post(registerUser)

authRouter.route('/login')
    .post(loginUser)

export default authRouter;