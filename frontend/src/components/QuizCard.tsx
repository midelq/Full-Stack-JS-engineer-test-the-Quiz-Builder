import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { QuizListItem } from '../types/quiz';
import ConfirmModal from './ConfirmModal';
import styles from './QuizCard.module.css';

interface QuizCardProps {
    quiz: QuizListItem;
    onDelete: (id: number) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const formattedDate = new Date(quiz.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    function handleDeleteClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(true);
    }

    function handleConfirm() {
        setShowConfirm(false);
        onDelete(quiz.id);
    }

    return (
        <>
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
                    onClick={handleDeleteClick}
                    title="Delete quiz"
                >
                    ✕
                </button>
            </Link>

            {showConfirm && (
                <ConfirmModal
                    title="Delete Quiz"
                    message={`Are you sure you want to delete "${quiz.title}"? This action cannot be undone.`}
                    onConfirm={handleConfirm}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
}
