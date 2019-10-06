import { Router } from 'express';
import QuestionController  from '../controllers/QuestionsController';
import isAuthenticated from '../Utils/authorization';
import QuestionMiddlewares from '../Middlewares/QuestionMiddlewares';
import { validateObjId } from '../Utils/routeAssertations';
import SubscriptionMiddleware from '../Middlewares/SubscriptionMiddleware';

const router = Router();

router.post(
  '/',
  [ isAuthenticated, QuestionMiddlewares.validateFields], 
  QuestionController.create
);

router.get(
  '/',
   QuestionController.index
  );

router.get(
  '/:id',
  [validateObjId, QuestionMiddlewares.validateQuestion],
  QuestionController.show
  );

router.put(
  '/:id/upvote',
  [isAuthenticated, validateObjId, QuestionMiddlewares.validateQuestion, QuestionMiddlewares.validateVoter],
  QuestionController.upvote
  );

router.put(
  '/:id/downvote',
  [isAuthenticated, validateObjId, QuestionMiddlewares.validateQuestion, QuestionMiddlewares.validateVoter],
   QuestionController.downvote
  );

router.post(
  '/:id/respond',
  [
    isAuthenticated,
    validateObjId,
    QuestionMiddlewares.validateQuestion,
    QuestionMiddlewares.validateBodyField
  ],
   QuestionController.respond
   );

router.post(
  '/:id/subscribe',
  [
    isAuthenticated,
    validateObjId,
    QuestionMiddlewares.validateQuestion,
    SubscriptionMiddleware.toogleSubscription,
  ],
  QuestionController.subscribe
);

export default router;
