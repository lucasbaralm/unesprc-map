import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icons } from './icons.data';
import { locations } from './locations.data';

// Search component with flyTo functionality
const SearchBar = ({ locations }: { locations: Array<{ name: string; position: [number, number] }>, map: any }) => {
  const map = useMap();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ name: string; position: [number, number] }>>([]);

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
      left: '55%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: '80%',
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

const FilterBar = ({ locations }: { locations: Array<{ name: string; position: [number, number] }>, map: any }) => {
  const map = useMap();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    if (e.target.value !== 'all'){
      setShowPopup(true);
    }
    const filtered = e.target.value === 'all'
      ? locations
      : locations.filter(location => location.category === e.target.value);
    setFilteredLocations(filtered);
  };

  const handleLocationClick = (position: [number, number]) => {
    map.flyTo(position, 18);
    setShowPopup(false);
  };

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        width: '300px'
      }}>
        <label htmlFor="category-select">Filtrar por categoria:</label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange} style={{ marginLeft: '10px' }}>
          <option value="all">Todas</option>
          <option value="mercado">Mercado</option>
          <option value="padaria">Padaria</option>
          <option value="hortifrutti/mercearia">Hortifrutti/Mercearia</option>
          <option value="bar">Bar</option>
          <option value="farmacia">Farmácia</option>
          <option value="academia">Academia</option>
          <option value="unidadeSaude">Unidade de Saúde</option>
          <option value="entrada">Entrada</option>
          <option value="shopping">Shopping</option>
        </select>
      </div>
      {showPopup && (
        <div style={{
          position: 'absolute',
          top: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          maxHeight: '300px',
          overflowY: 'auto',
          width: '300px'
        }}>
          <h4>Locais filtrados:</h4>
          <ul>
            {filteredLocations.map((location, index) => (
              <li key={index} onClick={() => handleLocationClick(location.position)} style={{ cursor: 'pointer' }}>
                {location.name}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowPopup(false)} style={{ marginTop: '10px' }}>Fechar</button>
        </div>
      )}
    </>
  );
};

const UnespMap: React.FC = () => {
  return (
    <MapContainer center={[-22.396403727665906, -47.54857750418907]} zoom={16} scrollWheelZoom={true}>
      <SearchBar locations={locations}/>
      <FilterBar locations={locations}/>
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