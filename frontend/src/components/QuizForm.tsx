import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../services/quizApi';
import QuestionField from './QuestionField';
import styles from './QuizForm.module.css';

// validation schema for the form
const optionSchema = z.object({
    text: z.string().min(1, 'Option text is required'),
    isCorrect: z.boolean(),
});

const questionSchema = z.object({
    text: z.string().min(1, 'Question text is required'),
    type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
    booleanAnswer: z.string().optional(),
    correctAnswer: z.string().optional(),
    options: z.array(optionSchema).optional(),
});

const formSchema = z.object({
    title: z.string().min(1, 'Quiz title is required'),
    questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuizForm() {
    const navigate = useNavigate();

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            questions: [
                { text: '', type: 'BOOLEAN', booleanAnswer: 'true', options: [] },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'questions',
    });

    const isSubmitting = methods.formState.isSubmitting;

    async function onSubmit(data: FormValues) {
        try {
            // transform form data into the API payload format
            const payload = {
                title: data.title,
                questions: data.questions.map((q) => {
                    if (q.type === 'BOOLEAN') {
                        return {
                            text: q.text,
                            type: 'BOOLEAN' as const,
                            options: [
                                { text: 'True', isCorrect: q.booleanAnswer === 'true' },
                                { text: 'False', isCorrect: q.booleanAnswer === 'false' },
                            ],
                        };
                    }

                    if (q.type === 'INPUT') {
                        return {
                            text: q.text,
                            type: 'INPUT' as const,
                            correctAnswer: q.correctAnswer || '',
                        };
                    }

                    // CHECKBOX
                    return {
                        text: q.text,
                        type: 'CHECKBOX' as const,
                        options: (q.options || []).map((opt) => ({
                            text: opt.text,
                            isCorrect: opt.isCorrect,
                        })),
                    };
                }),
            };

            await createQuiz(payload);
            navigate('/quizzes');
        } catch (err) {
            console.error('Submit failed:', err);
            alert('Failed to create quiz. Please try again.');
        }
    }

    function addQuestion() {
        append({ text: '', type: 'BOOLEAN', booleanAnswer: 'true', options: [] });
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.titleField}>
                    <label className={styles.label}>Quiz Title</label>
                    <input
                        {...methods.register('title')}
                        className={styles.titleInput}
                        placeholder="e.g. JavaScript Fundamentals"
                    />
                    {methods.formState.errors.title && (
                        <span className={styles.error}>
                            {methods.formState.errors.title.message}
                        </span>
                    )}
                </div>

                <div className={styles.questionsList}>
                    {fields.map((field, index) => (
                        <QuestionField
                            key={field.id}
                            index={index}
                            onRemove={() => remove(index)}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.addQuestionBtn}
                    onClick={addQuestion}
                >
                    + Add Question
                </button>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Quiz'}
                </button>
            </form>
        </FormProvider>
    );
}
