import { useEffect, useState } from 'react';
import type { QuizListItem } from '../types/quiz';
import { fetchQuizzes, deleteQuiz } from '../services/quizApi';
import QuizCard from '../components/QuizCard';
import styles from './QuizListPage.module.css';

export default function QuizListPage() {
    const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadQuizzes();
    }, []);

    async function loadQuizzes() {
        try {
            setLoading(true);
            const data = await fetchQuizzes();
            setQuizzes(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load quizzes');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        try {
            await deleteQuiz(id);
            setQuizzes((prev) => prev.filter((q) => q.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete quiz');
        }
    }

    if (loading) {
        return <div className={styles.message}>Loading quizzes...</div>;
    }

    if (error) {
        return <div className={styles.message}>{error}</div>;
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>All Quizzes</h1>

            {quizzes.length === 0 ? (
                <div className={styles.empty}>
                    <p>No quizzes yet. Create your first one!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {quizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
