import { Router } from 'express';
import AuthRoutes from './AuthRoutes';
import QuestionRoutes from './QuestionRoutes';
import SearchRoute from './SearchRoute';
import swaggerUi from 'swagger-ui-express';
import * as swagerDocument from '../api-docs/swagger.json';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagerDocument));

router.use('/auth', AuthRoutes);
router.use('/question', QuestionRoutes);
router.use('/search', SearchRoute);

export default router;
