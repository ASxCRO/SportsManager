import express from 'express';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import admin from '../middlewares/admin';
import auth from '../middlewares/auth';
import ReviewController from '../controllers/ReviewController';

const router = express.Router();
const reviewController = new ReviewController();

router.get('/all', admin, async (req: ISportsAPIRequest, res) => {
  await reviewController.readReviews(res);
});

router.post('/new', auth, async (req: ISportsAPIRequest, res) => {
  await reviewController.postReview(req, res);
});

export default router;
