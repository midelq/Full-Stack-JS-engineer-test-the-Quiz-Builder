import type { Quiz, QuizListItem, CreateQuizPayload } from '../types/quiz';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchQuizzes(): Promise<QuizListItem[]> {
    const res = await fetch(`${API_URL}/quizzes`);
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
}

export async function fetchQuizById(id: number): Promise<Quiz> {
    const res = await fetch(`${API_URL}/quizzes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch quiz');
    return res.json();
}

export async function createQuiz(data: CreateQuizPayload): Promise<Quiz> {
    const res = await fetch(`${API_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message || 'Failed to create quiz');
    }

    return res.json();
}

export async function deleteQuiz(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete quiz');
}
