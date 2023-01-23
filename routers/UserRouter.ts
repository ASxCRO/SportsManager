import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();
import admin from '../middlewares/admin';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';

const userController = new UserController();

router.get('/all', admin, async (req, res) => {
  await userController.getAll(res);
});

router.get('/details', admin, async (req: ISportsAPIRequest, res) => {
  await userController.getOne(req, res);
});

router.patch('/edit', admin, async (req: ISportsAPIRequest, res) => {
  await userController.updateUser(req, res);
});

router.delete('/remove', admin, async (req: ISportsAPIRequest, res) => {
  await userController.deleteUser(req, res);
});

export default router;
