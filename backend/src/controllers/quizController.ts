import { RequestHandler } from 'express';
import { createQuizSchema } from '../validators/quizValidator';
import * as quizService from '../services/quizService';

export const createQuiz: RequestHandler = async (req, res) => {
    try {
        const parsed = createQuizSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }

        const quiz = await quizService.createQuiz(parsed.data);
        res.status(201).json(quiz);
    } catch (err) {
        console.error('Failed to create quiz:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getAllQuizzes: RequestHandler = async (_req, res) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.json(quizzes);
    } catch (err) {
        console.error('Failed to fetch quizzes:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getQuizById: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid quiz ID' });
            return;
        }

        const quiz = await quizService.getQuizById(id);
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        res.json(quiz);
    } catch (err) {
        console.error('Failed to fetch quiz:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const deleteQuiz: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid quiz ID' });
            return;
        }

        await quizService.deleteQuiz(id);
        res.status(204).send();
    } catch (err: unknown) {
        const prismaError = err as { code?: string };
        if (prismaError.code === 'P2025') {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }
        console.error('Failed to delete quiz:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
