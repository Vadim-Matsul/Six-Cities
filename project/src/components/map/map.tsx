import useMap from '../../hooks/useMap';
import { useEffect, useRef } from 'react';
import { City, Offers } from '../../types/offers';
import L, { Icon, Marker} from 'leaflet';
import { IconMarkerSize, IconMarkerUrl } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers,
  city: City
}

const IconMarker = new Icon ({
  iconUrl: IconMarkerUrl.default,
  iconSize: [IconMarkerSize.Icon.x, IconMarkerSize.Icon.y],
  iconAnchor: [IconMarkerSize.Anchor.x, IconMarkerSize.Anchor.y]
});

function Map ({offers, city}: MapProps):JSX.Element{

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map){
      const markersArr:Marker[] = [];

      { offers.forEach( (offer) => {
        const marker = new Marker( [offer.location.latitude, offer.location.longitude] ).bindPopup(`${offer.title}`);
        marker.setIcon(IconMarker);
        markersArr.push(marker);
      });}

      const markersLayer = L.layerGroup(markersArr).addTo(map);
      L.control.layers({},{[`Предложения в городе ${city.name}`]:markersLayer}).addTo(map);
    }
  },[offers, map]);


  return (
    <section
      className='cities__map map'
      ref={ mapRef }
    >
    </section>
  );
}


export default Map;
