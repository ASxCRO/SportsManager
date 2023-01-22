import express from 'express';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import admin from '../middlewares/admin';
import auth from '../middlewares/auth';
import ReviewController from '../controllers/ReviewController';

const router = express.Router();
const reviewController = new ReviewController();

router.post('/postReview', auth, async (req: ISportsAPIRequest, res) => {
  await reviewController.postReview(req, res);
});

router.get('/readReviews', admin, async (req: ISportsAPIRequest, res) => {
  await reviewController.readReviews(res);
});

export default router;
