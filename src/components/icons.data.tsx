import redMarker from '../assets/markers/marker-icon-2x-red.png';
import greenMarker from '../assets/markers/marker-icon-2x-green.png';
import blueMarker from '../assets/markers/marker-icon-2x-blue.png';
import yellowMarker from '../assets/markers/marker-icon-2x-yellow.png';
import violetMarker from '../assets/markers/marker-icon-2x-violet.png';
import orangeMarker from '../assets/markers/marker-icon-2x-orange.png';
import greyMarker from '../assets/markers/marker-icon-2x-grey.png';
import goldMarker from '../assets/markers/marker-icon-2x-gold.png';
import blackMarker from '../assets/markers/marker-icon-2x-black.png';
import { Icon } from 'leaflet';

export const icons = {
  mercado: new Icon({
    iconUrl: blueMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  padaria: new Icon({
    iconUrl: greenMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  'hortifrutti/mercearia': new Icon({
    iconUrl: goldMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  bar: new Icon({
    iconUrl: blackMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  farmacia: new Icon({
    iconUrl: violetMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  academia: new Icon({
    iconUrl: greyMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  unidadeSaude: new Icon({
    iconUrl: yellowMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  entrada: new Icon({
    iconUrl: redMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  shopping: new Icon({
    iconUrl: orangeMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  rodoviaria: new Icon({
    iconUrl: greyMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};