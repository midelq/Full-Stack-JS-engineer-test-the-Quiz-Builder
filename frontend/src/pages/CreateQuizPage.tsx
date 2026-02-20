import QuizForm from '../components/QuizForm';
import styles from './CreateQuizPage.module.css';

export default function CreateQuizPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Create a New Quiz</h1>
            <QuizForm />
        </div>
    );
}
