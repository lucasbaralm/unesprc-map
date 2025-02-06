import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import redMarker from '../assets/markers/marker-icon-2x-red.png';
import greenMarker from '../assets/markers/marker-icon-2x-green.png';
import blueMarker from '../assets/markers/marker-icon-2x-blue.png';
import yellowMarker from '../assets/markers/marker-icon-2x-yellow.png';
import violetMarker from '../assets/markers/marker-icon-2x-violet.png';
import orangeMarker from '../assets/markers/marker-icon-2x-orange.png';
import greyMarker from '../assets/markers/marker-icon-2x-grey.png';
import goldMarker from '../assets/markers/marker-icon-2x-gold.png';
import blackMarker from '../assets/markers/marker-icon-2x-black.png';

// Search component with flyTo functionality
const SearchBar = ({ locations }: { locations: Array<{ name: string; position: [number, number] }> }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ name: string; position: [number, number] }>>([]);
  const map = useMap();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Filter locations based on input
    const filtered = locations.filter(loc =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSuggestionClick = (location: { name: string; position: [number, number] }) => {
    setSearch(location.name);
    setSuggestions([]);
    map.flyTo(location.position, 18);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: '300px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      borderRadius: '8px'
    }}>
      <input
        type="text"
        placeholder="🔍 Buscar local..."
        value={search}
        onChange={handleSearch}
        style={{
          padding: '12px 16px',
          width: '100%',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'all 0.2s ease',
          '::placeholder': {
            color: '#999'
          },
          ':focus': {
            borderColor: '#2196f3',
            boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
          }
        }}
      />
      {suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '0 0 8px 8px',
          marginTop: '4px',
          maxHeight: '300px',
          overflowY: 'auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                transition: 'background-color 0.2s ease',
                fontSize: '14px',
                color: '#333',
                ':hover': {
                  backgroundColor: '#f5f9ff'
                }
              }}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type Location = {
  name: string;
  position: [number, number];
  category: 'mercado' | 'padaria' | 'hortifrutti/mercearia' | 'bar' | 'farmacia' | 'academia' | 'unidadeSaude' | 'entrada' | 'shopping';
  address: string;
};

// Create custom icons for each category
const icons = {
  mercado: new Icon({
    iconUrl: redMarker,
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
    iconUrl: blueMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  bar: new Icon({
    iconUrl: orangeMarker,
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
    iconUrl: goldMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  shopping: new Icon({
    iconUrl: blackMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
};

const UnespMap: React.FC = () => {
  const locations: Location[] = [
    {
      name: 'UNESP Portão 1',
      position: [-22.39724691274438, -47.5478157508783],
      category: 'entrada',
      address: 'Av. 24 A, 1515 - Bela Vista'
    },
    {
      name: 'UNESP Portão 2',
      position: [-22.392227577961524, -47.54723163574696],
      category: 'entrada',
      address: 'Av. Ullysses Guimarães - Vila Alemã'

    },
    {
      name: 'Mercado Pantoja',
      position: [-22.403778228731596, -47.5517427],
      category: 'mercado',
      address: 'R. 8 B, 727 - Vila Indaia'

    },
    {
      name: 'Mercado Examine',
      position: [-22.39790308827847, -47.556369419359974],
      category: 'mercado',
      address: 'Av. 24 A, 303 - Vila Alemã'
    },
    {
      name: 'Mercado Brasil Frios',
      position: [-22.39136824732227, -47.55940225470933],
      category: 'mercado',
      address: 'Av. Brasil, 311 - Vila Martins'
    },
    {
      name: 'Mercado Bom Jesus',
      position: [-22.39279605590337, -47.55365160217759],
      category: 'mercado',
      address: 'R. 8 A, 675 - Vila Alemã'
    },
    {
      name: 'Mercado Atacadista Assaí',
      position: [-22.41514682494296, -47.574495517627135],
      category: 'mercado',
      address: 'Av. Pres. Tancredo de Almeida Neves, 450 - Jardim Claret'
    },
    {
      name: 'Mercado Paulistão',
      position: [-22.384850808712592, -47.556721532741456],
      category: 'mercado',
      address: 'Av. 52 A, 35 - Jardim America'
    },
    {
      name: 'Mercado Covabra',
      position: [-22.384289930548377, -47.57305301025501],
      category: 'mercado',
      address: 'R. Seis, 300 - Jardim Sao Caetano'
    },
    {
      name: 'Padaria Duda',
      position: [-22.400685402605266, -47.54964216180504],
      category: 'padaria',
      address: 'R. 11 B, 1117 - Vila Indaia'
    },
    {
      name: 'Padaria Vila Alemã',
      position: [-22.389324686954094, -47.55469819847448],
      category: 'padaria',
      address: 'Av. 44 A, 387 - Vila Alemã'
    },
    {
      name: 'Mercearia Duda',
      position: [-22.399410360271023, -47.54852017529872],
      category: 'hortifrutti/mercearia',
      address: 'Av. 20 A, 842 - Vila Indaia'
    },
    {
      name: 'Hortifrutti Mercearia Hortibela',
      position: [-22.3984964184374, -47.549871632969506],
      category: 'hortifrutti/mercearia',
      address: 'Av. 22 A, 1001 - Vila Indaia'
    },
    {
      name: 'Hortifrutti Bananas',
      position: [-22.391491979621122, -47.55846084646343],
      category: 'hortifrutti/mercearia',
      address: 'R. 3 A, 775 - Vila Alemã'
    },
    {
      name: 'Bar Sujinhos',
      position: [-22.397713499082762, -47.548865104134144],
      category: 'bar',
      address: 'Av. 24 A, 1096 - Vila Indaia'
    },
    {
      name: 'Bar Segredos de Mafê',
      position: [-22.393705686556327, -47.54901834074258],
      category: 'bar',
      address: 'Av. 38 A, 1008 - Vila Alemã'
    },
    {
      name: 'Bar Santa Loira',
      position: [-22.403160632725335, -47.552606647194985],
      category: 'bar',
      address: 'Av. 10 A, 385 - Vila Indaia'
    },
    {
      name: 'Farmácia Droganossa',
      position: [-22.398065957384606, -47.55866254646311],
      category: 'farmacia',
      address: 'Av. 24 A, 87 - Vila Alemã'
    },
    {
      name: 'Farmácia Nissei',
      position: [-22.404961279611495, -47.556388032969494],
      category: 'farmacia',
      address: 'Av. 8 A, 211 - Cidade Nova'
    },
    {
      name: 'Farmácia Farma Azul Entrega 24H',
      position: [-22.405807068249274, -47.570101907903926],
      category: 'farmacia',
      address: 'R. 11, 1823 - Santa Cruz'
    },
    {
      name: 'Farmácia Raia',
      position: [-22.39462548307005, -47.559531527751155],
      category: 'farmacia',
      address: 'R. 3 A, 388 - Vila Alemã' 
    },
    {
      name: 'Farmácia Pague Menos',
      position: [-22.410115861713127, -47.56135738195487],
      category: 'farmacia',
      address: 'Av. 1, 322 - Centro'
    },
    {
      name: 'Farmácia Super Popular',
      position: [-22.409003883900912, -47.55990822681183],
      category: 'farmacia',
      address: 'Av. 2, 165 - Centro'
    },
    {
      name: 'Farmácia Drogão Super',
      position: [-22.41067161357967, -47.5594411654531],
      category: 'farmacia',
      address: 'Av. Três, 946 - Centro'
    },
    {
      name: 'Academia Skyfit',
      position: [-22.38737230009382, -47.55284457543657],
      category: 'academia',
      address: 'R. 6 A, 1336 - Vila Alemã'
    },
    {
      name: 'Academia Selfit Shopping',
      position: [-22.413511061267364, -47.55313703301076],
      category: 'academia',
      address:'Av. Conde Francisco Matarazzo Júnior, 205 - Vila Paulista/Centro'
    },
    {
      name: 'Unidade de Saúde PSF Bela Vista',
      position: [-22.40630831822942, -47.551017368911474],
      category: 'unidadeSaude',
      address: 'Av. 1 A, 1-815 - Cidade Nova'
    },
    {
      name: 'Unidade de Saúde UPA Cherveson',
      position: [-22.386245056702336, -47.56486840429034],
      category: 'unidadeSaude',
      address: 'R. M 9, 50 - Jardim Floridiana'
    },
    {
      name: 'Unidade de Saúde 29',
      position: [-22.424872345241482, -47.563981170698455],
      category: 'unidadeSaude',
      address: 'Av. 29, 1313 - Estádio'
    },
    {
      name: 'Shopping Rio Claro',
      position: [-22.413604859677502, -47.55397309309728],
      category: 'shopping',
      address: 'Av. Conde Francisco Matarazzo Júnior, 205 - Vila Paulista/Centro'
    }

  ];

  return (
    <MapContainer center={[-22.396403727665906, -47.54857750418907]} zoom={20} scrollWheelZoom={true}>
      <SearchBar locations={locations} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location.position}
          icon={icons[location.category]}
        >
          <Popup>
            <strong>{location.name}</strong>
            <br></br>
            {location.address}
            <br></br>
            <a href={`https://www.google.com/maps/search/?api=1&query=${location.position[0]},${location.position[1]}`} target="_blank" rel="noopener noreferrer">
              Ver no Google Maps
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UnespMap;