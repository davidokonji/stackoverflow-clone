import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddlewares from '../Middlewares/AuthMiddlewares';


const router = Router();

router.post(
  '/signup',
  [AuthMiddlewares.validateSignup],
   AuthController.createUser
  );
  
router.post(
  '/login',
  [AuthMiddlewares.validateSignin],
   AuthController.signinUser
   );

export default router;