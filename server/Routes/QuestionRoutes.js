import { Router } from 'express';
import QuestionController  from '../controllers/QuestionsController';
import isAuthenticated from '../Utils/authorization';
import QuestionMiddlewares from '../Middlewares/QuestionMiddlewares';
import validateObjId from '../Middlewares/validateObjectId';

const router = Router();

router.post(
  '/',
  [ isAuthenticated, QuestionMiddlewares.validateBodyField ], 
  QuestionController.create
);

router.get(
  '/',
   QuestionController.index
  );

router.get(
  '/:id',
  validateObjId,
  QuestionController.show
  );

router.put(
  '/:id/upvote',
  [isAuthenticated, validateObjId],
  QuestionController.upvote
  );

router.put(
  '/:id/downvote',
  [isAuthenticated, validateObjId],
   QuestionController.downvote
  );

router.post(
  '/:id/respond',
  [isAuthenticated, validateObjId, QuestionMiddlewares.validateBodyField],
   QuestionController.respond
   );

export default router;
