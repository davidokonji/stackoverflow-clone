import { Router } from 'express';
import QuestionController  from '../controllers/QuestionsController';
import isAuthenticated from '../Utils/authorization';
import QuestionMiddlewares from '../Middlewares/QuestionMiddlewares';

const router = Router();

router.post('/',[isAuthenticated, QuestionMiddlewares.validateQuestion], QuestionController.create);

router.get('/', QuestionController.index);

router.get('/:id', QuestionController.show);

export default router;
