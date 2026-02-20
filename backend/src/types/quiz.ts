export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface CreateOptionDto {
    text: string;
    isCorrect: boolean;
}

export interface CreateQuestionDto {
    text: string;
    type: QuestionType;
    options?: CreateOptionDto[];
    correctAnswer?: string;
}

export interface CreateQuizDto {
    title: string;
    questions: CreateQuestionDto[];
}

export interface QuizListItem {
    id: number;
    title: string;
    questionCount: number;
    createdAt: string;
}
