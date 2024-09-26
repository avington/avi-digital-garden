import { getPortfoliosRoutes } from './portfolios.routes';

export const getAllFinanceRoutes = () => [...getPortfoliosRoutes()];
