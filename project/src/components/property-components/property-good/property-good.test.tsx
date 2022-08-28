import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../../utils/mock';
import PropertyGood from './property-good';


describe('Component: PropertyGood', () => {
  const goods = makeFakeOffer()['goods'];

  it('successfully render', () => {
    render( <PropertyGood goods={ goods }/> );
    expect(screen.getAllByTestId('PropertyGood').length).toBe(goods.length);
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

});
