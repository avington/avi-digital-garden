import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response
) => {
  console.error(err);
  const statusCode =
    (err as unknown as { statusCode: number })['statusCode'] ??
    StatusCodes.INTERNAL_SERVER_ERROR;
  console.log('statusCode in the error handler', statusCode);

  res.status(statusCode).json({ msg: err.message });
};
