import express from 'express';
import { userRoutes } from '../../controller/userController';
import { automationRoutes } from '../../controller/automationController';

export const routes = express.Router();

routes.use(userRoutes);
routes.use(automationRoutes)
