import React, { useState, useEffect } from 'react';
import styles from "./Map.module.css";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import useUrlPosition from '../hooks/useUrlPosition';
export default function Map() {
  const navigate = useNavigate();
 
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {cities} = useCities();
  const[maplat,maplng] = useUrlPosition();
  const {isLoading:isLoadingPosition,
         position:geolocationPosition,
         getPosition,
  } = useGeolocation();
  useEffect(() => {
    if (maplat && maplng) {
      setMapPosition([parseFloat(maplat), parseFloat(maplng)]);
    }
  }, [maplat, maplng]);

  useEffect(()=>{
      if(geolocationPosition)
        setMapPosition([geolocationPosition.lat,geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>{
      isLoadingPosition ? "Loading..." : "Use Your Position"}</Button>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      {cities.map((city) => (
  city.position ? (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
  ) : null
))}


        <ChangeCenter position={[maplat,maplng]}/>
        <DetectClick/>
      </MapContainer>

      <h1>
        
      </h1>
      <button onClick={() => {
        setSearchParams({ lat: 23, lng: 50 });
      }}>
        Change Pos
      </button>
    </div>
  );
}


function ChangeCenter({position}){
  const map = useMap();
  map.setMinZoom(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();

  useMapEvents({
    click: (e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}