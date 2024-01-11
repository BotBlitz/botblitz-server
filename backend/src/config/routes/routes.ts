import express from 'express';
import { userRoutes } from '../../controller/userController';

export const routes = express.Router();

routes.use(userRoutes);
