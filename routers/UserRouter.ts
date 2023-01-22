import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();
import auth from '../middlewares/auth';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';

const userController = new UserController();

router.get('/all', auth, async (req, res) => {
  await userController.getAll(res);
});

router.get('/user', auth, async (req: ISportsAPIRequest, res) => {
  await userController.getOne(req, res);
});

router.patch('/updateuser', auth, async (req: ISportsAPIRequest, res) => {
  await userController.updateUser(req, res);
});

router.delete('/deleteuser', auth, async (req: ISportsAPIRequest, res) => {
  await userController.deleteUser(req, res);
});

export default router;
