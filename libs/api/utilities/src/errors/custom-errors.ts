import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
