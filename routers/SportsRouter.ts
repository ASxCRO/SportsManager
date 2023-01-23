import express from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';

const sportsController = new SportsController();

router.get('/all', auth, async (req, res) => {
  await sportsController.getAll(res);
});

router.get('/details', auth, async (req, res) => {
  await sportsController.getOne(req, res);
});

export default router;
