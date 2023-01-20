import express from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';

const sportsController = new SportsController();

router.get('/all', auth, async (req, res, next) => {
  await sportsController.getAll(req, res);
});

router.get('/classes', auth, async (req, res, next) => {
  await sportsController.getClasses(req, res);
});

router.get('/classes/details/:id', auth, async (req, res, next) => {
  await sportsController.getDetailsOfClass(req, res);
});

router.post('/classes/enroll', auth, async (req, res, next) => {
  await sportsController.enrollToClass(req, res);
});

router.post('/classes/unroll', auth, async (req, res, next) => {
  await sportsController.unrollClass(req, res);
});

router.post('/classes/appointments/enroll', auth, async (req, res, next) => {
  await sportsController.enrollToClassAppointment(req, res);
});

router.post('/classes/appointments/unroll', auth, async (req, res, next) => {
  await sportsController.unrollClassAppointment(req, res);
});

router.post('/classes/review', auth, async (req, res, next) => {
  await sportsController.postReview(req, res);
});

export default router;
