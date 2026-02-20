import { Router } from 'express';
import * as quizController from '../controllers/quizController';

const router = Router();

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);

export default router;
