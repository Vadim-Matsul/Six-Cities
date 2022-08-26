import { useState } from 'react';
import { Offer } from '../types/offers';

const useHighlighted = (offers: Offer[]): [Offer | undefined, (id: number | null) => void] => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const findSelectedOffer = (id: number | null) => {
    const currentOffer = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentOffer);
  };

  return [selectedOffer, findSelectedOffer];
};


export default useHighlighted;
