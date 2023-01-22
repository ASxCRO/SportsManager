import express from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';

const sportsController = new SportsController();

router.get('/all', auth, async (req, res) => {
  await sportsController.getAll(res);
});

router.get('/getOne', auth, async (req, res) => {
  await sportsController.getAll(res);
});

export default router;
