import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import institutionRoutes from './routes/institution.js';
import verifyRoutes from './routes/verify.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';
import logger from './logger.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });
app.use(limiter);

// ensure uploads dir
const uploads = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploads)) fs.mkdirSync(uploads);

app.use('/institution', institutionRoutes);
app.use('/verify', verifyRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// serve uploads statically for now (secure in production)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => res.json({ ok: true, service: 'credchain-backend' }));

// Swagger placeholder
const swaggerText = fs.readFileSync(path.join(process.cwd(), 'src', 'swagger.json'), 'utf-8');
const swaggerSpec = JSON.parse(swaggerText);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`Server listening on ${port}`));
