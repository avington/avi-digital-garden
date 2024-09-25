import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const withValidationErrors = (validationValues: ValidationChain[]) => {
  return [
    ...validationValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: errorMessages });
      }
      next();
      return;
    },
  ];
};
