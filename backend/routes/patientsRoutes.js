import express from 'express';
const router = express.Router();
import { PatientsController } from '../controllers/PatientsController';

router.post('/create', PatientsController.create);


export default router;