import express from 'express';
const router = express.Router();
import { PatientsController } from '../controllers/PatientsController';

router.post('/create', PatientsController.create);
router.get('/all', PatientsController.getAllPatients);


export default router;