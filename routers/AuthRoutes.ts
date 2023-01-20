import express from 'express';
const router = express.Router();
import AuthController from '../controllers/AuthController';

const authController = new AuthController();

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
