import { memo, useMemo } from 'react';
import useMap from '../../hooks/useMap';
import { useEffect, useRef } from 'react';
import { Offer, Offers } from '../../types/offers';
import { Icon, Marker} from 'leaflet';
import { AppRoute, GeoCity, IconMarkerSize, IconMarkerUrl } from '../../const';
import 'leaflet/dist/leaflet.css';
import browserHistory from '../../browser-history';


type MapProps = {
  offers: Offers,
  currentCity: string,
  selectedOffer?: Offer | undefined,
  thisClass: string
}


function Map (props: MapProps):JSX.Element{
  const { offers, currentCity, selectedOffer, thisClass } = props;
  const mapRef = useRef(null);
  const city = useMemo(() => GeoCity[currentCity],[currentCity]) ;
  const map = useMap(mapRef, city);


  useEffect(() => {
    const Markers: Marker[] = [];
    if (map){
      offers.forEach( (offer) => {
        const marker = new Marker( [offer.location.latitude, offer.location.longitude] ).bindPopup(`${offer.title}`);
        const icon = new Icon({
          iconUrl: selectedOffer && selectedOffer.id === offer.id
            ? IconMarkerUrl.current
            : IconMarkerUrl.default,
          iconSize: [IconMarkerSize.Icon.x, IconMarkerSize.Icon.y],
          iconAnchor: [IconMarkerSize.Anchor.x, IconMarkerSize.Anchor.y]
        });
        marker.on('click', () => browserHistory.push(`${AppRoute.Property}/${offer.id}`));
        marker.setIcon(icon).addTo(map);
        Markers.push(marker);
      });
    }
    return () => Markers.forEach((marker) => marker.remove());
  },[offers, map, selectedOffer]);

  useEffect(() => {
    if (map){
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  },[city, map]);

  return (
    <section
      className={ thisClass }
      ref={ mapRef }
      data-testid='Map'
    />
  );
}


export default memo(Map);
