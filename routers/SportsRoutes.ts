import express from 'express';
const router = express.Router();
import SportsController from '../controllers/SportsController';
import { AppDataSource } from '../data/data-source';
import { Class } from '../data/entity/Class';
import { ClassAppointment } from '../data/entity/ClassAppointment';
import { Sport } from '../data/entity/Sport';
import { User } from '../data/entity/User';
import auth from '../middlewares/auth';
import SportsService from '../services/SportsService';

const sportRepository = AppDataSource.getRepository(Sport);
const classRepository = AppDataSource.getRepository(Class);
const userRepository = AppDataSource.getRepository(User);
const classAppointmentRepository =
  AppDataSource.getRepository(ClassAppointment);
const sportsService = new SportsService(
  sportRepository,
  classRepository,
  userRepository,
  classAppointmentRepository
);
const sportsController = new SportsController(sportsService);

router.get('/all', async (req, res, next) => {
  await sportsController.getAll(req, res);
});

router.get('/classes', async (req, res, next) => {
  await sportsController.getClasses(req, res);
});

router.get('/classes/details/:id', async (req, res, next) => {
  await sportsController.getDetailsOfClass(req, res);
});

router.post('/classes/enroll', async (req, res, next) => {
  await sportsController.enrollToClass(req, res);
});

router.post('/classes/unroll', async (req, res, next) => {
  await sportsController.unrollClass(req, res);
});

router.post('/classes/appointments/enroll', async (req, res, next) => {
  await sportsController.enrollToClassAppointment(req, res);
});

router.post('/classes/appointments/unroll', async (req, res, next) => {
  await sportsController.unrollClassAppointment(req, res);
});

router.get('/classes/review', async (req, res, next) => {
  // await sportsController.getDetailsOfClass(req, res);
});

export default router;
