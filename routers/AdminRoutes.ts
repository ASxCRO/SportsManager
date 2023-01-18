import express from 'express';
import AdminController from '../controllers/AdminController';
const router = express.Router();
import AuthController from '../controllers/AuthController';
import auth from '../middlewares/auth';

const adminController = new AdminController();

router.post('/createclass', async (req, res, next) => {
  await adminController.createClass(req, res);
});

router.patch('/updateclass', async (req, res, next) => {
  await adminController.updateClass(req, res);
});

router.delete('/deleteclass', async (req, res, next) => {
  await adminController.deleteClass(req, res);
});

router.get('/getallusers', async (req, res, next) => {
  await adminController.getAllUsers(req, res);
});

router.post('/createuser', async (req, res, next) => {
  await adminController.createUser(req, res);
});

router.patch('/updateuser', async (req, res, next) => {
  await adminController.updateUser(req, res);
});

router.delete('/deleteuser', async (req, res, next) => {
  await adminController.deleteUser(req, res);
});

export default router;
