import express from 'express';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import admin from '../middlewares/admin';
import auth from '../middlewares/admin';

import { ClassController } from '../controllers/ClassController';

const router = express.Router();
const classController = new ClassController();

router.post('/create', admin, async (req: ISportsAPIRequest, res) => {
  await classController.createClass(req, res);
});

router.patch('/update', admin, async (req: ISportsAPIRequest, res) => {
  await classController.updateClass(req, res);
});

router.delete('/delete', admin, async (req: ISportsAPIRequest, res) => {
  await classController.deleteClass(req, res);
});

router.get('/all', auth, async (req: ISportsAPIRequest, res) => {
  await classController.getClassesFilter(req, res);
});

router.get('/details/:id', auth, async (req: ISportsAPIRequest, res) => {
  await classController.getDetailsOfClass(req, res);
});

router.post('/enroll', auth, async (req: ISportsAPIRequest, res) => {
  await classController.enrollToClass(req, res);
});

router.post('/unroll', auth, async (req: ISportsAPIRequest, res) => {
  await classController.unrollClass(req, res);
});

export default router;
