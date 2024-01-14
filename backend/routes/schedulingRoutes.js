import express from 'express';
const router = express.Router();
// controllers
import { ScheduleController } from '../controllers/ScheduleController';

router.post('/create/:id', ScheduleController.create);
router.get('/getAll', ScheduleController.getAll);
router.delete('/cancel/:id', ScheduleController.cancel);


export default router;
