import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import AuthScreenRegistrationForm from './auth-screen-registration-form';

const makeFakeStore = configureMockStore();
const store = makeFakeStore({ USER:{ loginError: false }});


describe('Component: AuthScreenRegistrationForm', () => {

  it('successfully render', () => {
    render(
      <Provider store={ store }>
        <AuthScreenRegistrationForm />
      </Provider>
    );
    const button = screen.getByRole('button');
    expect( screen.getAllByRole('form').length ).toBe( 2 );
    expect( button ).toBeInTheDocument();
    expect( button ).toBeDisabled();
    expect( screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('the fields completed successfully', async () => {
    render(
      <Provider store={ store }>
        <AuthScreenRegistrationForm />
      </Provider>
    );
    const button = screen.getByRole('button');
    const email = screen.getAllByRole('form')[0];
    const password = screen.getAllByRole('form')[1];
    expect( button ).toBeDisabled();

    await UserEvent.type(email, 'SoGood@test.com');
    await UserEvent.type(password, 'qwertyTest');

    expect( button ).toBeDisabled();
    await UserEvent.type(password, 'qwerty008');
    expect( button ).not.toBeDisabled();
  });

});
