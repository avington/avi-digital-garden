import 'express-async-errors';
import { Request, Response } from 'express';
import portfolioSchema from '../schemas/portfolio.schema';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '@avi/api/utilities';

/**
 * Retrieves all portfolios for the user specified in the environment variable.
 * If no user is specified, defaults to 'anonymous'.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing an array of portfolios.
 */
export const getPortfolios = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_USER_ID'] ?? 'anonymous';

  const portfolios = await portfolioSchema.find({ user });
  res.status(StatusCodes.OK).json(
    portfolios.map((portfolio) => ({
      ...portfolio.toObject(),
      id: portfolio._id,
    }))
  );
};

export const getPortfolio = async (req: Request, res: Response) => {
  const id = req.params?.['id'] ?? '';
  const portfolio = await portfolioSchema.findById(id);

  if (!portfolio)
    throw new NotFoundError(`Portfolio not found with the provided ID: ${id}`);

  res
    .status(StatusCodes.OK)
    .json({ ...portfolio.toObject(), id: portfolio._id });
};

/**
 * Creates a new portfolio with the provided name and description.
 * The user is retrieved from the environment variable or defaults to 'anonymous'.
 *
 * @param req - The request object containing the portfolio data in the body.
 * @param res - The response object.
 * @returns A JSON response containing the newly created portfolio data.
 */
export const createPortfolio = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // TODO: get user from env variable since we don't have auth yet
  const user = process.env['NX_PUBLIC_USER_ID'] ?? 'anonymous';

  const newPortfolio = await portfolioSchema.create({
    name,
    description,
    user,
    created: new Date(),
  });

  res
    .status(StatusCodes.CREATED)
    .json({ ...newPortfolio.toObject(), id: newPortfolio._id });
};

/**
 * Updates an existing portfolio.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response.
 */
export const updatePortfolio = async (req: Request, res: Response) => {
  const id = req.params?.['id'] ?? '';
  const { name, description } = req.body;

  const portfolio = await portfolioSchema.findByIdAndUpdate(
    id,
    { name, description, updated: new Date() },
    { new: true }
  );
  if (!portfolio) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'Portfolio not found' });
    return;
  }
  res
    .status(StatusCodes.OK)
    .json({ ...portfolio.toObject(), id: portfolio._id });
};

/**
 * Deletes a portfolio.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response.
 */
export const deletePortfolio = async (req: Request, res: Response) => {
  const id = req.params?.['id'] ?? '';
  const portfolio = await portfolioSchema.findByIdAndDelete(id);
  if (!portfolio) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'Portfolio not found' });
    return;
  }
  res.status(StatusCodes.OK).json({ msg: 'Portfolio deleted' });
};
