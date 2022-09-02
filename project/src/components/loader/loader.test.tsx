import { render, screen } from '@testing-library/react';

import { Loader } from './loader';

describe('Component: Loader', () => {

  it('the component has been successfully rendered', () => {
    render(<Loader/>);
    expect( screen.getByTestId('loader') ).toBeInTheDocument();
  });

});
