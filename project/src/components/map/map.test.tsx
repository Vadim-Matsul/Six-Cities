import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { makeFakeOffers } from '../../utils/mock';
import { HistoryRouter } from '../history-router/history-router';
import Map from './map';

const fakeOffers = makeFakeOffers();
const fakeId = fakeOffers[0]['id'];
const city = fakeOffers[0].city;
const selectedOffer = fakeOffers[0];
const thisClass = 'some_screen';

const history = createMemoryHistory();

const fakeBrowserHistory = {
  location:{ path:'' },
  push(somePath: string){
    this.location.path = somePath;
  }
};

jest.mock('../../browser-history', () => (fakeBrowserHistory));
window.scrollTo = jest.fn();


describe('Component: Map', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('The map is successfully rendered', () => {
    render(
      <HistoryRouter history={ history }>
        <Map
          offers={ fakeOffers }
          currentCity={ city.name }
          selectedOffer={ selectedOffer }
          thisClass={ thisClass }
        />
      </HistoryRouter>
    );
    expect( screen.getByTestId('Map') ).toBeInTheDocument();
    expect( screen.getAllByAltText(/Marker/i).length ).toBe( fakeOffers.length );
  });

  it('successfully redirect to property Screen after click on Marker', async () => {
    history.push('/map');
    render(
      <HistoryRouter history={ history }>
        <Map
          offers={ fakeOffers }
          currentCity={ city.name }
          selectedOffer={ selectedOffer }
          thisClass={ thisClass }
        />
      </HistoryRouter>
    );
    expect( fakeBrowserHistory.location.path ).toBe( '' );
    const Marker = screen.getAllByAltText(/Marker/i)[0];
    await userEvent.click( Marker );
    expect( fakeBrowserHistory.location.path ).toBe( `/offer/${fakeId}` );
  });

});
