import { Router } from 'express';
import {
  createPortfolio,
  deletePortfolio,
  getPortfolios,
  updatePortfolio,
} from '../controllers/portfolio.controller';

const portfolioRouter: Router = Router();

portfolioRouter.route('/').get(getPortfolios).post(createPortfolio);
portfolioRouter
  .route('/:id')
  .get(getPortfolios)
  .patch(updatePortfolio)
  .delete(deletePortfolio);

export { portfolioRouter };
