import { Router } from 'express';
import UserController from '../controllers/UserController';
import isAuthenticated from '../Utils/authorization';

const router = Router();

router.get(
  '/notifications',
   isAuthenticated,
   UserController.getNotifications
  );

export default router;
