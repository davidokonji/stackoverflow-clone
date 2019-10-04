import { Router } from 'express';
import QuestionController  from '../controllers/QuestionsController';
import isAuthenticated from '../Utils/authorization';
import QuestionMiddlewares from '../Middlewares/QuestionMiddlewares';
import validateObjId from '../Middlewares/validateObjectId';

const router = Router();

router.post('/',[ isAuthenticated, QuestionMiddlewares.validateQuestion ], QuestionController.create);

router.get('/', QuestionController.index);

router.get('/:id',validateObjId, QuestionController.show);

export default router;
