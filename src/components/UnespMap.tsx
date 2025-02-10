import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icons } from './icons.data';
import { Location, locations } from './locations.data';
import 'bootstrap/dist/css/bootstrap.min.css';

// Search component with flyTo functionality
const SearchBar = ({ locations }: { locations: Array<Location> }) => {
  const map = useMap();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Array<Location>>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Filter locations based on input
    const filtered = locations.filter(loc =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSuggestionClick = (location: Location) => {
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
        className='form-control'
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
              className="p-2 cursor-pointer border-bottom text-primary"
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterBar = ({ locations, showPopup, setShowPopup }: { locations: Array<Location>, showPopup: boolean, setShowPopup: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const map = useMap();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    if (e.target.value !== 'all') {
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
        top: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        width: '300px'
      }}>
        <div className="d-flex justify-content-between">
          <label htmlFor="category-select">Filtrar por categoria:  </label>
          <select id="category-select" value={selectedCategory} onChange={handleCategoryChange} style={{ 'width': '80%', 'height': '10%' }} className="form-select-sm rounded mt-1">
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
            <option value="rodoviaria">Rodoviária</option>
            <option value="restaurante">Restaurante</option>
            <option value='moradia'>Moradia</option>
          </select>
        </div>
      </div>
      {showPopup && (
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          overflowY: 'scroll',
          width: '300px'
        }}>
          <h4>Locais filtrados:</h4>
          <div className="row">
            {filteredLocations.map((location, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 mb-1">
                <div className="card" onClick={() => handleLocationClick(location.position)}>
                  <div className="card-body" style={{ padding: '10px' }}>
                    <strong><small className="card-title text-primary" style={{ fontSize: '14px', margin: '0' }}>{location.name}</small></strong>
                    <p className="card-text" style={{ fontSize: '12px', margin: '0' }}>{location.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPopup(false)} className="btn btn-secondary mt-2">Fechar</button>
        </div>
      )}
    </>
  );
};

const LegendPopup = ({ showLegend, setShowLegend }: { showLegend: boolean, setShowLegend: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <>
      {showLegend && (
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          width: '200px'
        }}>
          <button
            onClick={() => setShowLegend(false)}
            className="btn-close position-absolute"
            style={{ top: '10px', right: '10px' }}
          />
          <h4>Legenda</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><img src={icons.mercado.options.iconUrl} alt="Mercado" style={{ width: '20px', marginRight: '10px' }} />Mercado</li>
            <li><img src={icons.padaria.options.iconUrl} alt="Padaria" style={{ width: '20px', marginRight: '10px' }} />Padaria</li>
            <li><img src={icons['hortifrutti/mercearia'].options.iconUrl} alt="Hortifrutti/Mercearia" style={{ width: '20px', marginRight: '10px' }} /> Mercearia </li>
            <li><img src={icons.bar.options.iconUrl} alt="Bar" style={{ width: '20px', marginRight: '10px' }} />Bar</li>
            <li><img src={icons.farmacia.options.iconUrl} alt="Farmácia" style={{ width: '20px', marginRight: '10px' }} />Farmácia</li>
            <li><img src={icons.academia.options.iconUrl} alt="Academia" style={{ width: '20px', marginRight: '10px' }} />Academia</li>
            <li><img src={icons.unidadeSaude.options.iconUrl} alt="UPA/USF" style={{ width: '20px', marginRight: '10px' }} />UPA/USF</li>
            <li><img src={icons.entrada.options.iconUrl} alt="Entrada" style={{ width: '20px', marginRight: '10px' }} />Entrada</li>
            <li><img src={icons.shopping.options.iconUrl} alt="Shopping" style={{ width: '20px', marginRight: '10px' }} />Shopping</li>
            <li><img src={icons.rodoviaria.options.iconUrl} alt="Rodoviária" style={{ width: '20px', marginRight: '10px' }} />Rodoviária</li>
            <li><img src={icons.restaurante.options.iconUrl} alt="Restaurante" style={{ width: '20px', marginRight: '10px' }} />Restaurante</li>
            <li><img src={icons.moradia.options.iconUrl} alt="Moradia" style={{ width: '20px', marginRight: '10px' }} />Moradia</li>
          </ul>
          <button onClick={() => setShowLegend(false)} className="btn btn-secondary mt-2">Fechar</button>
        </div>
      )}
    </>
  );
};

const UnespMap: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  return (
    <div className="position-relative">
      <button
        onClick={toggleInfo}
        className="btn btn-info rounded-circle btn-sm position-absolute"
        style={{
          top: '70%',
          left: '85%',
          zIndex: 1000,
          width: '40px',
          height: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer'
        }}
      >
        <strong>?</strong>
      </button>
      <button
        onClick={toggleLegend}
        className="btn btn-info rounded-circle btn-sm position-absolute"
        style={{
          top: '60%',
          left: '85%',
          zIndex: 1000,
          width: '40px',
          height: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer'
        }}
      >
        <strong>i</strong>
      </button>
      {showInfo && (
        <div className="position-absolute bg-white rounded shadow" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, width: '80%' }}>
          <button
            onClick={toggleInfo}
            className="btn-close float-end"
            style={{ zIndex: 1001 }}
          />
          <div className="container-fluid" style={{ fontSize: '0.9rem', padding: '1.25rem', overflowY: 'auto' }}>
            <h3>Bem-vinde, ingressante!</h3>
            <p>
              Você provavelmente chegou em Rio Claro sem ter muita noção dos comércios que existem nas proximidades da Unesp.
              Para resolver esse problema, desenvolvemos esse mapa interativo que conta com pontos de interesse para você conhecer nesses primeiros meses dessa nova etapa da sua vida.
              Ele está dividido em categorias, cada uma com uma cor específica associada aos seus marcadores.
            </p>
            <p>
              Esperamos que ele te ajude bastante; se quiser, pode compartilhar com outras pessoas à vontade. (:
            </p>
            <div>
              <p><strong>Ideia concebida pela Comissão de Recepção da Biologia do ano de 2025</strong>; se precisar entrar em contato, envie uma mensagem para o Instagram <a href="https://instagram.com/cr.bio.rc" target="_blank">@cr.bio.rc</a>.</p>
              <p>Mapa elaborado por Lucas Barbosa, para contato, enviar e-mail para <a href="mailto:lucasbaralm@gmail.com">lucasbaralm@gmail.com</a>.</p>
              <p><strong>Última atualização:</strong> 09/02/2025 </p>
            </div>
          </div>
        </div>
      )}

      <LegendPopup showLegend={showLegend} setShowLegend={setShowLegend} />

      <MapContainer center={[-22.396403727665906, -47.54857750418907]} zoom={16} scrollWheelZoom={true}>
        <SearchBar locations={locations} />
        <FilterBar locations={locations} showPopup={showPopup} setShowPopup={setShowPopup} />
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
    </div>
  );
};

export default UnespMap;