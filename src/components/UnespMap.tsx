import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const UnespMap: React.FC = () => {

  
  return (
    <MapContainer center={[-22.396403727665906, -47.54857750418907]} zoom={20} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-22.39724691274438, -47.5478157508783]}>
        <Popup>
          UNESP Portão 1
        </Popup>
      </Marker>
      <Marker position={[-22.392227577961524, -47.54723163574696]}>
        <Popup>
          UNESP Portão 2
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default UnespMap;