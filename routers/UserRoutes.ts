import express from 'express';
import UserController from '../controllers/UserController';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';
const router = express.Router();
import auth from '../middlewares/auth';
import UserService from '../services/UserService';

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

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
