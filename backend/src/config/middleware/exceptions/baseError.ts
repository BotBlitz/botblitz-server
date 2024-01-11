import { HttpStatusCode } from '../../../helpers/httpStatusCode'

export class BaseError extends Error {
  public readonly code: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly name: string;
  public readonly message: string;
  public readonly description: string;

  constructor(name: string, httpCode: HttpStatusCode, message: string, description: string, isOperational: boolean) {
    super(description);
    //Object.setPrototypeOf(this, new.target.prototype);

    this.code = httpCode;
    this.name = name;
    this.message = message;
    this.description = description;
    this.isOperational = isOperational;

    //Error.captureStackTrace(this);
  }
}

//free to extend the BaseError
export class APIError extends BaseError {
  constructor(name: string, message = 'API error', description: string) {
    super(name, HttpStatusCode.INTERNAL_SERVER, message, description, false);
  }
}

export class OperationError extends BaseError {
  constructor(name: string, message = 'Operational error', description: string) {
    super(name, HttpStatusCode.BAD_REQUEST, message, description, true);
  }
}

export class DatabaseError extends BaseError {
  constructor(name: string, message = 'Database operational error', description: string) {
    super(name, HttpStatusCode.INTERNAL_SERVER, message, description, true);
  }
}

export class AuthorizationError extends BaseError {
  constructor(name: string="" , message = 'Authorization token is invalid', description: string) {
    super(name, HttpStatusCode.FORBIDDEN, message, description, true);
  }
}

export class LoginError extends BaseError {
  constructor(name: string, message = 'Occured error during login', description: string) {
    super(name, HttpStatusCode.FORBIDDEN, message, description, true);
  }
}