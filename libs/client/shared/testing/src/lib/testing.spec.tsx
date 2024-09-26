import { render } from '@testing-library/react';

import Testing from './testing';

describe('Testing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Testing />);
    expect(baseElement).toBeTruthy();
  });
});
