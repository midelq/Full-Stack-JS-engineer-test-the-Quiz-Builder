import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // clean up so we can re-run safely
    await prisma.option.deleteMany();
    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();

    const quiz = await prisma.quiz.create({
        data: {
            title: 'General Knowledge Quiz',
            questions: {
                create: [
                    {
                        text: 'The Earth is flat.',
                        type: 'BOOLEAN',
                        order: 0,
                        options: {
                            create: [
                                { text: 'True', isCorrect: false },
                                { text: 'False', isCorrect: true },
                            ],
                        },
                    },
                    {
                        text: 'What is the capital of France?',
                        type: 'INPUT',
                        order: 1,
                        correctAnswer: 'Paris',
                    },
                    {
                        text: 'Which of the following are programming languages?',
                        type: 'CHECKBOX',
                        order: 2,
                        options: {
                            create: [
                                { text: 'JavaScript', isCorrect: true },
                                { text: 'HTML', isCorrect: false },
                                { text: 'Python', isCorrect: true },
                                { text: 'CSS', isCorrect: false },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log(`Seeded quiz: "${quiz.title}" (ID: ${quiz.id})`);
}

main()
    .catch((err) => {
        console.error('Seed failed:', err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
