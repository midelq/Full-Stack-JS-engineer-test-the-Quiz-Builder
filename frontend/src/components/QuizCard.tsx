import { Link } from 'react-router-dom';
import type { QuizListItem } from '../types/quiz';
import styles from './QuizCard.module.css';

interface QuizCardProps {
    quiz: QuizListItem;
    onDelete: (id: number) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
    const formattedDate = new Date(quiz.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    function handleDelete(e: React.MouseEvent) {
        e.preventDefault(); // don't navigate to quiz detail
        e.stopPropagation();

        if (window.confirm(`Delete "${quiz.title}"?`)) {
            onDelete(quiz.id);
        }
    }

    return (
        <Link to={`/quizzes/${quiz.id}`} className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.title}>{quiz.title}</h3>
                <div className={styles.meta}>
                    <span className={styles.count}>
                        {quiz.questionCount} {quiz.questionCount === 1 ? 'question' : 'questions'}
                    </span>
                    <span className={styles.date}>{formattedDate}</span>
                </div>
            </div>

            <button
                className={styles.deleteBtn}
                onClick={handleDelete}
                title="Delete quiz"
            >
                ✕
            </button>
        </Link>
    );
}
