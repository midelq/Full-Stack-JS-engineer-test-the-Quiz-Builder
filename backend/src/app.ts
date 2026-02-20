import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// quiz endpoints
app.use('/quizzes', quizRoutes);

// simple health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

export default app;
