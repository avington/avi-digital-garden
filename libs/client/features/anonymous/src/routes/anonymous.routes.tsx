import { Route } from 'react-router-dom';

export const getHomeRoutes = () => [
  <Route
    key="/"
    path="/"
    element={<div>This is the home\src\lib\home root route.</div>}
  />,
];
