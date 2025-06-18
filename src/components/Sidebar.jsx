import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown, MapPin, Globe, Building } from 'lucide-react';
import CacheService from '../services/CacheService';
import '../styles/glassmorphism.css';

const Sidebar = ({ isOpen, onClose, onMouseEnter, onMouseLeave }) => {
  const [expandedContinent, setExpandedContinent] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [continentTrips, setContinentTrips] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const continents = [
    'AFRIQUE', 'AMERIQUE_DU_NORD', 'AMERIQUE_DU_SUD', 
    'ASIE', 'EUROPE', 'OCEANIE'
  ];

  const fetchTripsByContinent = async (continent) => {
    if (continentTrips[continent]) {
      return;
    }

    try {
      setLoadingStates(prev => ({ ...prev, [continent]: true }));

      const data = await CacheService.fetchWithCache(
        `trips_continent_${continent}`,
        `http://13.39.150.189:8080/travel/trips/continent/${continent}`,
        30 // 30 minutes de cache
      );

      setContinentTrips(prev => ({
        ...prev,
        [continent]: data || []
      }));

    } catch (error) {
      console.error(`Erreur lors du chargement des voyages pour ${continent}:`, error);
      setContinentTrips(prev => ({
        ...prev,
        [continent]: []
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [continent]: false }));
    }
  };

  const getCountriesFromTrips = (continent) => {
    if (!continentTrips[continent]) return [];
    
    const countries = [...new Set(continentTrips[continent].map(trip => trip.destinationCountry))];
    return countries.sort();
  };


  const getCitiesFromCountry = (continent, country) => {
    if (!continentTrips[continent]) return [];
    
    const cities = continentTrips[continent]
      .filter(trip => trip.destinationCountry === country)
      .map(trip => trip.destinationCity);
    
    return [...new Set(cities)].sort();
  };


  const getTripsByCountry = (continent, country) => {
    if (!continentTrips[continent]) return [];
    
    return continentTrips[continent].filter(trip => 
      trip.destinationCountry === country
    );
  };


  const getTripsByCity = (continent, country, city) => {
    if (!continentTrips[continent]) return [];
    
    return continentTrips[continent].filter(trip => 
      trip.destinationCountry === country && trip.destinationCity === city
    );
  };

  const handleContinentClick = async (continent) => {
    if (expandedContinent === continent) {
      setExpandedContinent(null);
      setExpandedCountry(null);
      setSelectedCountry(null);
      setSelectedCity(null);
    } else {
      setExpandedContinent(continent);
      setExpandedCountry(null);
      setSelectedCountry(null);
      setSelectedCity(null);
      await fetchTripsByContinent(continent);
    }
  };

  const handleCountryClick = (country) => {
    const countryKey = `${expandedContinent}_${country}`;
    
    if (expandedCountry === countryKey) {
      setExpandedCountry(null);
      setSelectedCountry(null);
    } else {
      setExpandedCountry(countryKey);
      setSelectedCountry(country);
      setSelectedCity(null);
    }
  };

  const handleCityClick = (city, country) => {
    setSelectedCity(city);
    setSelectedCountry(country);
    
    const trips = getTripsByCity(expandedContinent, country, city);
    console.log(`Voyages trouvés pour ${city}, ${country}:`, trips);
  };

  const formatName = (name) => {
    return name?.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || name;
  };

  const handleTripSelect = (trip) => {
    window.location.href = `/trip/${trip.id}`;
  };

  const getTripsToDisplay = () => {
    if (!expandedContinent || !continentTrips[expandedContinent]) return [];
    
    if (selectedCity && selectedCountry) {

      return getTripsByCity(expandedContinent, selectedCountry, selectedCity);
    } else if (selectedCountry) {

      return getTripsByCountry(expandedContinent, selectedCountry);
    } else {

      return continentTrips[expandedContinent];
    }
  };

  const getPanelTitle = () => {
    if (selectedCity && selectedCountry) {
      return `Voyages à ${formatName(selectedCity)}`;
    } else if (selectedCountry) {
      return `Voyages en ${formatName(selectedCountry)}`;
    } else if (expandedContinent) {
      return `Voyages en ${formatName(expandedContinent)}`;
    }
    return 'Voyages disponibles';
  };

  if (!isOpen) return null;

  const tripsToDisplay = getTripsToDisplay();

  return (
    <>
      {/* Sidebar avec effet glassmorphism */}
      <div 
        className="position-fixed start-0 shadow d-flex glass-sidebar" 
        style={{ 
          top: '56px',
          height: 'calc(100vh - 56px)',
          zIndex: 1050, 
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', 
          transition: 'transform 0.3s ease-in-out',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Panel principal des continents avec glassmorphism */}
        <div style={{ width: '320px', overflowY: 'auto' }}>
          <div className="p-3 border-bottom text-white d-flex justify-content-between align-items-center glass-sidebar-header">
            <h6 className="mb-0 d-flex align-items-center gap-2 glass-text-white">
              <Globe size={20} />
              Destinations
            </h6>
              <button
                onClick={onClose}
                className="glass-btn glass-border-radius p-2"
                style={{ fontSize: '1.2rem' }}
              >
                <X size={20} />
              </button>
          </div>
          
          <div className="p-2">
            {continents.map((continent) => {
              const countries = getCountriesFromTrips(continent);
              const isActive = expandedContinent === continent;
              
              return (
                <div key={continent} className="mb-2">
                  <button
                    onClick={() => handleContinentClick(continent)}
                    className={`glass-continent-btn glass-border-radius-lg w-100 d-flex justify-content-between align-items-center p-3 border-0 ${isActive ? 'active' : ''}`}
                  >
                    <div className="d-flex align-items-center">
                      <Globe className="me-3" size={16} />
                      <span className="fw-medium">
                        {formatName(continent)}
                      </span>
                    </div>
                    
                    <span className="d-flex align-items-center gap-1">
                      {loadingStates[continent] && (
                        <div className="spinner-border spinner-border-sm" role="status" />
                      )}
                      {expandedContinent === continent ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  </button>
                  
                  {/* Pays du continent */}
                  {expandedContinent === continent && countries.length > 0 && (
                    <div className="ms-4 mt-2">
                      {countries.map((country) => {
                        const cities = getCitiesFromCountry(continent, country);
                        const countryKey = `${continent}_${country}`;
                        const isCountryActive = selectedCountry === country;
                        
                        return (
                          <div key={country} className="mb-1">
                            <button
                              onClick={() => handleCountryClick(country)}
                              className={`glass-country-btn glass-border-radius w-100 d-flex justify-content-between align-items-center p-2 ${isCountryActive ? 'active' : ''}`}
                              style={{ fontSize: '0.875rem' }}
                            >
                              <div className="d-flex align-items-center">
                                <MapPin className="me-2 text-success" size={14} />
                                <span className="small">
                                  {formatName(country)}
                                </span>
                              </div>
                              
                              <span className="d-flex align-items-center gap-1">
                                <span className="glass-badge me-1">
                                  {cities.length}
                                </span>
                                {expandedCountry === countryKey ? (
                                  <ChevronDown size={14} />
                                ) : (
                                  <ChevronRight size={14} />
                                )}
                              </span>
                            </button>
                            
                            {/* Villes du pays */}
                            {expandedCountry === countryKey && (
                              <div className="ms-4 mt-1">
                                {cities.length === 0 ? (
                                  <div className="small text-muted p-2">
                                    Aucune ville disponible
                                  </div>
                                ) : (
                                  cities.map((city) => {
                                    const isCityActive = selectedCity === city;
                                    
                                    return (
                                      <button
                                        key={city}
                                        onClick={() => handleCityClick(city, country)}
                                        className={`glass-city-btn glass-border-radius-sm w-100 d-flex align-items-center p-2 mb-1 text-start ${isCityActive ? 'active' : ''}`}
                                        style={{ fontSize: '0.75rem' }}
                                      >
                                        <Building className="me-2 text-info" size={12} />
                                        <span className="small">
                                          {formatName(city)}
                                        </span>
                                      </button>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel des voyages avec glassmorphism */}
        {expandedContinent && tripsToDisplay.length > 0 && (
          <div 
            className="border-start glass-sidebar-panel" 
            style={{ width: '450px', overflowY: 'auto' }}
          >
            <div className="p-3 border-bottom text-white glass-sidebar-header">
              <h5 className="mb-0 glass-text-white">
                {getPanelTitle()}
              </h5>
              <small className="text-muted">
                {tripsToDisplay.length} voyage{tripsToDisplay.length > 1 ? 's' : ''} disponible{tripsToDisplay.length > 1 ? 's' : ''}
                {selectedCountry && ` • ${formatName(selectedCountry)}`}
                {selectedCity && ` • ${formatName(selectedCity)}`}
              </small>
            </div>
            
            <div className="p-3">
              {tripsToDisplay.map((trip) => (
                <div 
                  key={trip.id} 
                  className="glass-card mb-3 shadow-sm text-light"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title text-light mb-1">
                        {formatName(trip.destinationCity)}, {formatName(trip.destinationCountry)}
                      </h6>
                      <span className="glass-badge-price">
                        {trip.formattedPrice}
                      </span>
                    </div>
                    
                    <p className="card-text small text-light mb-2" style={{ fontSize: '0.85rem' }}>
                      {trip.description}
                    </p>
                    
                    <div className="mb-2">
                      <small className="text-light d-block">
                        <MapPin size={12} className="me-1" />
                        <strong>Durée minimum:</strong> {trip.minimumDuration} jour{trip.minimumDuration > 1 ? 's' : ''}
                      </small>                  
                    </div>                    
                    <button 
                      className="glass-trip-btn glass-border-radius w-100"
                      onClick={() => handleTripSelect(trip)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      Voir ce voyage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;