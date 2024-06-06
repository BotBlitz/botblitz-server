import bcrypt from 'bcryptjs';
import config from '../config/middleware/auth/authConfig'

import { sign } from 'jsonwebtoken';
import { environment } from '../resources/environments';
import { IUser } from '../commons/interface/IUser';
import { IUserLauncher } from '../commons/interface/IUserLauncher';
import { LoginError, OperationError } from '../config/middleware/exceptions/baseError';
import { messages } from '../resources/messages';
import { HttpStatusCode } from '../helpers/httpStatusCode';
import { IResponse } from '../commons/interface/IResponse';
import { Utils } from '../helpers/utils';
import { UserStatus } from '../helpers/statusEnum';
import { Response } from '../commons/dto/responseDto';
import { Auth } from '../commons/dto/authDto';
import { userRespository } from '../commons/repository/userRepository';

export class UserService {
    async signin(user: IUser): Promise<IResponse> {
        if (!user.username) {
            throw new LoginError(UserService.name, undefined, messages.get('userService.signin.username.required'))
        }

        if (!user.password) {
            throw new LoginError(UserService.name, undefined, messages.get('userService.signin.password.required'))
        }

        let entity = await userRespository.findByUsername(user.username) as Auth[]
        let auth = entity[0]

        if (!auth || !auth.idUser) {
            throw new LoginError(UserService.name, undefined, messages.get('userService.signin.username.not.found'))
        }

        // if (!await bcrypt.compare(user.password, entity.password)) {
        //     throw new LoginError(UserService.name, undefined, messages.get('userService.signin.incorrect.password'))
        // }
        let payload = {
            id: auth.idUser,
            name: auth.name,
            username: user.username
        }

        auth.roles = await userRespository.findRoleByUser(auth.idUser)
        auth.token = sign(payload, config.privateKey, { expiresIn: "1h", algorithm: "RS256", issuer: "bot blitz" })

        let response = new Response()
        response.message = messages.get('userService.success')
        response.code = HttpStatusCode.OK
        response.data = auth
        return response;
    }

    async createLauncherToken(user: IUserLauncher): Promise<Response> {
        try {
            const password = user.password

            const salt = process.env.SALT || environment.get('main.app.secret.key')
            user.password = bcrypt.hashSync(user.password, salt)
            user.status = UserStatus.WAITING_VALIDATION
            let ltBase64 = Buffer.from(JSON.stringify({ 'username': user.username, 'password': password })).toString('base64')
            user.launcherToken = Utils.encryptText(ltBase64)

            let response = new Response()
            response.code = HttpStatusCode.OK
            response.message = messages.get('userService.success')
            return response;
        }
        catch (err: any) {
            throw new OperationError(UserService.name, messages.get('userService.create.user.error'), err.stack)
        }
    }

    async findAllUsers(): Promise<Response> {
        let response = new Response()
        let users = await userRespository.findAllUsers();
        response.data = users;
        response.code = HttpStatusCode.OK;
        response.message = messages.get('userService.success')
        return response;    
    }

    async findUserbyName(name: string): Promise<Response> {
        let response = new Response()
        let users = await userRespository.findUserByName(name);
        for (let user of users) {
            if (user.idUser) {
                user.roles = await userRespository.findRoleByUser(user.idUser);
            }
        }

        response.data = users;
        response.code = HttpStatusCode.OK;
        response.message = messages.get('userService.success')
        return response;
    }

    async findRoleByUser(user: IUser): Promise<Response> {
        if (!user.idUser) {
            throw new OperationError('', '', '')
        }

        let response = new Response()
        response.data = await userRespository.findRoleByUser(user.idUser);
        response.code = HttpStatusCode.OK;
        response.message = messages.get('userService.success')
        return response;
    }
}