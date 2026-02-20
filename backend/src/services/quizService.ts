import { PrismaClient } from '@prisma/client';
import { CreateQuizInput } from '../validators/quizValidator';

const prisma = new PrismaClient();

export async function createQuiz(data: CreateQuizInput) {
    const quiz = await prisma.quiz.create({
        data: {
            title: data.title,
            questions: {
                create: data.questions.map((q, index) => ({
                    text: q.text,
                    type: q.type,
                    order: index,
                    correctAnswer: q.type === 'INPUT' ? q.correctAnswer : null,
                    options:
                        q.type !== 'INPUT'
                            ? {
                                create: q.options!.map((opt) => ({
                                    text: opt.text,
                                    isCorrect: opt.isCorrect,
                                })),
                            }
                            : undefined,
                })),
            },
        },
        include: {
            questions: {
                include: { options: true },
                orderBy: { order: 'asc' },
            },
        },
    });

    return quiz;
}

export async function getAllQuizzes() {
    const quizzes = await prisma.quiz.findMany({
        include: {
            _count: { select: { questions: true } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return quizzes.map((quiz) => ({
        id: quiz.id,
        title: quiz.title,
        questionCount: quiz._count.questions,
        createdAt: quiz.createdAt,
    }));
}

export async function getQuizById(id: number) {
    return prisma.quiz.findUnique({
        where: { id },
        include: {
            questions: {
                include: { options: true },
                orderBy: { order: 'asc' },
            },
        },
    });
}

export async function deleteQuiz(id: number) {
    // cascade delete handles questions + options automatically
    await prisma.quiz.delete({ where: { id } });
}
