import { BaseIconOptions, Icon, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { IconMarkerSize, IconMarkerUrl } from '../../const';
import useMap from '../../hooks/useMap';
import { City, Offers } from '../../types/offers';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers,
  city: City
}

const iconParameter:BaseIconOptions = {
  iconUrl: IconMarkerUrl.default,
  iconSize: [IconMarkerSize.Icon.x, IconMarkerSize.Icon.y],
  iconAnchor: [IconMarkerSize.Anchor.x, IconMarkerSize.Anchor.y]
};

function Map ({offers, city}:MapProps):JSX.Element{

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map){
      {offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        const icon = new Icon(iconParameter);
        marker.setIcon(icon).addTo(map);
      });}
    }

  }, [offers, map]);

  return (
    <section
      className='cities__map map'
      ref={mapRef}
    >
    </section>
  );
}


export default Map;
