# Quiz Builder

A full-stack web app for creating and managing custom quizzes. Built with **Express.js** + **Prisma** on the backend and **Next.js** on the frontend.

## Project Structure

```
quiz-builder/
├── backend/         # Express.js API (TypeScript, Prisma, SQLite)
│   ├── src/
│   └── prisma/
├── frontend/        # Next.js app (TypeScript, CSS Modules)
│   ├── src/
│   └── public/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Backend

```bash
cd backend
npm install
cp .env.example .env        # configure DB path if needed
npx prisma migrate dev      # create the database
npx prisma db seed           # (optional) load sample quiz
npm run dev                  # starts on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # configure API URL if needed
npm run dev                   # starts on http://localhost:3000
```

### Creating a Sample Quiz

After starting the backend you can seed the database:

```bash
cd backend
npx prisma db seed
```

This creates a "General Knowledge Quiz" with boolean, text input, and checkbox questions.

## API Endpoints

| Method   | Path           | Description                         |
| -------- | -------------- | ----------------------------------- |
| `POST`   | `/quizzes`     | Create a new quiz                   |
| `GET`    | `/quizzes`     | List all quizzes (title + count)    |
| `GET`    | `/quizzes/:id` | Get full quiz details               |
| `DELETE` | `/quizzes/:id` | Delete a quiz                       |

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Prisma, SQLite, Zod
- **Frontend:** React, Next.js, TypeScript, CSS Modules
