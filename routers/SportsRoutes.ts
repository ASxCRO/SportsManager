import express from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import auth from '../middlewares/auth';

const sportsController = new SportsController();

router.get('/all', async (req, res, next) => {
  await sportsController.getAll(req, res);
});

export default router;
