import express from 'express';
const router = express.Router();
import AuthController from '../controllers/AuthController';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';

const authController = new AuthController();

router.post('/register', async (req: ISportsAPIRequest, res) => {
  await authController.register(req, res);
});

router.post('/login', async (req: ISportsAPIRequest, res) => {
  await authController.login(req, res);
});

router.get('/verify', async (req: ISportsAPIRequest, res) => {
  await authController.verify(req, res);
});

export default router;
