import express, { Response } from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';

const sportsController = new SportsController();

router.get('/all', auth, async (req, res) => {
  await sportsController.getAll(res);
});

router.get('/classes', auth, async (req: ISportsAPIRequest, res) => {
  await sportsController.getClasses(req, res);
});

router.get(
  '/classes/details/:id',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await sportsController.getDetailsOfClass(req, res);
  }
);

router.post('/classes/enroll', auth, async (req: ISportsAPIRequest, res) => {
  await sportsController.enrollToClass(req, res);
});

router.post('/classes/unroll', auth, async (req: ISportsAPIRequest, res) => {
  await sportsController.unrollClass(req, res);
});

router.post(
  '/classes/appointments/enroll',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await sportsController.enrollToClassAppointment(req, res);
  }
);

router.post(
  '/classes/appointments/unroll',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await sportsController.unrollClassAppointment(req, res);
  }
);

router.post('/classes/review', auth, async (req: ISportsAPIRequest, res) => {
  await sportsController.postReview(req, res);
});

export default router;
