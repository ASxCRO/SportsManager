import express from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';

const sportsController = new SportsController();

router.get('/all', async (req, res, next) => {
  await sportsController.getAll(req, res);
});

router.get('/classes', async (req, res, next) => {
  await sportsController.getClasses(req, res);
});

router.get('/classes/details/:id', async (req, res, next) => {
  await sportsController.getDetailsOfClass(req, res);
});

router.post('/classes/enroll', async (req, res, next) => {
  await sportsController.enrollToClass(req, res);
});

router.get('/classes/unroll', async (req, res, next) => {
  // await sportsController.getDetailsOfClass(req, res);
});

router.post('/classes/appointments/enroll', async (req, res, next) => {
  await sportsController.enrollToClassAppointment(req, res);
});

router.get('/classes/appointments/unroll', async (req, res, next) => {
  // await sportsController.getDetailsOfClass(req, res);
});

router.get('/classes/review', async (req, res, next) => {
  // await sportsController.getDetailsOfClass(req, res);
});

export default router;
