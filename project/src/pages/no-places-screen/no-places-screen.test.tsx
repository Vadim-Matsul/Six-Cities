import { render, screen } from '@testing-library/react';

import NoPlacesScreen from './no-places-screen';


describe('Component: NoPlacesScreen', () => {

  it('successfully render', () => {
    const fakeCity = 'fakeCity';
    render( <NoPlacesScreen city={ fakeCity }/> );

    expect( screen.getByText(/No places to stay available/i) ).toBeInTheDocument();
    expect( screen.getByText(`We could not find any property available at the moment in ${fakeCity}`)).toBeInTheDocument();
  });

});
