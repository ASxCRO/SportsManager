import express from 'express';
const router = express.Router();

router.get('/sports', (req, res) => {
  res.send('User list');
});

export default router;
