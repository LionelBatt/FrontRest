

  import { useState, useEffect } from 'react';
import { X, Globe, MapPin, Building, Search, ChevronRight } from 'lucide-react';
import CacheService from '../services/CacheService';
{/*
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatName = (name) => {
    if (!name) return '';
    return name.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const searchByText = async (text) => {
    if (!text || text.length < 1) {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await CacheService.fetchWithCache(
        `search_${text}`,
        `http://15.188.48.92:8080/travel/trips/search/text/${encodeURIComponent(text)}`,
        5
      );

      if (!data || !Array.isArray(data)) {
        throw new Error('Format de réponse API invalide');
      }

      const uniqueResults = new Map();
      
      data.forEach(trip => {
        if (trip.destinationContinent) {
          const key = `continent_${trip.destinationContinent}`;
          if (!uniqueResults.has(key)) {
            uniqueResults.set(key, {
              type: 'continent',
              value: trip.destinationContinent,
              label: formatName(trip.destinationContinent),
              icon: <Globe size={14} className="me-2" />
            });
          }
        }
        
        if (trip.destinationCountry) {
          const key = `country_${trip.destinationContinent}_${trip.destinationCountry}`;
          if (!uniqueResults.has(key)) {
            uniqueResults.set(key, {
              type: 'country',
              value: `${trip.destinationContinent}|${trip.destinationCountry}`,
              label: formatName(trip.destinationCountry),
              continent: trip.destinationContinent,
              icon: <MapPin size={14} className="me-2" />
            });
          }
        }
        
        if (trip.destinationCity && trip.destinationCountry) {
          const key = `city_${trip.destinationContinent}_${trip.destinationCountry}_${trip.destinationCity}`;
          if (!uniqueResults.has(key)) {
            uniqueResults.set(key, {
              type: 'city',
              value: `${trip.destinationContinent}|${trip.destinationCountry}|${trip.destinationCity}`,
              label: formatName(trip.destinationCity),
              continent: trip.destinationContinent,
              country: trip.destinationCountry,
              icon: <Building size={14} className="me-2" />
            });
          }
        }
      });

      setOptions(Array.from(uniqueResults.values()));
    } catch (err) {
      console.error('Erreur de recherche:', err);
      setError('Erreur lors de la recherche');
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        searchByText(searchQuery.trim());
      } else {
        setOptions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchQuery(option.label);
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedOption(null);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedOption) {
      console.log('Recherche soumise:', searchQuery);
    }
  };

  return (
    <div className="position-absolute top-50 end-0 translate-middle-y" 
         style={{ 
           zIndex: 1030, 
           right: '2rem', 
           maxWidth: '400px', 
           width: '100%' 
         }}>
      <div className="position-relative">
      <form onSubmit={handleSubmit}>
        <div className={`d-flex align-items-center bg-white rounded-pill shadow-sm ${
          isFocused ? 'border-primary border-2' : 'border'
        }`} style={{ height: '45px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedOption(null);
              setShowDropdown(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowDropdown(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowDropdown(false), 200);
            }}
            placeholder={isLoading ? "Recherche..." : "Rechercher une destination..."}
            className="flex-grow-1 border-0 bg-transparent px-3 py-2"
            style={{
              outline: 'none',
              fontSize: '0.9rem',
              height: '100%'
            }}
            disabled={isLoading}
            aria-label="Rechercher une destination"
          />

          {(searchQuery || selectedOption) && !isLoading && (
            <button
              type="button"
              onClick={clearSearch}
              className="btn btn-link text-muted p-0 me-2"
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Effacer la recherche"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className={`btn rounded-pill h-100 px-3 ${
              (searchQuery.trim() || selectedOption) 
                ? 'btn-primary' 
                : 'btn-light text-muted'
            }`}
            style={{
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
              minWidth: '50px'
            }}
            disabled={!(searchQuery.trim() || selectedOption) || isLoading}
            aria-label="Lancer la recherche"
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            ) : 'Go'}
          </button>
        </div>
      </form>

      {showDropdown && (
        <div 
          className="position-absolute start-0 end-0 bg-white border shadow-lg mt-1"
          style={{
            width: '100%',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            fontSize: '0.8rem',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          {isLoading ? (
            <div className="p-2 text-center">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <span className="ms-2">Recherche...</span>
            </div>
          ) : error ? (
            <div className="p-2 text-danger text-center">{error}</div>
          ) : options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                className="p-2 ps-3 d-flex align-items-center hover-bg-light"
                style={{ cursor: 'pointer' }}
                onClick={() => handleOptionSelect(option)}
              >
                {option.icon}
                <div className="flex-grow-1">
                  <div className="fw-bold">{option.label}</div>
                  {option.type === 'city' && (
                    <small className="text-muted d-block">
                      {formatName(option.country)}, {formatName(option.continent)}
                    </small>
                  )}
                  {option.type === 'country' && (
                    <small className="text-muted d-block">
                      {formatName(option.continent)}
                    </small>
                  )}
                </div>
                <ChevronRight size={12} className="text-muted" />
              </div>
            ))
          ) : searchQuery ? (
            <div className="p-2 text-muted text-center">
              Aucun résultat pour "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchBar; */}


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatName = (name) => {
    if (!name) return '';
    return name.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const searchByText = async (text) => {
  if (!text || text.length < 1) {
    setOptions([]);
    return;
  }

  setIsLoading(true);
  setError(null);
  
  try {
    const data = await CacheService.fetchWithCache(
      `search_${text}`,
      `http://15.188.48.92:8080/travel/trips/search/text/${encodeURIComponent(text)}`,
      5
    );

    if (!data || !Array.isArray(data)) {
      throw new Error('Format de réponse API invalide');
    }

    const uniqueResults = new Map();
    
    data.forEach(trip => {
      // On filtre seulement les villes
      if (trip.destinationCity && trip.destinationCountry) {
        const cityName = trip.destinationCity.toLowerCase();
        const searchText = text.toLowerCase();
        
        // Vérifie si la ville contient la chaîne recherchée (insensible à la casse)
        if (cityName.includes(searchText)) {
          const key = `city_${trip.destinationContinent}_${trip.destinationCountry}_${trip.destinationCity}`;
          if (!uniqueResults.has(key)) {
            uniqueResults.set(key, {
              type: 'city',
              value: `${trip.destinationContinent}|${trip.destinationCountry}|${trip.destinationCity}`,
              label: formatName(trip.destinationCity),
              continent: trip.destinationContinent,
              country: trip.destinationCountry,
              icon: <Building size={14} className="me-2" />
            });
          }
        }
      }
    });

    setOptions(Array.from(uniqueResults.values()));
  } catch (err) {
    console.error('Erreur de recherche:', err);
    setError('Erreur lors de la recherche');
    setOptions([]);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        searchByText(searchQuery.trim());
      } else {
        setOptions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchQuery(option.label);
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedOption(null);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedOption) {
      console.log('Recherche soumise:', searchQuery);
    }
  };

  return (
        <div className="position-absolute top-50 end-0 translate-middle-y" 
          style={{ 
            zIndex: 1030, 
            right: '2rem', 
            maxWidth: '300px', 
            backgroundColor: '#e8f5e9', // Fond vert clair
            padding: '8px', 
            borderRadius: '50px' 
          }}>
        <div className="position-relative">
          <form onSubmit={handleSubmit}>
            <div className={`d-flex align-items-center bg-white rounded-pill shadow-sm ${
              isFocused ? 'border-primary border-2' : 'border'
            }`} style={{ height: '45px',  backgroundColor: '#e8f5e9' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedOption(null);
              setShowDropdown(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowDropdown(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowDropdown(false), 200);
            }}
            placeholder={isLoading ? "Recherche..." : "Rechercher une ville ..."}
            className="flex-grow-1 border-0 bg-transparent px-3 py-2"
            style={{
              outline: 'none',
              fontSize: '0.9rem',
              height: '100%',
              backgroundColor: 'transparent' 
            }}
            disabled={isLoading}
            aria-label="Rechercher une destination"
          />

          {(searchQuery || selectedOption) && !isLoading && (
            <button
              type="button"
              onClick={clearSearch}
              className="btn btn-link text-muted p-0 me-2"
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Effacer la recherche"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className={`btn rounded-pill h-100 px-3 ${
              (searchQuery.trim() || selectedOption) 
                ? 'btn-primary' 
                : 'btn-light text-muted'
            }`}
            style={{
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
              minWidth: '50px',
              display: 'flex',
              backgroundColor: '#388e3c',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            disabled={!(searchQuery.trim() || selectedOption) || isLoading}
            aria-label="Lancer la recherche"
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            ) : (
              <>
                <Search size={16} className="me-1" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Dropdown ajusté */}
      {showDropdown && (
      <div 
        className="position-absolute start-0 end-0 bg-white border shadow-lg mt-1"
        style={{
          width: '100%', // S'adapte à la largeur du parent
          maxHeight: '300px',
          overflowY: 'auto',
          zIndex: 1000,
          fontSize: '0.8rem',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}
        >
          {isLoading ? (
            <div className="p-2 text-center">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <span className="ms-2">Recherche...</span>
            </div>
          ) : error ? (
            <div className="p-2 text-danger text-center">{error}</div>
          ) : options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                className="p-2 ps-3 d-flex align-items-center hover-bg-light"
                style={{ cursor: 'pointer' }}
                onClick={() => handleOptionSelect(option)}
              >
                {option.icon}
              <div className="flex-grow-1">
              <div className="fw-bold">{option.label}</div>
              <small className="text-muted d-block">
                {formatName(option.country)}, {formatName(option.continent)}
              </small>
            </div>
            <ChevronRight size={12} className="text-muted" />
          </div>
            ))
          ) : searchQuery ? (
            <div className="p-2 text-muted text-center">
              Aucun résultat pour "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchBar;









