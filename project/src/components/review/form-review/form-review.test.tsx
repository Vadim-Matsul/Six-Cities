import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as faker from 'faker';

import { HistoryRouter } from '../../history-router/history-router';
import { RaitingInputData } from '../../../const';

import FormReview from './form-review';


const FAKE_REVIEW_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const FAKE_ID = faker.datatype.number(100);

const makeFakeStore = configureMockStore( [thunk] );
const store = makeFakeStore({ USER:{ reviewError: false }});

const history = createMemoryHistory();
jest.setTimeout( 40000 );

describe('Component: FormReview', () => {

  it('the component has been successfully rendered', () => {
    render(
      <Provider store={ store } >
        <HistoryRouter history={ history }>
          <FormReview id={ FAKE_ID }/>
        </HistoryRouter>
      </Provider>
    );
    const button = screen.getByRole('button');
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
  });

  it('successfully completed the form', async () => {
    render(
      <Provider store={ store } >
        <HistoryRouter history={ history }>
          <FormReview id={ FAKE_ID }/>
        </HistoryRouter>
      </Provider>
    );

    const textarea = screen.getByTestId('FormReview-textarea');
    const button = screen.getByRole('button');
    const input = screen.getAllByRole('radio')[RaitingInputData.length - 2];

    expect(screen.queryByDisplayValue(/Lorem ipsum dolor/i)).not.toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.click(input);
    await userEvent.type(textarea, FAKE_REVIEW_TEXT);

    expect(screen.getByDisplayValue(/Lorem ipsum dolor/i)).toBeInTheDocument();
    expect(button).not.toBeDisabled();

  });

});
