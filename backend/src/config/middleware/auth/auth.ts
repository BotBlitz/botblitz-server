import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from './authConfig'
import { AuthorizationError } from '../exceptions/baseError';



export default function auth(request: Request, response: Response, next: NextFunction): Response | void {

    try {
        const auth = request.headers.authorization;
        if (!auth) {
            throw new AuthorizationError(undefined, undefined, "JWT is missing");
        }
        //Aqui pegamos apenas a variável token, e não utilizamos a primeira variável
        const [, token] = auth.split(' ');

        const tokenDecoded = verify(token, config.publicKey, config.signOptions);

        if (tokenDecoded) {
            return next();
        }
        else {
            throw new AuthorizationError(undefined, undefined, "JWT is invalid");
        }
    }
    catch (error: any) {
        throw new AuthorizationError(undefined, undefined, error.message);
    }
}