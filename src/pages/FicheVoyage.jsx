import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Package, Settings } from 'lucide-react';
import CacheService from '../services/CacheService';

const FicheVoyage = () => {
    const { id } = useParams();
    const [tripData, setTripData] = useState(null);
    const [allOptions, setAllOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showAllOptions, setShowAllOptions] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});

    // 🎯 Fonction pour attendre que Bootstrap soit chargé puis contrôler le carousel
    const goToSlide = (slideIndex) => {
        const waitForBootstrap = () => {
            if (window.bootstrap && window.bootstrap.Carousel) {
                try {
                    const carousel = document.querySelector('#carouselDestination');
                    if (carousel) {
                        const bsCarousel = window.bootstrap.Carousel.getOrCreateInstance(carousel);
                        bsCarousel.to(slideIndex);
                    }
                } catch (error) {
                    console.error('Erreur lors du contrôle du carousel:', error);
                }
            } else {
                // Retry après un court délai si Bootstrap n'est pas encore chargé
                setTimeout(waitForBootstrap, 100);
            }
        };
        
        waitForBootstrap();
    };

    // Charger les données du voyage avec le cache service
    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                setLoading(true);
                
                const data = await CacheService.fetchWithCache(
                    `trip_${id || 1}`,
                    `http://15.188.48.92:8080/travel/trips/${id || 1}`,
                    60
                );
                
                setTripData(data);
                setTotalPrice(data.unitPrice);
                
            } catch (err) {
                console.error('Erreur:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [id]);

    const fetchAllOptions = async () => {
        try {
            setOptionsLoading(true);
            
            const options = await CacheService.fetchWithCache(
                'all_travel_options',
                'http://15.188.48.92:8080/travel/options',
                15
            );

            const includedOptionIds = tripData?.packageOptions?.map(opt => opt.optionId) || [];
            const availableOptions = (options || []).filter(
                option => !includedOptionIds.includes(option.optionId)
            );
            
            setAllOptions(availableOptions);
            
        } catch (err) {
            console.error('Erreur lors du chargement des options:', err);
        } finally {
            setOptionsLoading(false);
        }
    };

    const handleShowAllOptions = () => {
        if (!showAllOptions && allOptions.length === 0) {
            fetchAllOptions();
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
        const isSelected = selectedOptions.find(opt => opt.optionId === option.optionId);
        
        if (isSelected) {
            const newOptions = selectedOptions.filter(opt => opt.optionId !== option.optionId);
            setSelectedOptions(newOptions);
            setTotalPrice(totalPrice - option.prix);
        } else {
            setSelectedOptions([...selectedOptions, option]);
            setTotalPrice(totalPrice + option.prix);
        }
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
        };
        return categories[category] || category;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'ACCOMMODATION': '🏨',
            'MEALS': '🍽️',
            'SERVICES': '🛎️',
            'WELLNESS': '🧘',
            'TRAVEL': '✈️',
            'PACKAGE': '📦',
            'LUXURY': '💎',
            'EVENT': '🎉',
            'TRANSPORT': '🚗',
        };
        return icons[category] || '⚙️';
    };

    const formatDestination = (city, country) => {
        const formatName = (name) => {
            return name?.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        };
        return `${formatName(city)}, ${formatName(country)}`;
    };

    const groupOptionsByCategory = (options) => {
        return options.reduce((groups, option) => {
            const category = option.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(option);
            return groups;
        }, {});
    };

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '50vh'}}>
                <div className="glass-card p-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                        <span className="glass-text-dark-green">Chargement de votre voyage...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="glass-card p-4 text-center">
                    <h4 className="glass-text-dark-green">Erreur</h4>
                    <p className="text-muted">{error}</p>
                </div>
            </div>
        );
    }

    const groupedAdditionalOptions = groupOptionsByCategory(allOptions);

    return (
    <>
        <div className="container" style={{ paddingTop: '20px' }}>
            <h1 className="glass-text-dark-green" style={{ marginTop: '20px' }}>
                <br />
                ✈️ Destination : {formatDestination(tripData?.destinationCity, tripData?.destinationCountry)}
            </h1>

            {/* WRAPPER GLASSMORPHISM CARD */}
            <div className="glass-card p-4 mb-4" style={{ 
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)', 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                borderRadius: '20px'
            }}>
                {/* LAYOUT PHOTO */}
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

                    {/* GRILLE DE MINIATURES */}
                    <div className="col-lg-4">
                        <div className="h-100">
                            <div className="row g-2 h-100">
                                <div className="col-6">
                                    <div className="position-relative h-100" style={{ minHeight: '120px' }}>
                                        <img 
                                            src="https://picsum.photos/300/240?random=7" 
                                            className="img-fluid w-100 h-100 glass-border-radius-lg shadow-sm"
                                            alt="Vue destination 1"
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            data-bs-target="#carouselDestination"
                                            data-bs-slide-to="0"
                                            onClick={() => goToSlide(0)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="position-relative h-100" style={{ minHeight: '120px' }}>
                                        <img 
                                            src="https://picsum.photos/300/240?random=8" 
                                            className="img-fluid w-100 h-100 glass-border-radius-lg shadow-sm"
                                            alt="Vue destination 2"
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            data-bs-target="#carouselDestination"
                                            data-bs-slide-to="1"
                                            onClick={() => goToSlide(1)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="position-relative h-100" style={{ minHeight: '120px' }}>
                                        <img 
                                            src="https://picsum.photos/300/240?random=9" 
                                            className="img-fluid w-100 h-100 glass-border-radius-lg shadow-sm"
                                            alt="Vue destination 3"
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            data-bs-target="#carouselDestination"
                                            data-bs-slide-to="2"
                                            onClick={() => goToSlide(2)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="position-relative h-100" style={{ minHeight: '120px' }}>
                                        <img 
                                            src="https://picsum.photos/300/240?random=10" 
                                            className="img-fluid w-100 h-100 glass-border-radius-lg shadow-sm"
                                            alt="Vue destination 4"
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            data-bs-target="#carouselDestination"
                                            data-bs-slide-to="3"
                                            onClick={() => goToSlide(3)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="position-relative h-100" style={{ minHeight: '120px' }}>
                                        <img 
                                            src="https://picsum.photos/300/240?random=11" 
                                            className="img-fluid w-100 h-100 glass-border-radius-lg shadow-sm"
                                            alt="Vue destination 5"
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            data-bs-target="#carouselDestination"
                                            data-bs-slide-to="4"
                                            onClick={() => goToSlide(4)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="position-relative h-100" style={{ minHeight: '120px' }}>
                                        <img 
                                            src="https://picsum.photos/300/240?random=12" 
                                            className="img-fluid w-100 h-100 glass-border-radius-lg shadow-sm"
                                            alt="Vue destination 6"
                                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                                            data-bs-target="#carouselDestination"
                                            data-bs-slide-to="5"
                                            onClick={() => goToSlide(5)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENU PRINCIPAL */}
                <div className="row">
                    <div className="col-md-8">
                        <div className="glass-card p-4 mb-4" style={{ 
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
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="glass-card p-4 sticky-top" style={{ 
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
                        }}>
                            <h5 className="glass-text-dark-green d-flex align-items-center gap-2">
                                <Package size={20} />
                                Récapitulatif de réservation
                            </h5>
                            
                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Prix de base:</span>
                                    <span className="glass-text-dark-green fw-medium">{tripData?.formattedPrice}</span>
                                </div>
                                
                                {tripData?.packageOptions && tripData.packageOptions.length > 0 && (
                                    <>
                                        <hr className="my-3" />
                                        <h6 className="glass-text-dark-green d-flex align-items-center gap-2">
                                            ✓ Options incluses
                                        </h6>
                                        {tripData.packageOptions.map((option) => (
                                            <div key={option.optionId} className="d-flex justify-content-between small text-muted mb-1">
                                                <span>• {option.desc}</span>
                                                <span className="glass-badge">Inclus</span>
                                            </div>
                                        ))}
                                    </>
                                )}
                                
                                {selectedOptions.length > 0 && (
                                    <>
                                        <hr className="my-3" />
                                        <h6 className="glass-text-dark-green">+ Options ajoutées:</h6>
                                        {selectedOptions.map((option) => (
                                            <div key={option.optionId} className="d-flex justify-content-between small mb-1">
                                                <span className="text-muted">• {option.desc}</span>
                                                <span className="glass-badge-price">+{option.prix}€</span>
                                            </div>
                                        ))}
                                    </>
                                )}
                                
                                <hr className="my-3" />
                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span className="glass-text-dark-green">Total:</span>
                                    <span className="glass-badge-price fs-5">{totalPrice}€</span>
                                </div>
                            </div>

                            {/* Bouton Options avec glassmorphism */}
                            <div className="mb-3">
                                <button
                                    className="glass-btn-warning glass-border-radius-lg w-100 d-flex justify-content-between align-items-center py-3 border-0"
                                    type="button"
                                    onClick={handleShowAllOptions}
                                    disabled={optionsLoading}
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
                                                Options supplémentaires
                                                {CacheService.get('all_travel_options') && (
                                                    <span className="glass-badge ms-2">{allOptions.length}</span>
                                                )}
                                            </>
                                        )}
                                    </span>
                                    {!optionsLoading && (
                                        showAllOptions ? <ChevronDown size={18} /> : <ChevronRight size={18} />
                                    )}
                                </button>
                                
                                {/* Dropdown avec glassmorphism */}
                                {showAllOptions && (
                                    <div className="glass-options-dropdown glass-border-radius-lg mt-3 p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {allOptions.length === 0 ? (
                                            <div className="text-center py-4">
                                                <div className="text-muted">
                                                    <Package size={48} className="mb-3 opacity-50" />
                                                    <p className="mb-1 glass-text-dark-green">Aucune option supplémentaire disponible</p>
                                                    <small className="text-muted">Toutes les options sont déjà incluses !</small>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h6 className="glass-text-dark-green mb-3 d-flex align-items-center gap-2">
                                                    <Settings size={16} />
                                                    {allOptions.length} options disponibles
                                                </h6>
                                                
                                                {Object.entries(groupedAdditionalOptions).map(([category, options]) => (
                                                    <div key={category} className="mb-3">
                                                        <button
                                                            onClick={() => toggleCategoryExpansion(category)}
                                                            className="glass-category-btn glass-border-radius w-100 d-flex align-items-center justify-content-between p-3 border-0"
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span style={{ fontSize: '1.2rem' }}>{getCategoryIcon(category)}</span>
                                                                <span className="fw-medium glass-text-dark-green">
                                                                    {formatCategoryName(category)}
                                                                </span>
                                                                <span className="glass-badge ms-2">{options.length}</span>
                                                            </div>
                                                            {expandedCategories[category] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                        </button>
                                                        
                                                        {expandedCategories[category] && (
                                                            <div className="ms-3 mt-2">
                                                                {options.map((option) => {
                                                                    const isSelected = selectedOptions.some(opt => opt.optionId === option.optionId);
                                                                    
                                                                    return (
                                                                        <div key={option.optionId} className="mb-2">
                                                                            <div className={`glass-option-item glass-border-radius p-3 ${isSelected ? 'selected' : ''}`}>
                                                                                <div className="form-check">
                                                                                    <input
                                                                                        className="form-check-input glass-checkbox"
                                                                                        type="checkbox"
                                                                                        id={`option-${option.optionId}`}
                                                                                        onChange={() => handleOptionToggle(option)}
                                                                                        checked={isSelected}
                                                                                    />
                                                                                    <label className="form-check-label w-100" htmlFor={`option-${option.optionId}`}>
                                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                            <span className="fw-medium glass-text-dark-green">{option.desc}</span>
                                                                                            <span className="glass-badge-price">+{option.prix}€</span>
                                                                                        </div>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
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
                            
                            <button className="glass-btn-primary glass-border-radius-lg w-100 py-3 border-0 d-flex align-items-center justify-content-center gap-2">
                                <Package size={18} />
                                Réserver maintenant - {totalPrice}€
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* FIN WRAPPER GLASSMORPHISM CARD */}
        </div>
        <br /><br /><br /><br />
    </>
    );
};

export default FicheVoyage;