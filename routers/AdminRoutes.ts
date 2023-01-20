import express from 'express';
import AdminController from '../controllers/AdminController';
import auth from '../middlewares/auth';

const router = express.Router();
const adminController = new AdminController();

router.post('/createclass', auth, async (req, res, next) => {
  await adminController.createClass(req, res);
});

router.patch('/updateclass', auth, async (req, res, next) => {
  await adminController.updateClass(req, res);
});

router.delete('/deleteclass', auth, async (req, res, next) => {
  await adminController.deleteClass(req, res);
});

router.post('/createclassappointment', auth, async (req, res, next) => {
  await adminController.createClassAppointment(req, res);
});

router.patch('/updateclassappointment', auth, async (req, res, next) => {
  await adminController.updateClassAppointment(req, res);
});

router.delete('/deleteclassappointment', auth, async (req, res, next) => {
  await adminController.deleteClassAppointment(req, res);
});

router.get('/readreviews', auth, async (req, res, next) => {
  await adminController.readReviews(req, res);
});

export default router;
