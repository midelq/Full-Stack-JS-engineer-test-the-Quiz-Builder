import { z } from 'zod';

const optionSchema = z.object({
    text: z.string().min(1, 'Option text is required'),
    isCorrect: z.boolean(),
});

// each question type has its own validation rules
const questionSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('BOOLEAN'),
        text: z.string().min(1, 'Question text is required'),
        options: z
            .array(optionSchema)
            .length(2, 'Boolean questions must have exactly 2 options'),
    }),
    z.object({
        type: z.literal('INPUT'),
        text: z.string().min(1, 'Question text is required'),
        correctAnswer: z.string().min(1, 'Correct answer is required'),
    }),
    z.object({
        type: z.literal('CHECKBOX'),
        text: z.string().min(1, 'Question text is required'),
        options: z
            .array(optionSchema)
            .min(2, 'Need at least 2 options for checkbox questions'),
    }),
]);

export const createQuizSchema = z.object({
    title: z
        .string()
        .min(1, 'Quiz title is required')
        .max(200, 'Title is too long'),
    questions: z
        .array(questionSchema)
        .min(1, 'Quiz must have at least one question'),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
