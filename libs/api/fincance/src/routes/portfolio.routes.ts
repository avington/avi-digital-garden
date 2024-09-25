import { Router } from 'express';
import {
  createPortfolio,
  deletePortfolio,
  getPortfolio,
  getPortfolios,
  updatePortfolio,
} from '../controllers/portfolio.controller';

const portfolioRouter: Router = Router();

portfolioRouter.route('/').get(getPortfolios).post(createPortfolio);
portfolioRouter
  .route('/:id')
  .get(getPortfolio)
  .patch(updatePortfolio)
  .delete(deletePortfolio);

export { portfolioRouter };
