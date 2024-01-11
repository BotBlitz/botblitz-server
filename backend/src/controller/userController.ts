import { Router } from 'express'
import { UserService } from '../service/userService';
import { errorHandler } from '../config/middleware/exceptions/errorHandler';
import auth from '../config/middleware/auth/auth'


export const userRoutes = Router();

const userService = new UserService();

userRoutes.post('/user/signin', (req, res) => {
    userService.signin(req.body)
        .then(result => res.status(result.code).send(result))
        .catch(err => { errorHandler.handleError(err, res) });
})

userRoutes.post('/user/create', (req, res) => {
    userService.create(req.body)
        .then(result => res.status(result.code).send(result))
        .catch(err => { errorHandler.handleError(err, res) })
})

userRoutes.get('/user/role/findAll', auth ,(req, res) => {
    userService.roleFindAll()
        .then(result => res.status(result.code).send(result))
        .catch(err => { errorHandler.handleError(err, res) })
})
