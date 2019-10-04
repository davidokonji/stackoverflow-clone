import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../Middlewares/UserMiddlewares';


const router = Router();

router.post(
  '/signup',
  [UserMiddlewares.validateSignup] ,
   UserController.createUser
  );
  
router.post(
  '/login',
  [UserMiddlewares.validateSignin],
   UserController.signinUser
   );

export default router;