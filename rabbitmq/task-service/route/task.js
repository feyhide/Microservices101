import express from 'express';
import { createTask, getAllTasks } from '../controller/task.js';

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);

export default router;
