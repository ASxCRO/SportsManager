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

router.get('/classes', auth, async (req: ISportsAPIRequest, res) => {
  await classController.getClassesFilter(req, res);
});

router.get(
  '/classes/details/:id',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await classController.getDetailsOfClass(req, res);
  }
);

router.post('/classes/enroll', auth, async (req: ISportsAPIRequest, res) => {
  await classController.enrollToClass(req, res);
});

router.post('/classes/unroll', auth, async (req: ISportsAPIRequest, res) => {
  await classController.unrollClass(req, res);
});

router.post(
  '/classes/appointments/enroll',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await classAppointmentController.enrollToClassAppointment(req, res);
  }
);

router.post(
  '/classes/appointments/unroll',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await classAppointmentController.unrollClassAppointment(req, res);
  }
);

router.post('/classes/review', auth, async (req: ISportsAPIRequest, res) => {
  await reviewController.postReview(req.body, res);
});

export default router;
