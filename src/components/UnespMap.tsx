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
    <div className="absolute top-5 left-53/100 transform -translate-x-1/2 z-1000 w-7/9 shadow-md bg-white rounded-lg">
      <input
        type="text"
        placeholder="🔍 Buscar local..."
        value={search}
        onChange={handleSearch}
        className="form-control p-3 w-full rounded-lg border border-gray-300 text-sm outline-none box-border transition-all duration-200 ease-in-out"
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg mt-1 max-h-72 overflow-y-auto shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer border-b border-gray-200 transition-colors duration-200 ease-in-out text-sm text-primary"
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
      <div className="absolute top-41/50 left-1/2 transform -translate-x-1/2 z-1001 bg-white p-2 rounded-lg shadow-md w-65">
        <div className="flex justify-between">
          <label htmlFor="category-select">Filtrar por categoria:  </label>
          <select id="category-select" value={selectedCategory} onChange={handleCategoryChange} className="form-select-sm rounded mt-1 w-4/5 h-7">
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
            <option value='bicicletaria'>Bicicletaria</option>
          </select>
        </div>
      </div>
      {showPopup && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-1000 bg-white p-2 rounded-lg shadow-md overflow-y-scroll w-72">
          <h4>Locais filtrados:</h4>
          <div className="row">
            {filteredLocations.map((location, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 mb-1">
                <div className="card" onClick={() => handleLocationClick(location.position)}>
                  <div className="card-body p-2">
                    <strong><small className="card-title text-primary text-sm m-0">{location.name}</small></strong>
                    <p className="card-text text-xs m-0">{location.address}</p>
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
        <div className="absolute top-20 right-10 z-1001 bg-white p-2 rounded-lg shadow-md w-33">
          <button
            onClick={() => setShowLegend(false)}
            className="btn-close absolute top-2 right-2"
          />
          <div className='text-blue-800'>
            <h4 className="text-sm text-blue-800">Legenda</h4>
          </div>
          <ul className="list-none p-0">
            <li className="flex items-center mb-1"><img src={icons.mercado.options.iconUrl} alt="Mercado" className="w-4 mr-2" />Mercado</li>
            <li className="flex items-center mb-1"><img src={icons.padaria.options.iconUrl} alt="Padaria" className="w-4 mr-2" />Padaria</li>
            <li className="flex items-center mb-1"><img src={icons['hortifrutti/mercearia'].options.iconUrl} alt="Hortifrutti/Mercearia" className="w-4 mr-2" /> Mercearia </li>
            <li className="flex items-center mb-1"><img src={icons.bar.options.iconUrl} alt="Bar" className="w-4 mr-2" />Bar</li>
            <li className="flex items-center mb-1"><img src={icons.farmacia.options.iconUrl} alt="Farmácia" className="w-4 mr-2" />Farmácia</li>
            <li className="flex items-center mb-1"><img src={icons.academia.options.iconUrl} alt="Academia" className="w-4 mr-2" />Academia</li>
            <li className="flex items-center mb-1"><img src={icons.unidadeSaude.options.iconUrl} alt="UPA/USF" className="w-4 mr-2" />UPA/USF</li>
            <li className="flex items-center mb-1"><img src={icons.entrada.options.iconUrl} alt="Entrada" className="w-4 mr-2" />Entrada</li>
            <li className="flex items-center mb-1"><img src={icons.shopping.options.iconUrl} alt="Shopping" className="w-4 mr-2" />Shopping</li>
            <li className="flex items-center mb-1"><img src={icons.rodoviaria.options.iconUrl} alt="Rodoviária" className="w-4 mr-2" />Rodoviária</li>
            <li className="flex items-center mb-1"><img src={icons.restaurante.options.iconUrl} alt="Restaurante" className="w-4 mr-2" />Restaurante</li>
            <li className="flex items-center mb-1"><img src={icons.moradia.options.iconUrl} alt="Moradia" className="w-4 mr-2" />Moradia</li>
            <li className="flex items-center mb-1"><img src={icons.bicicletaria.options.iconUrl} alt="Bicicletaria" className="w-4 mr-2" />Bicicletaria</li>
          </ul>
          <button onClick={() => setShowLegend(false)} className="btn btn-secondary mt-2 text-xs">Fechar</button>
        </div>
      )}
    </>
  );
};

const UnespMap: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderPageContent = () => {
    if (currentPage === 1) {
      return (
        <>
          <h3>Bem-vinde, ingressante!</h3>
          <p>
            Você provavelmente chegou em Rio Claro sem ter muita noção dos comércios que existem nas proximidades da Unesp.
            Para resolver esse problema, desenvolvemos esse mapa interativo que conta com pontos de interesse para você conhecer nesses primeiros meses dessa nova etapa da sua vida.
            Ele está dividido em categorias, cada uma com uma cor específica associada aos seus marcadores.
          </p>
          <p>
            Esperamos que ele te ajude bastante; se quiser, pode compartilhar com outras pessoas à vontade. (:
          </p>
        </>
      );
    } else if (currentPage === 2) {
      return (
        <div>
          <p><strong>Ideia concebida pela Comissão de Recepção da Biologia do ano de 2025</strong>; se precisar entrar em contato, envie uma mensagem para o Instagram <a href="https://instagram.com/cr.bio.rc" target="_blank">@cr.bio.rc</a>.</p>
          <p>Mapa elaborado por Lucas Barbosa, para contato, enviar e-mail para <a href="mailto:lucasbaralm@gmail.com">lucasbaralm@gmail.com</a>.</p>
          <p><strong>Última atualização:</strong> 09/02/2025 </p>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleInfo}
        className="btn btn-info rounded-circle btn-sm absolute top-3/4 left-5/6 z-1000 w-10 h-10 bg-white rounded-lg shadow-md cursor-pointer"
      >
        <strong>?</strong>
      </button>
      <button
        onClick={toggleLegend}
        className="btn btn-info rounded-circle btn-sm absolute top-2/3 left-5/6 z-1000 w-10 h-10 bg-white rounded-lg shadow-md cursor-pointer"
      >
        <strong>i</strong>
      </button>
      {showInfo && (
        <div className="absolute bg-white rounded shadow top-10 left-1/2 transform -translate-x-1/2 z-1002 w-4/5">
          <button
            onClick={toggleInfo}
            className="btn-close float-end z-1002"
          />
          <div className="container-fluid text-xs p-5 overflow-y-auto break-words">
            {renderPageContent()}
          </div>
          <div className="text-center mt-2 text-xs">
            <span>{currentPage}/2</span>
          </div>
          <div className="flex justify-between mt-3">
            {currentPage > 1 && (
              <button onClick={handlePreviousPage} className="btn btn-primary border mb-2 px-3 py-2">
                &larr; Anterior
              </button>
            )}
            {currentPage < 2 && (
              <button onClick={handleNextPage} className="btn btn-primary ms-auto border mb-2 px-3 py-2">
                Próxima &rarr;
              </button>
            )}
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