import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    Quiz Builder
                </Link>

                <nav className={styles.nav}>
                    <Link
                        to="/quizzes"
                        className={`${styles.link} ${location.pathname === '/quizzes' ? styles.active : ''}`}
                    >
                        All Quizzes
                    </Link>
                    <Link
                        to="/create"
                        className={`${styles.link} ${styles.createBtn} ${location.pathname === '/create' ? styles.active : ''}`}
                    >
                        + Create Quiz
                    </Link>
                </nav>
            </div>
        </header>
    );
}
