import express from 'express';
const router = express.Router();
import createHttpError from 'http-errors';
import AuthService from '../services/AuthService';
import auth from '../middlewares/auth';

router.post('/register', async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (e: any) {
    next(createHttpError(e.statusCode, e.message));
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const data = await AuthService.login(req.body);
    res.status(200).json({
      status: true,
      message: 'Account login successful',
      data,
    });
  } catch (e: any) {
    next(createHttpError(e.statusCode, e.message));
  }
});

router.get('/all', auth, async (req, res, next) => {
  try {
    const users = await AuthService.all();
    res.status(200).json({
      status: true,
      message: 'All users',
      data: users,
    });
  } catch (e: any) {
    next(createHttpError(e.statusCode, e.message));
  }
});

export default router;
