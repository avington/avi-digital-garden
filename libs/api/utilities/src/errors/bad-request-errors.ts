import { StatusCodes } from 'http-status-codes';

export class BadRequestError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
