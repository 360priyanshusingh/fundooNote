import express from 'express';
import * as userController from '../controllers/user.controller';
import { loginUserValidator, newUserValidator ,newPasswordValidator} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('',newUserValidator, userController.newUser);

router.post('/login',userController.loginUser);

router.post('/forgetPassword',userController.forgetFassword);

router.post('/resetPassword/:email',newPasswordValidator,userController.resetPassword);




export default router;
