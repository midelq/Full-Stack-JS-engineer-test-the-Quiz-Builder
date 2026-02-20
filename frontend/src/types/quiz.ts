export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Option {
    id?: number;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id?: number;
    text: string;
    type: QuestionType;
    order?: number;
    options?: Option[];
    correctAnswer?: string;
}

export interface Quiz {
    id: number;
    title: string;
    createdAt: string;
    questions: Question[];
}

export interface QuizListItem {
    id: number;
    title: string;
    questionCount: number;
    createdAt: string;
}

// form data shape (what we send to the API)
export interface CreateQuizPayload {
    title: string;
    questions: {
        text: string;
        type: QuestionType;
        options?: { text: string; isCorrect: boolean }[];
        correctAnswer?: string;
    }[];
}
