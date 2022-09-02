import { MutableRefObject, useEffect, useRef, useState } from 'react';
import L, { Map, TileLayer } from 'leaflet';

import { City } from '../types/offers';


export default function useMap ( mapRef:MutableRefObject<HTMLElement | null>, city: City ):Map | null{

  const [map, setMap] = useState<Map | null>(null);
  const mapRendering = useRef<boolean>(false);
  const copyPaste = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  useEffect(() => {
    if ( mapRef.current !== null && !mapRendering.current){

      const localMap = L.map( mapRef.current ).setView([city.location.latitude, city.location.longitude],city.location.zoom);
      const mapEnable = () => localMap.scrollWheelZoom.enable();
      const mapDisable = () => localMap.scrollWheelZoom.disable();

      const Light = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
        attribution: copyPaste
      }).addTo(localMap);

      const Dark = new TileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
        attribution: copyPaste
      });
      localMap.scrollWheelZoom.disable();
      localMap.addEventListener('click', mapEnable );
      localMap.addEventListener('mouseout', mapDisable );

      L.control.layers( { 'Day':Light, 'Night':Dark } ).addTo(localMap);
      setMap(localMap);
      mapRendering.current = true;
    }

  },[mapRef, city]);

  return map;
}
