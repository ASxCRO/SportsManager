import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth';
import UserService from '../services/UserService';

router.get('/all', auth, async (req, res, next) => {
  try {
    const users = await UserService.all();
    res.status(200).json({
      status: true,
      message: 'All users',
      data: users,
    });
  } catch (e: any) {
    console.log(e);
  }
});

export default router;
