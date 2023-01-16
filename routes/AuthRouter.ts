import express from 'express';
const router = express.Router();

router.get('/auth', (req, res) => {
  res.send('User list');
});

export default router;
