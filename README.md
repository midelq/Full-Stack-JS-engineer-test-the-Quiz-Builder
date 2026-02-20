# Quiz Builder

A full-stack web application for creating and managing custom quizzes. Users can build quizzes with multiple question types (True/False, Text Input, Multiple Choice), view all quizzes in a dashboard, and inspect each quiz in detail.

## Project Structure

```
quiz-builder/
├── backend/              # Express.js REST API
│   ├── prisma/
│   │   ├── schema.prisma   # Database models
│   │   ├── seed.ts         # Sample quiz data
│   │   └── migrations/     # Database migrations
│   └── src/
│       ├── app.ts            # Express setup, middleware
│       ├── server.ts         # Entry point
│       ├── routes/           # API route definitions
│       ├── controllers/      # Request handlers
│       ├── services/         # Business logic (Prisma queries)
│       ├── validators/       # Input validation (Zod schemas)
│       └── types/            # TypeScript type definitions
│
├── frontend/             # React + Vite SPA
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Route-level page components
│       ├── services/         # API client functions
│       └── types/            # Shared TypeScript types
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env          # default config works out of the box
npx prisma migrate dev        # create SQLite database & run migrations
npx prisma db seed            # (optional) seed a sample quiz
npm run dev                   # starts API on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                   # starts dev server on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

**Backend** (`backend/.env`):

| Variable       | Default          | Description          |
| -------------- | ---------------- | -------------------- |
| `DATABASE_URL` | `file:./dev.db`  | SQLite database path |
| `PORT`         | `3001`           | API server port      |

**Frontend** (`frontend/.env`):

| Variable       | Default                  | Description       |
| -------------- | ------------------------ | ----------------- |
| `VITE_API_URL` | `http://localhost:3001`  | Backend API URL   |

> `.env` files are git-ignored. See `.env.example` for reference.

## API Endpoints

| Method   | Path             | Description                                    |
| -------- | ---------------- | ---------------------------------------------- |
| `POST`   | `/quizzes`       | Create a new quiz with questions               |
| `GET`    | `/quizzes`       | List all quizzes (title + question count)      |
| `GET`    | `/quizzes/:id`   | Get full quiz details including all questions  |
| `DELETE` | `/quizzes/:id`   | Delete a quiz and all related data             |

## Supported Question Types

| Type         | Description                                     |
| ------------ | ----------------------------------------------- |
| `BOOLEAN`    | True/False question with radio buttons          |
| `INPUT`      | Short text answer with a correct answer field   |
| `CHECKBOX`   | Multiple choice with several correct answers    |

## Sample Quiz

After seeding the database (`npx prisma db seed`), a "General Knowledge Quiz" is created with:

1. **Boolean** — "The Earth is flat." (correct: False)
2. **Input** — "What is the capital of France?" (correct: Paris)
3. **Checkbox** — "Which of the following are programming languages?" (correct: JavaScript, Python)

## Tech Stack

**Backend:**
- Node.js, Express.js, TypeScript
- Prisma ORM, SQLite
- Zod (request validation)

**Frontend:**
- React 19, Vite, TypeScript
- React Router (client-side routing)
- React Hook Form + Zod (form handling & validation)
- CSS Modules (component-scoped styling)

**Code Quality:**
- ESLint + Prettier (backend & frontend)
