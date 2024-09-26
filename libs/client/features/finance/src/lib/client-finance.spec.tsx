import { render } from '@testing-library/react';

import ClientFinance from './client-finance';

describe('ClientFinance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientFinance />);
    expect(baseElement).toBeTruthy();
  });
});
