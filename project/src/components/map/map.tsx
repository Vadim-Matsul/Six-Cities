import useMap from '../../hooks/useMap';
import { useEffect, useRef } from 'react';
import { City, Offers } from '../../types/offers';
import { Icon, Marker} from 'leaflet';
import { IconMarkerSize, IconMarkerUrl } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers,
  city: City
  selectedOffer: number | undefined
}


function Map (props: MapProps):JSX.Element{
  const {offers, city, selectedOffer} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map){
      { offers.forEach( (offer) => {
        const marker = new Marker( [offer.location.latitude, offer.location.longitude] ).bindPopup(`${offer.title}`);
        const icon = new Icon({
          iconUrl: selectedOffer !== undefined && selectedOffer === offer.id
            ? IconMarkerUrl.current
            : IconMarkerUrl.default,
          iconSize: [IconMarkerSize.Icon.x, IconMarkerSize.Icon.y],
          iconAnchor: [IconMarkerSize.Anchor.x, IconMarkerSize.Anchor.y]
        });
        marker.setIcon(icon).addTo(map);
      });}
    }
  },[offers, map, selectedOffer]);

  return (
    <section
      className='cities__map map'
      ref={ mapRef }
    >
    </section>
  );
}


export default Map;
