import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronDown, MapPin, Globe, Building } from 'lucide-react';

// Composant Sidebar mis à jour avec Bootstrap uniquement
const Sidebar = ({ isOpen, onClose, onMouseEnter, onMouseLeave }) => {
  const [continents, setContinents] = useState([]);
  const [expandedContinent, setExpandedContinent] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [countries, setCountries] = useState({});
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTrips, setSelectedTrips] = useState([]);

  // Simulation des données (à remplacer par vos appels API)
  const mockData = {
    continents: [
      'AFRIQUE', 'AMERIQUE_DU_NORD', 'AMERIQUE_DU_SUD', 
      'ANTARTIQUE', 'ASIE', 'EUROPE', 'OCEANIE'
    ],
    countries: {
      'EUROPE': ['FRANCE', 'ANGLETERRE', 'ESPAGNE', 'ITALIE'],
      'AMERIQUE_DU_NORD': ['US', 'CANADA'],
      'AMERIQUE_DU_SUD': ['BRESIL', 'ARGENTINE'],
      'ASIE': ['JAPON', 'CHINE', 'COREE_DU_SUD'],
      'AFRIQUE': ['EGYPTE', 'MAROC'],
      'OCEANIE': ['AUSTRALIE', 'NOUVELLE_ZELANDE']
    },
    cities: {
      'FRANCE': ['PARIS', 'LYON', 'MARSEILLE'],
      'ANGLETERRE': ['LONDON', 'MANCHESTER'],
      'ESPAGNE': ['MADRID', 'BARCELONE'],
      'ITALIE': ['ROME', 'MILAN'],
      'US': ['NEW_YORK', 'LOS_ANGELES'],
      'CANADA': ['MONTREAL', 'TORONTO'],
      'BRESIL': ['RIO', 'SAO_PAULO'],
      'ARGENTINE': ['BUENOS_AIRES', 'CORDOBA'],
      'JAPON': ['TOKYO', 'OSAKA'],
      'CHINE': ['BEIJING', 'SHANGHAI'],
      'COREE_DU_SUD': ['SEOUL', 'BUSAN'],
      'EGYPTE': ['CAIRO', 'ALEXANDRIE'],
      'MAROC': ['CASABLANCA', 'MARRAKECH'],
      'AUSTRALIE': ['SYDNEY', 'MELBOURNE'],
      'NOUVELLE_ZELANDE': ['AUCKLAND', 'WELLINGTON']
    }
  };

  // Initialisation des continents
  useEffect(() => {
    if (isOpen) {
      fetchContinents();
    }
  }, [isOpen]);

  const fetchContinents = async () => {
    try {
      setLoading(true);
      setContinents(mockData.continents);
    } catch (error) {
      console.error('Erreur lors du chargement des continents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async (continent) => {
    try {
      setLoading(true);
      setCountries(prev => ({
        ...prev,
        [continent]: mockData.countries[continent] || []
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des pays:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (country) => {
    try {
      setLoading(true);
      setCities(prev => ({
        ...prev,
        [country]: mockData.cities[country] || []
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTripsByLocation = async (continent, country, city) => {
    try {
      setLoading(true);
      const mockTrips = [
        {
          id: 1,
          description: `Voyage à ${formatName(city)}, ${formatName(country)}`,
          unitPrice: Math.floor(Math.random() * 2000) + 500,
          minimumDuration: `${Math.floor(Math.random() * 10) + 3} jours`
        },
        {
          id: 2,
          description: `Découverte de ${formatName(city)}`,
          unitPrice: Math.floor(Math.random() * 1500) + 300,
          minimumDuration: `${Math.floor(Math.random() * 7) + 2} jours`
        }
      ];
      
      setSelectedTrips(mockTrips);
    } catch (error) {
      console.error('Erreur lors du chargement des voyages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinentClick = async (continent) => {
    if (expandedContinent === continent) {
      setExpandedContinent(null);
      setExpandedCountry(null);
    } else {
      setExpandedContinent(continent);
      setExpandedCountry(null);
      if (!countries[continent]) {
        await fetchCountries(continent);
      }
    }
  };

  const handleCountryClick = async (country) => {
    if (expandedCountry === country) {
      setExpandedCountry(null);
    } else {
      setExpandedCountry(country);
      if (!cities[country]) {
        await fetchCities(country);
      }
    }
  };

  const handleCityClick = async (city, country) => {
    await fetchTripsByLocation(expandedContinent, country, city);
  };

  const formatName = (name) => {
    return name.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Sidebar */}
      <div 
        className="position-fixed start-0 bg-dark shadow d-flex" 
        style={{ 
          top: '56px', // Hauteur standard du navbar Bootstrap
          height: 'calc(100vh - 56px)', // Hauteur totale moins la hauteur du navbar
          zIndex: 1050, 
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', 
          transition: 'transform 0.3s ease-in-out'
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Panel principal */}
        <div style={{ width: '320px', overflowY: 'auto' }}>
          <div className="p-2 border-bottom bg-dark text-white d-flex justify-content-end align-items-center">
            <button
              onClick={onClose}
              className="btn btn-outline-light p-1"
              style={{ fontSize: '1.2rem', border: 'none' }}
            >
              <X size={20} />
            </button>
          </div>
          
          {loading && continents.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {continents.map((continent) => (
                <div key={continent} className="mb-2">
                  <button
                    onClick={() => handleContinentClick(continent)}
                    className="btn btn-secondary w-100 d-flex justify-content-between align-items-center p-3 border-0"
                    style={{ borderRadius: '8px', backgroundColor: '#495057' }}
                  >
                    <div className="d-flex align-items-center">
                      <Globe className="me-3 text-light" size={16} />
                      <span className="fw-medium text-light">
                        {formatName(continent)}
                      </span>
                    </div>
                    {expandedContinent === continent ? (
                      <ChevronDown className="text-light" size={16} />
                    ) : (
                      <ChevronRight className="text-light" size={16} />
                    )}
                  </button>
                  
                  {expandedContinent === continent && (
                    <div className="ms-4 mt-2">
                      {countries[continent]?.map((country) => (
                        <div key={country} className="mb-1">
                          <button
                            onClick={() => handleCountryClick(country)}
                            className="btn btn-outline-secondary btn-sm w-100 d-flex justify-content-between align-items-center p-2"
                            style={{ borderColor: '#6c757d', color: '#f8f9fa' }}
                          >
                            <div className="d-flex align-items-center">
                              <MapPin className="me-2 text-success" size={14} />
                              <span className="small text-light">
                                {formatName(country)}
                              </span>
                            </div>
                            {expandedCountry === country ? (
                              <ChevronDown className="text-light" size={14} />
                            ) : (
                              <ChevronRight className="text-light" size={14} />
                            )}
                          </button>
                          
                          {expandedCountry === country && (
                            <div className="ms-4 mt-1">
                              {cities[country]?.map((city) => (
                                <button
                                  key={city}
                                  onClick={() => handleCityClick(city, country)}
                                  className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center p-2 mb-1"
                                  style={{ borderColor: '#6c757d', color: '#f8f9fa' }}
                                >
                                  <Building className="me-2 text-info" size={12} />
                                  <span className="small text-light">
                                    {formatName(city)}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel des voyages sélectionnés */}
        {selectedTrips.length > 0 && (
          <div className="bg-secondary border-start border-light" style={{ width: '350px', overflowY: 'auto' }}>
            <div className="p-3 border-bottom border-light text-white bg-dark">
              <h5 className="mb-0 text-white">Voyages Disponibles</h5>
            </div>
            <div className="p-3">
              {selectedTrips.map((trip) => (
                <div key={trip.id} className="card mb-3 shadow-sm bg-dark text-light border-secondary">
                  <div className="card-body">
                    <h6 className="card-title text-light">{trip.description}</h6>
                    <div className="mb-2">
                      <small className="text-light d-block">
                        <strong>Prix:</strong> {trip.unitPrice}€
                      </small>
                      <small className="text-light d-block">
                        <strong>Durée minimum:</strong> {trip.minimumDuration}
                      </small>
                    </div>
                    <button className="btn btn-outline-light btn-sm w-100">
                      Réserver ce voyage
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