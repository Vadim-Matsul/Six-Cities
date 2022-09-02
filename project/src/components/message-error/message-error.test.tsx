import { render, screen } from '@testing-library/react';

import MessageError from './message-error';


describe('Component: MessageError', () => {

  it('component successfully render for AuthScreen', () => {
    render( <MessageError isAuthScreen message={'AuthScreen message'}/> );
    const message = screen.getByText(/AuthScreen message/i);
    expect( message ).toBeInTheDocument();
    expect( message ).toHaveClass('login__error__message');
  });

  it('component successfully render for PropertyScreen', () => {
    render( <MessageError message={'PropertyScreen message'}/> );
    const message = screen.getByText(/PropertyScreen message/i);
    expect( message ).toBeInTheDocument();
    expect( message ).toHaveClass('review__error__message');
  });

});
