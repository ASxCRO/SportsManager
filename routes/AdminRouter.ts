import express from 'express';
const router = express.Router();

router.get('/admin', (req, res) => {
  res.send('User list');
});

export default router;
