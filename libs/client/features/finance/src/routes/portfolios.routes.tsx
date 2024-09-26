import React from 'react';
import { Route } from 'react-router-dom';

const PortfoliosViews = React.lazy(
  () => import('../views/portfolios-views/portfolios-views')
);
export const getPortfoliosRoutes = () => [
  <Route key="/portfolios" path="/portfolios" element={<PortfoliosViews />} />,
];
