import express, { Response } from 'express';
import { ClassAppointmentController } from '../controllers/ClassAppointmentController';
import { ClassController } from '../controllers/ClassController';
import ReviewController from '../controllers/ReviewController';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassAppointmentService } from '../services/implementation/ClassAppointmentService';
import { ClassService } from '../services/implementation/ClassService';
import { ReviewService } from '../services/implementation/ReviewService';

const sportsController = new SportsController();
const classController = new ClassController();
const classAppointmentController = new ClassAppointmentController();
const reviewController = new ReviewController();

router.get('/all', auth, async (req, res) => {
  await sportsController.getAll(res);
});

router.get('/getOne', auth, async (req, res) => {
  await sportsController.getAll(res);
});

export default router;
