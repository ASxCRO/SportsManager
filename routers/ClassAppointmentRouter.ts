import express from 'express';
import { ClassAppointmentController } from '../controllers/ClassAppointmentController';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import admin from '../middlewares/admin';
import auth from '../middlewares/admin';

const router = express.Router();
const classAppointmentController = new ClassAppointmentController();

router.post('/create', admin, async (req: ISportsAPIRequest, res) => {
  await classAppointmentController.createClassAppointment(req, res);
});

router.patch('/update', admin, async (req: ISportsAPIRequest, res) => {
  await classAppointmentController.updateClassAppointment(req, res);
});

router.delete('/delete', admin, async (req: ISportsAPIRequest, res) => {
  await classAppointmentController.deleteClassAppointment(req, res);
});

router.post('/enroll', auth, async (req: ISportsAPIRequest, res) => {
  await classAppointmentController.enrollToClassAppointment(req, res);
});

router.post('/unroll', auth, async (req: ISportsAPIRequest, res) => {
  await classAppointmentController.unrollClassAppointment(req, res);
});

export default router;
