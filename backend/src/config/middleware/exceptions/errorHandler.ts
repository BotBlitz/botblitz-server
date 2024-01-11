import { BaseError } from './baseError'
import { HttpStatusCode } from '../../../helpers/httpStatusCode';
import { ResponseError } from './responseError';


class ErrorHandler {
    public async handleError(err: Error, res: any): Promise<void> {

      if (err instanceof BaseError){
        res.status(err.code).send(new ResponseError(err))
        return;
      }

      let responseError = new ResponseError({name:err.name, message:err.message, description: err.stack, code:HttpStatusCode.INTERNAL_SERVER, isOperational: false  })
      res.status(HttpStatusCode.INTERNAL_SERVER).send(responseError)
    }
    
    public isTrustedError(error: Error) {
      if (error instanceof BaseError) {
        return error.isOperational;
      }
      return false;
    }
   }
   export const errorHandler = new ErrorHandler();