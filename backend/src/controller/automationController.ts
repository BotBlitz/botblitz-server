import { Router } from 'express'
import { errorHandler } from '../config/middleware/exceptions/errorHandler';
import auth from '../config/middleware/auth/auth'
import { AutomationService } from '../service/automationService';

export const automationRoutes = Router();

const automationService = new AutomationService();


automationRoutes.get('/automation/find/:code', auth, (req, res) => {
    automationService.findAll()
        .then(result => res.status(result.code).send(result))
        .catch(err => { errorHandler.handleError(err, res) });
})

automationRoutes.get('/automation/find', auth, (req, res) => {
    automationService.findAll()
        .then(result => res.status(result.code).send(result))
        .catch(err => { errorHandler.handleError(err, res) });
})
