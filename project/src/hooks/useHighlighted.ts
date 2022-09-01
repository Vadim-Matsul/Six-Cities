import { useCallback, useState } from 'react';
import { Offer } from '../types/offers';

const useHighlighted = (offers: Offer[]): [Offer | undefined, (id: number | null) => void] => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const findSelectedOffer = useCallback((id: number | null) => {
    const currentOffer = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentOffer);
  },[offers]);

  return [selectedOffer, findSelectedOffer];
};


export default useHighlighted;
