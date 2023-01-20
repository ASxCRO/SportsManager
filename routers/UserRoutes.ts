import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();
import auth from '../middlewares/auth';

const userController = new UserController();

router.get('/all', auth, async (req, res, next) => {
  await userController.getAll(req, res);
});

router.get('/user', auth, async (req, res, next) => {
  await userController.getOne(req, res);
});

router.patch('/updateuser', auth, async (req, res, next) => {
  await userController.updateUser(req, res);
});

router.delete('/deleteuser', auth, async (req, res, next) => {
  await userController.deleteUser(req, res);
});

export default router;
