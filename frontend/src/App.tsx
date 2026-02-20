import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import QuizListPage from './pages/QuizListPage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizDetailPage from './pages/QuizDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/quizzes" replace />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
