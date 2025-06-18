import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MapPin, Globe, Building, Settings, ChevronDown, ChevronRight, Package, RotateCcw } from 'lucide-react';
import CacheService from '../services/CacheService';
import ReactSlider from "react-slider";


const Search = () => {
    const location = useLocation();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedContinent, setExpandedContinent] = useState(null);
    const [expandedCountry, setExpandedCountry] = useState(null);

    const params = new URLSearchParams(location.search);
    const [selectedContinentId, setSelectedContinentId] = useState("");
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedContinent, setSelectedContinent] = useState(params.get("continent") || "null");
    const [selectedCountry, setSelectedCountry] = useState(params.get("country") || "null");
    const [selectedCity, setSelectedCity] = useState(params.get("city") || "null");
    const [selectedMinPrice, setSelectedMinPrice] = useState(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(39999);
    const [selectedOpts, setSelectedOpts] = useState("0");
    const [minimumDuration, setMinimumDuration] = useState(1);
    const [maximumDuration, setMaximumDuration] = useState(40); 


    const [price, setPrice] = useState(2500);
    const [continents, setContinents] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [optionsPreselected, setOptionsPreselected] = useState([]);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    // États pour le dropdown d'options
    const [showAllOptions, setShowAllOptions] = useState(false);
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});


    const fetchTripDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://13.39.150.189:8080/travel/trips/filter/${selectedContinent}/${selectedCountry}/${selectedCity}/${minimumDuration}/${maximumDuration}/${selectedOpts}/${selectedMinPrice}/${selectedMaxPrice}`);
            const result = await response.json();
            const data = result.data || result || [];

            setTrips(data);
            setMessage(result.message || "");

        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
            setTrips([]); 
        } finally {
            setLoading(false);
        }
    };

    const fetchOptions = async () => {
        try {
            setOptionsLoading(true);
            const data = await CacheService.fetchWithCache(
                `cache_travel_options`,
                `http://13.39.150.189:8080/travel/options`,
                60
            );

            setOptions(data);
            setMessage(data.message || "");

        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
        } finally {
            setOptionsLoading(false);
        }
    };

    useEffect(() => {
        fetch("http://13.39.150.189:8080/travel/destination/continents")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setContinents(data))
            .catch(err => console.error("Erreur de chargement des continents", err));

        fetch("http://13.39.150.189:8080/travel/destination/countries")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Pays reçus :", data);
                setCountry(data);
            })
            .catch(err => console.error("Erreur de chargement des pays", err));
        fetch("http://13.39.150.189:8080/travel/destination/cities")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setCity(data))
            .catch(err => console.error("Erreur de chargement des villes", err));

        fetchOptions();

        fetchTripDetails();
    }, [selectedOpts]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        if (optionsPreselected.length > 0) {
            const optionIds = optionsPreselected.map(val => val.split('-')[1]);
            const concatenatedIds = optionIds.join(',');
            setSelectedOpts(concatenatedIds);
        }
        fetchTripDetails();
    };

    // Fonctions pour le dropdown d'options
    const handleShowAllOptions = () => {
        if (!showAllOptions && options.length === 0) {
            setOptionsLoading(true);
            fetchOptions();
        }
        setShowAllOptions(!showAllOptions);
    };

    const toggleCategoryExpansion = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleOptionToggle = (option) => {
        const optionValue = `${option.category}-${option.optionId}`;
        const isSelected = optionsPreselected.includes(optionValue);
        
        if (isSelected) {
            setOptionsPreselected(prev => prev.filter(val => val !== optionValue));
        } else {
            setOptionsPreselected(prev => [...prev, optionValue]);
        }
    };

    const resetAllOptions = () => {
        setOptionsPreselected([]);
        setSelectedOpts("0");
        setExpandedCategories({});
    };

    const formatCategoryName = (category) => {
        const categories = {
            'ACCOMMODATION': 'Hébergement',
            'MEALS': 'Restauration',
            'SERVICES': 'Services',
            'WELLNESS': 'Bien-être',
            'TRAVEL': 'Voyage',
            'PACKAGE': 'Forfait',
            'LUXURY': 'Luxe',
            'EVENT': 'Événements',
            'TRANSPORT': 'Transport',
            'ACTIVITIES': 'Activités',
            'OTHERS': 'Autres'
        };
        return categories[category] || category;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'ACCOMMODATION': '🏨',
            'MEALS': '🍽️',
            'SERVICES': '🛎️',
            'WELLNESS': '💆',
            'TRAVEL': '✈️',
            'PACKAGE': '📦',
            'LUXURY': '💎',
            'EVENT': '🎉',
            'TRANSPORT': '🚗',
            'ACTIVITIES': '🎯',
            'OTHERS': '⚙️'
        };
        return icons[category] || '⚙️';
    };

    const groupOptionsByCategory = (options) => {
        const groups = {};
        // Vérifier que options est un tableau avant d'utiliser forEach
        if (!options || !Array.isArray(options)) {
            return groups;
        }
        
        options.forEach((opt) => {
            if (!groups[opt.category]) {
                groups[opt.category] = [];
            }
            groups[opt.category].push(opt);
        });
        return groups;
    };

    const formatDestination = (city, country) => {
        const formatName = (name) => {
            return name?.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        };
        return `${formatName(city)}, ${formatName(country)}`;
    };

    if (loading) return <p>Chargement...</p>;
    return (
        <>
            <div className="container" style={{ textAlign: "center" }}>
                <br /><br /><br />

                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column align-items-center justify-content-center flex-wrap gap-3 glass-top-bar mb-4 mt-3">
                        <br />
                        <div className="w-75 p-3 d-flex flex-wrap gap-3 glass-top-bar justify-content-center">
                            {/* Select Continent */}
                            <div className="glass-block p-2 rounded">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <Globe size={16} />
                                    <span style={{ color: "#222" }}>Continent</span>
                                </div>
                                <select
                                    className="form-select"
                                    value={selectedContinentId}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedContinentId(value);
                                        setSelectedCountry("null");
                                        setSelectedCountryId("");
                                        setSelectedCity("null");
                                        setSelectedCityId("");
                                        setSelectedContinent(continents.find(c => c.id === Number(value)).name);
                                    }}
                                >
                                    <option value="" disabled>
                                        Choisissez un continent
                                    </option>
                                    {continents?.map((continent) => (
                                        <option key={continent.id} value={continent.id}>
                                            {continent.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Select Pays */}
                            {selectedContinentId && (
                                <div className="glass-block p-2 rounded">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <MapPin size={16} className="text-success" />
                                        <span style={{ color: "#222" }}>Pays</span>
                                    </div>
                                    <select
                                        className="form-select"
                                        value={selectedCountryId}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedCountryId(value);
                                            setSelectedCountry(country.find(c => c.id === Number(value)).name);
                                            setSelectedCity("null");
                                            setSelectedCityId("");
                                        }}
                                    >
                                        <option value="" disabled>
                                            Choisissez un pays
                                        </option>
                                        {country
                                            ?.filter((c) => Math.floor(c.id / 10) === Number(selectedContinentId))
                                            .map((pays) => (
                                                <option key={pays.id} value={pays.id}>
                                                    {pays.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}

                            {/* Select Ville */}
                            {selectedCountryId && (
                                <div className="glass-block p-2 rounded">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Building size={16} className="text-info" />
                                        <span style={{ color: "#222" }}>Ville</span>
                                    </div>
                                    <select
                                        className="form-select"
                                        value={selectedCityId}
                                        onChange={(e) => {
                                            setSelectedCityId(e.target.value);
                                            setSelectedCity(city.find(c => c.id === Number(e.target.value)).name);
                                        }}
                                    >
                                        <option value="" disabled>
                                            Choisissez une ville
                                        </option>
                                        {city
                                            ?.filter((v) => Math.floor(v.id / 10) === Number(selectedCountryId))
                                            .map((ville) => (
                                                <option key={ville.id} value={ville.id}>
                                                    {ville.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                            <div className="glass-block price-slider p-4 rounded mb-4" style={{ width: "300px" }}>
                                <label className="form-label mb-2">Budget ( {selectedMinPrice} € - {selectedMaxPrice} €)</label>

                                <ReactSlider
                                    className="glass-range"
                                    thumbClassName="glass-thumb"
                                    trackClassName="track"
                                    renderTrack={(props, state) => {
                                        let { key, style: propsStyle, ...restProps } = props;

                                        let style = {
                                            height: '6px',
                                            borderRadius: '3px',
                                        };

                                        if (state.index === 1) {
                                            // la sélection entre les deux curseurs
                                            style.backgroundColor = '#007bff'; // bleu foncé par exemple
                                        } else {
                                            // rails gauche et droite
                                            style.backgroundColor = '#d0d0d0'; // gris clair
                                        }

                                        return <div key={key} style={{ ...propsStyle, ...style }} {...restProps} />;
                                    }}
                                    min={0}
                                    max={39999}
                                    step={500}
                                    value={[selectedMinPrice, selectedMaxPrice]}
                                    onChange={([min, max]) => {
                                        setSelectedMinPrice(min);
                                        setSelectedMaxPrice(max);
                                    }}
                                    withTracks
                                    pearling
                                    minDistance={1000}
                                />

                                <div className="d-flex justify-content-between mt-2">
                                    <span style={{ fontSize: "0.85rem" }}>{selectedMinPrice} €</span>
                                    <span style={{ fontSize: "0.85rem" }}>{selectedMaxPrice} €</span>
                                </div>
                            </div>
                            
                            <div className="glass-block price-slider p-4 rounded mb-4" style={{ width: "300px" }}>
                                <label className="form-label mb-2">Durée ( {minimumDuration} - {maximumDuration} jours)</label>

                                <ReactSlider
                                    className="glass-range"
                                    thumbClassName="glass-thumb"
                                    trackClassName="track"
                                    renderTrack={(props, state) => {
                                        let { key, style: propsStyle, ...restProps } = props;

                                        let style = {
                                            height: '6px',
                                            borderRadius: '3px',
                                        };

                                        if (state.index === 1) {
                                            // la sélection entre les deux curseurs
                                            style.backgroundColor = '#007bff'; // bleu foncé par exemple
                                        } else {
                                            // rails gauche et droite
                                            style.backgroundColor = '#d0d0d0'; // gris clair
                                        }

                                        return <div key={key} style={{ ...propsStyle, ...style }} {...restProps} />;
                                    }}
                                    min={1}
                                    max={40}
                                    step={2}
                                    value={[minimumDuration, maximumDuration]}
                                    onChange={([min, max]) => {
                                        setMinimumDuration(min);
                                        setMaximumDuration(max);
                                    }}
                                    withTracks
                                    pearling
                                    minDistance={3}
                                />

                                <div className="d-flex justify-content-between mt-2">
                                    <span style={{ fontSize: "0.85rem" }}>{minimumDuration} jours</span>
                                    <span style={{ fontSize: "0.85rem" }}>{maximumDuration} jours</span>
                                </div>
                            </div>
                            
                            {/* DROPDOWN D'OPTIONS DÉPLACÉ ICI */}
                            <div className="glass-block p-3 rounded mb-4" style={{ width: "300px" }}>
                                <button
                                    className="glass-btn-warning glass-border-radius-lg w-100 d-flex justify-content-between align-items-center py-3 border-0"
                                    type="button"
                                    onClick={handleShowAllOptions}
                                    disabled={optionsLoading}
                                    style={{
                                        background: 'rgba(255, 193, 7, 0.2)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 193, 7, 0.3)',
                                        color: '#212529'
                                    }}
                                >
                                    <span className="d-flex align-items-center gap-2">
                                        {optionsLoading ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm" role="status"></div>
                                                Chargement...
                                            </>
                                        ) : (
                                            <>
                                                <Settings size={18} />
                                                Options
                                                {options && options.length > 0 && (
                                                    <span className="glass-badge ms-2">{options.length}</span>
                                                )}
                                                {optionsPreselected.length > 0 && (
                                                    <span className="badge bg-success ms-2">{optionsPreselected.length}</span>
                                                )}
                                            </>
                                        )}
                                    </span>
                                    {!optionsLoading && (
                                        showAllOptions ? <ChevronDown size={18} /> : <ChevronRight size={18} />
                                    )}
                                </button>
                                
                                {showAllOptions && (
                                    <div className="glass-options-dropdown glass-border-radius-lg mt-3 p-3" style={{ 
                                        maxHeight: '400px', 
                                        overflowY: 'auto',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}>
                                        {!options || options.length === 0 ? (
                                            <div className="text-center py-4">
                                                <div className="text-muted">
                                                    <Package size={48} className="mb-3 opacity-50" />
                                                    <p className="mb-1 glass-text-dark-green">Aucune option disponible</p>
                                                    <small className="text-muted">Les options se chargeront automatiquement</small>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="glass-text-dark-green mb-0 d-flex align-items-center gap-2">
                                                        <Settings size={16} />
                                                        {options.length} options disponibles
                                                    </h6>
                                                    {optionsPreselected.length > 0 && (
                                                        <button
                                                            onClick={resetAllOptions}
                                                            className="btn btn-sm d-flex align-items-center gap-1"
                                                            style={{
                                                                background: 'rgba(220, 53, 69, 0.2)',
                                                                backdropFilter: 'blur(5px)',
                                                                WebkitBackdropFilter: 'blur(5px)',
                                                                border: '1px solid rgba(220, 53, 69, 0.3)',
                                                                color: '#dc3545',
                                                                borderRadius: '20px',
                                                                fontSize: '0.8rem'
                                                            }}
                                                        >
                                                            <RotateCcw size={14} />
                                                            Reset ({optionsPreselected.length})
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                {options && Array.isArray(options) && Object.entries(groupOptionsByCategory(options)).map(([category, categoryOptions]) => (
                                                    <div key={category} className="mb-3">
                                                        <button
                                                            onClick={() => toggleCategoryExpansion(category)}
                                                            className="w-100 d-flex align-items-center justify-content-between p-3 border-0"
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.1)',
                                                                backdropFilter: 'blur(5px)',
                                                                WebkitBackdropFilter: 'blur(5px)',
                                                                borderRadius: '10px',
                                                                color: '#212529'
                                                            }}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span style={{ fontSize: '1.2rem' }}>{getCategoryIcon(category)}</span>
                                                                <span className="fw-medium glass-text-dark-green">
                                                                    {formatCategoryName(category)}
                                                                </span>
                                                                <span className="glass-badge ms-2">{categoryOptions.length}</span>
                                                            </div>
                                                            {expandedCategories[category] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                        </button>
                                                        
                                                        {expandedCategories[category] && (
                                                            <div className="ms-3 mt-2">
                                                                {categoryOptions.map((option) => {
                                                                    const optionValue = `${option.category}-${option.optionId}`;
                                                                    const isSelected = optionsPreselected.includes(optionValue);
                                                                    
                                                                    return (
                                                                        <div
                                                                            key={option.optionId}
                                                                            className={`d-flex align-items-center justify-content-between p-2 mb-2 cursor-pointer ${isSelected ? 'selected' : ''}`}
                                                                            onClick={() => handleOptionToggle(option)}
                                                                            style={{
                                                                                background: isSelected 
                                                                                    ? 'rgba(40, 167, 69, 0.2)' 
                                                                                    : 'rgba(255, 255, 255, 0.05)',
                                                                                backdropFilter: 'blur(5px)',
                                                                                WebkitBackdropFilter: 'blur(5px)',
                                                                                borderRadius: '8px',
                                                                                border: isSelected 
                                                                                    ? '1px solid rgba(40, 167, 69, 0.4)' 
                                                                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.2s ease'
                                                                            }}
                                                                        >
                                                                            <div className="d-flex align-items-center gap-2">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={isSelected}
                                                                                    onChange={() => handleOptionToggle(option)}
                                                                                    className="form-check-input"
                                                                                />
                                                                                <div>
                                                                                    <small className="text-muted fw-medium">{option.desc}</small>
                                                                                </div>
                                                                            </div>
                                                                            <span className="glass-badge-price">+{option.prix}€</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center gap-3 mb-4">
                            <button type="submit" className="btn btn-primary">Rechercher</button>
                        </div>
                    </div>
                </form>

            </div>
            {trips.length > 0 &&
                <>
                    <div className="container" style={{ paddingTop: '20px' }}>
                        <h1 className="glass-text-dark-green" style={{ marginTop: '20px' }}>
                            <br />
                            ✈️ Résultat de Recherche
                        </h1>
                        {trips.length === 0 ? (
                            <p>Aucun voyage trouvé.</p>
                        ) : (
                            trips.map((tripData) => (
                                <div key={tripData.id} className="trip-card">
                                    <h2>{formatDestination(tripData?.destinationCity, tripData?.destinationCountry)}</h2>

                                    {/* WRAPPER GLASSMORPHISM CARD */}
                                    <div className="glass-card p-4 mb-4" style={{
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(25px)',
                                        WebkitBackdropFilter: 'blur(25px)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                                        borderRadius: '20px'
                                    }}>
                                        {/* LAYOUT PHOTO ET DESCRIPTION */}
                                        <div className="row mb-4">
                                            {/* CAROUSEL PRINCIPAL */}
                                            <div className="col-lg-8">
                                                <div id="carouselDestination" className="carousel slide h-100 glass-card overflow-hidden" data-bs-ride="carousel" style={{
                                                    background: 'rgba(255, 255, 255, 0.08)',
                                                    backdropFilter: 'blur(10px)',
                                                    WebkitBackdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                                                }}>
                                                    {/* ...existing carousel code... */}
                                                    <div className="carousel-indicators">
                                                        <button type="button" data-bs-target="#carouselDestination" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                        <button type="button" data-bs-target="#carouselDestination" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                        <button type="button" data-bs-target="#carouselDestination" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                        <button type="button" data-bs-target="#carouselDestination" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                                        <button type="button" data-bs-target="#carouselDestination" data-bs-slide-to="4" aria-label="Slide 5"></button>
                                                        <button type="button" data-bs-target="#carouselDestination" data-bs-slide-to="5" aria-label="Slide 6"></button>
                                                    </div>
                                                    <div className="carousel-inner h-100">
                                                        <div className="carousel-item active">
                                                            <img
                                                                src="https://picsum.photos/800/500?random=1"
                                                                className="d-block w-100"
                                                                alt="Vue panoramique de la destination"
                                                                style={{ objectFit: 'cover', height: '500px' }}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block glass-card p-3">
                                                                <h5 className="glass-text-white">Découvrez votre destination</h5>
                                                                <p className="text-white-50">Des paysages à couper le souffle vous attendent</p>
                                                            </div>
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img
                                                                src="https://picsum.photos/800/500?random=2"
                                                                className="d-block w-100"
                                                                alt="Paysages et monuments locaux"
                                                                style={{ objectFit: 'cover', height: '500px' }}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block glass-card p-3">
                                                                <h5 className="glass-text-white">Patrimoine exceptionnel</h5>
                                                                <p className="text-white-50">Une richesse culturelle unique à explorer</p>
                                                            </div>
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img
                                                                src="https://picsum.photos/800/500?random=3"
                                                                className="d-block w-100"
                                                                alt="Expériences et activités locales"
                                                                style={{ objectFit: 'cover', height: '500px' }}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block glass-card p-3">
                                                                <h5 className="glass-text-white">Expériences authentiques</h5>
                                                                <p className="text-white-50">Vivez des moments inoubliables</p>
                                                            </div>
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img
                                                                src="https://picsum.photos/800/500?random=4"
                                                                className="d-block w-100"
                                                                alt="Hébergement et confort"
                                                                style={{ objectFit: 'cover', height: '500px' }}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block glass-card p-3">
                                                                <h5 className="glass-text-white">Hébergement de qualité</h5>
                                                                <p className="text-white-50">Confort et élégance pour votre séjour</p>
                                                            </div>
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img
                                                                src="https://picsum.photos/800/500?random=5"
                                                                className="d-block w-100"
                                                                alt="Gastronomie locale"
                                                                style={{ objectFit: 'cover', height: '500px' }}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block glass-card p-3">
                                                                <h5 className="glass-text-white">Gastronomie locale</h5>
                                                                <p className="text-white-50">Savourez les spécialités régionales</p>
                                                            </div>
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img
                                                                src="https://picsum.photos/800/500?random=6"
                                                                className="d-block w-100"
                                                                alt="Activités et loisirs"
                                                                style={{ objectFit: 'cover', height: '500px' }}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block glass-card p-3">
                                                                <h5 className="glass-text-white">Activités variées</h5>
                                                                <p className="text-white-50">Détente et aventure au programme</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselDestination" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Précédent</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselDestination" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Suivant</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* DESCRIPTION À DROITE DU CAROUSEL */}
                                            <div className="col-lg-4">
                                                <div className="glass-card p-4 h-100" style={{
                                                    background: 'rgba(255, 255, 255, 0.12)',
                                                    backdropFilter: 'blur(15px)',
                                                    WebkitBackdropFilter: 'blur(15px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
                                                }}>
                                                    <h4 className="glass-text-dark-green">Description</h4>
                                                    <p className="text-muted">{tripData?.description}</p>

                                                    <div className="mt-4">
                                                        <h5 className="glass-text-dark-green">Informations pratiques</h5>
                                                        <ul className="list-unstyled">
                                                            <li className="mb-2">
                                                                <strong className="glass-text-dark-green">Destination:</strong>
                                                                <span className="ms-2 text-muted">{formatDestination(tripData?.destinationCity, tripData?.destinationCountry)}</span>
                                                            </li>
                                                            <li className="mb-2">
                                                                <strong className="glass-text-dark-green">Continent:</strong>
                                                                <span className="ms-2 text-muted">{tripData?.destinationContinent?.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                                            </li>
                                                            <li className="mb-2">
                                                                <strong className="glass-text-dark-green">Durée minimum:</strong>
                                                                <span className="ms-2 text-muted">{tripData?.minimumDuration} jour{tripData?.minimumDuration > 1 ? 's' : ''}</span>
                                                            </li>
                                                            <li className="mb-2">
                                                                <strong className="glass-text-dark-green">Prix de base:</strong>
                                                                <span className="ms-2 glass-badge-price">{tripData?.formattedPrice}</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    {/* Bouton pour voir la fiche voyage */}
                                                    <div className="mt-4 d-flex justify-content-center">
                                                        <button
                                                            className="btn btn-success px-4 py-2 fw-bold"
                                                            onClick={() => navigate(`/trip/${tripData.id}`)}
                                                            style={{
                                                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                                                border: 'none',
                                                                borderRadius: '25px',
                                                                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.target.style.transform = 'translateY(-2px)';
                                                                e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.transform = 'translateY(0)';
                                                                e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
                                                            }}
                                                        >
                                                            ✈️ Voir le voyage
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CONTENU PRINCIPAL - Cette section peut être supprimée ou utilisée pour d'autres contenus */}
                                    </div>
                                    {/* FIN WRAPPER GLASSMORPHISM CARD */}
                                </div>
                            ))
                        )}
                    </div>
                    <br /><br /><br /><br />

                </>
            }
        </>
    )
}

export default Search;