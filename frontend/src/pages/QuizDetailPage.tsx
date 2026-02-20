import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Quiz } from '../types/quiz';
import { fetchQuizById } from '../services/quizApi';
import styles from './QuizDetailPage.module.css';

export default function QuizDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        async function loadQuiz() {
            try {
                setLoading(true);
                const data = await fetchQuizById(Number(id));
                setQuiz(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load quiz');
            } finally {
                setLoading(false);
            }
        }

        loadQuiz();
    }, [id]);

    if (loading) return <div className={styles.message}>Loading...</div>;
    if (error) return <div className={styles.message}>{error}</div>;
    if (!quiz) return <div className={styles.message}>Quiz not found</div>;

    return (
        <div className={styles.page}>
            <Link to="/quizzes" className={styles.backLink}>← Back to quizzes</Link>

            <h1 className={styles.title}>{quiz.title}</h1>
            <p className={styles.meta}>
                {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
                {' · '}
                Created {new Date(quiz.createdAt).toLocaleDateString()}
            </p>

            <div className={styles.questionsList}>
                {quiz.questions.map((question, idx) => (
                    <div key={question.id} className={styles.question}>
                        <div className={styles.questionHeader}>
                            <span className={styles.questionNum}>{idx + 1}.</span>
                            <span className={styles.questionText}>{question.text}</span>
                            <span className={styles.badge}>{question.type}</span>
                        </div>

                        {/* Boolean question */}
                        {question.type === 'BOOLEAN' && question.options && (
                            <div className={styles.options}>
                                {question.options.map((opt) => (
                                    <div
                                        key={opt.id}
                                        className={`${styles.option} ${opt.isCorrect ? styles.correct : ''}`}
                                    >
                                        <span className={styles.radio}>
                                            {opt.isCorrect ? '●' : '○'}
                                        </span>
                                        {opt.text}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Text input question */}
                        {question.type === 'INPUT' && (
                            <div className={styles.answerBox}>
                                <span className={styles.answerLabel}>Correct answer:</span>
                                <span className={styles.answerValue}>{question.correctAnswer}</span>
                            </div>
                        )}

                        {/* Checkbox question */}
                        {question.type === 'CHECKBOX' && question.options && (
                            <div className={styles.options}>
                                {question.options.map((opt) => (
                                    <div
                                        key={opt.id}
                                        className={`${styles.option} ${opt.isCorrect ? styles.correct : ''}`}
                                    >
                                        <span className={styles.check}>
                                            {opt.isCorrect ? '☑' : '☐'}
                                        </span>
                                        {opt.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
