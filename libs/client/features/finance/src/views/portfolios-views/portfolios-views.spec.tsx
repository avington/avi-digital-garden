import { render } from '@testing-library/react';

import PortfoliosViews from './portfolios-views';

describe('PortfoliosViews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosViews />);
    expect(baseElement).toBeTruthy();
  });
});
