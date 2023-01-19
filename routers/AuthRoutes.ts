import express from 'express';
const router = express.Router();
import AuthController from '../controllers/AuthController';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';
import auth from '../middlewares/auth';
import AdminService from '../services/AdminService';
import AuthService from '../services/AuthService';

const userRepository = AppDataSource.getRepository(User);
const adminService = new AuthService(userRepository);
const authController = new AuthController(adminService);

router.post('/register', async (req, res, next) => {
  await authController.register(req, res);
});

router.post('/login', async (req, res, next) => {
  await authController.login(req, res);
});

router.get('/verify', async (req, res, next) => {
  await authController.verify(req, res);
});

export default router;
