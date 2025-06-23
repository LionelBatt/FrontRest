import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Building, Search, ChevronRight } from 'lucide-react';
import CacheService from '../services/CacheService';

const SearchBar = ({ isInHeader = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        `http://13.36.39.58:8080/travel/trips/search/text/${encodeURIComponent(text)}`,
        30 // TTL de 30 minutes
      );

      if (!data) {
        throw new Error('Aucune donnée reçue du serveur');
      }

      if (!Array.isArray(data)) {
        throw new Error('Format de réponse API invalide');
      }

      const uniqueResults = new Map();
      
      data.forEach(trip => {
        if (trip.destinationCity && trip.destinationCountry) {
          const cityName = trip.destinationCity.toLowerCase();
          const searchText = text.toLowerCase();
          
          if (cityName.includes(searchText)) {
            const key = `city_${trip.destinationContinent}_${trip.destinationCountry}_${trip.destinationCity}`;
            if (!uniqueResults.has(key)) {
              uniqueResults.set(key, {
                type: 'city',
                value: `${trip.destinationContinent}|${trip.destinationCountry}|${trip.destinationCity}`,
                label: formatName(trip.destinationCity),
                continent: trip.destinationContinent,
                country: trip.destinationCountry,
                tripData: trip, // Stocke toutes les données du voyage
                icon: <Building size={14} className="me-2" />
              });
            }
          }
        }
      });

      setOptions(Array.from(uniqueResults.values()));
    } catch (err) {
      console.error('Erreur de recherche:', err);
      setError(err.message || 'Erreur lors de la connexion au serveur');
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
    
    // Navigation vers FicheVoyage avec les données
    if (option.tripData?.id) {
      navigate(`/trip/${option.tripData.id}`, {
        state: { 
          tripData: option.tripData,
          fromSearch: true
        }
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedOption(null);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Cas Vide
    if (!searchQuery.trim() || !selectedOption) {
    navigate('/search');
    return;
  }
    if (selectedOption?.tripData) {
      handleOptionSelect(selectedOption);
    }
  };

  return (
    <div className={isInHeader ? "position-relative" : "position-absolute top-50 end-0 translate-middle-y"} 
         style={isInHeader ? { 
           width: '100%',
           maxWidth: '400px'
         } : { 
           zIndex: 1030, 
           right: '2rem', 
           maxWidth: '300px',
           backgroundColor: '#e8f5e9',
           padding: '8px',
           borderRadius: '50px'
         }}>
      <div className="position-relative">
        <form onSubmit={handleSubmit}>
          <div className={`d-flex align-items-center ${isInHeader ? 'bg-white' : 'bg-white'} rounded-pill shadow-sm ${
            isFocused ? 'border-primary border-2' : 'border'
          }`} style={{ 
            height: '40px',
            backgroundColor: isInHeader ? 'rgba(255, 255, 255, 0.9)' : '#e8f5e9'
          }}>
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
              placeholder={isLoading ? "Recherche..." : "Rechercher une ville..."}
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
              className="btn rounded-pill h-100 px-3"
              style={{
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                minWidth: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#388e3c',
                color: 'white',
                border: 'none'
              }}
              disabled={isLoading}
              aria-label="Lancer la recherche"
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
              ) : (
                <Search size={18} />
              )}
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
              <div className="p-2 text-danger text-center">
                {error.includes('timed out') ? 
                  'Le serveur ne répond pas. Veuillez réessayer plus tard.' : 
                  error}
              </div>
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
