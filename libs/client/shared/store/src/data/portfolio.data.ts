import { PortfolioEntity } from '@avi/global/models';
import axios from 'axios';

export const fetchPortfolios = async () => {
  const baseUrl = process.env.NX_PUBLIC_API_URL || '';
  return axios.get<PortfolioEntity[]>(baseUrl + '/portfolios');
};

export const addPortfolio = async (portfolio: PortfolioEntity) => {
  const baseUrl = process.env.NX_PUBLIC_API_URL || '';
  return axios.post<PortfolioEntity>(baseUrl + '/portfolios', portfolio);
};

export const patchPortfolio = async (portfolio: PortfolioEntity) => {
  const baseUrl = process.env.NX_PUBLIC_API_URL || '';
  return axios.patch<{ id: string }>(baseUrl + '/portfolios/' + portfolio.id, portfolio);
};

export const deletePortfolio = async (id: string) => {
  const baseUrl = process.env.NX_PUBLIC_API_URL || '';
  return axios.delete(baseUrl + '/portfolios/' + id);
};
