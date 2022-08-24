import { render, screen } from '@testing-library/react';
import { RaitingInputData } from '../../const';
import InputRaiting from './input-raiting';

describe('Component: InputRaiting', () => {

  it('successfully render', () => {
    render( <InputRaiting flag={ false } /> );
    expect(screen.getAllByRole('radio').length).toBe(RaitingInputData.length);
  });

});
