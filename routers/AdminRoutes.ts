import express from 'express';
import AdminController from '../controllers/AdminController';
import auth from '../middlewares/auth';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';

const router = express.Router();
const adminController = new AdminController();

router.post('/createclass', auth, async (req: ISportsAPIRequest, res) => {
  await adminController.createClass(req, res);
});

router.patch('/updateclass', auth, async (req: ISportsAPIRequest, res) => {
  await adminController.updateClass(req, res);
});

router.delete('/deleteclass', auth, async (req: ISportsAPIRequest, res) => {
  await adminController.deleteClass(req, res);
});

router.post(
  '/createclassappointment',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await adminController.createClassAppointment(req, res);
  }
);

router.patch(
  '/updateclassappointment',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await adminController.updateClassAppointment(req, res);
  }
);

router.delete(
  '/deleteclassappointment',
  auth,
  async (req: ISportsAPIRequest, res) => {
    await adminController.deleteClassAppointment(req, res);
  }
);

router.get('/readreviews', auth, async (req: ISportsAPIRequest, res) => {
  await adminController.readReviews(res);
});

export default router;
