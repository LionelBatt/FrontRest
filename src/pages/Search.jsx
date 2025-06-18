import { useEffect, useState, useMemo  } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MapPin, Globe, Building } from 'lucide-react';
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
    const [selectedOpts, setSelectedOpts] = useState("-1");
    const [minimumDuration, setMinimumDuration] = useState(1);
    const [maximumDuration, setMaximumDuration] = useState(40);


    const [price, setPrice] = useState(2500);
    const [continents, setContinents] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [optionsPreselected, setOptionsPreselected] = useState([]);
    const [options, setOptions] = useState();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchTripDetails = async () => {
        try {
            setLoading(true);
            const data = await CacheService.fetchWithCache(
                `http://13.39.150.189:8080/travel/trips/filter/${selectedContinent}/${selectedCountry}/${selectedCity}/${minimumDuration}/${maximumDuration}/${selectedOpts}/${selectedMinPrice}/${selectedMaxPrice}`,
                `http://13.39.150.189:8080/travel/trips/filter/${selectedContinent}/${selectedCountry}/${selectedCity}/${minimumDuration}/${maximumDuration}/${selectedOpts}/${selectedMinPrice}/${selectedMaxPrice}`,
                60
            );


            setTrips(data);
            setMessage(data.message || "");

        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchOptions = async () => {
        try {
            setLoading(true);
            const data = await CacheService.fetchWithCache(
                `http://13.39.150.189:8080/travel/options`,
                `http://13.39.150.189:8080/travel/options`,
                60
            );


            setOptions(data);
            setMessage(data.message || "");

        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
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
                console.log("Pays reçus :", data); // <-- Ajoute ceci
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


    }, []);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        console.log(optionsPreselected);
        if (optionsPreselected.length) {
            const concatenatedIds = optionsPreselected.join(',');
            setSelectedOpts(concatenatedIds);
        }

        fetchTripDetails();

    };

    const formatDestination = (city, country) => {
        const formatName = (name) => {
            return name?.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        };
        return `${formatName(city)}, ${formatName(country)}`;
    };

    // A PASSER EN BACK => findDistinctCategory
    const groupedOptions = useMemo(() => {
        const groups = {};
        options?.forEach((opt) => {
            if (!groups[opt.category]) {
                groups[opt.category] = [];
            }
            groups[opt.category].push(opt);
        });
        return groups;
    }, [options]);

    const handleOptionChange = (e, category) => {
        const selected = Array.from(e.target.optionsPreselected).map((opt) => parseInt(opt.value));
        setOptionsPreselected((prev) => {
            // Supprimer les anciennes options de cette catégorie
            const filtered = prev.filter((id) => {
                const option = options.find((o) => o.optionid === id);
                return option?.category !== category;
            });
            return [...filtered, ...selected];
        });
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
                                        setSelectedCity("null");
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
                        <div className="d-flex justify-content-center gap-3 mb-4">
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
                        </div>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {Object.entries(groupedOptions).map(([category, opts]) => (
                                <div key={category} className="glass-block p-3 rounded">
                                    <label className="form-label fw-bold mb-2">{category}</label>
                                    <select
                                        multiple
                                        className="form-select"
                                        onChange={(e) => handleOptionChange(e, category)}
                                        value={optionsPreselected.filter((id) =>
                                            opts.some((o) => o.optionid === id)
                                        )}
                                        style={{ minWidth: '200px', height: '150px' }}
                                    >
                                        {opts.map((opt) => (
                                            <option key={opt.optionid} value={opt.optionid}>
                                                {opt.desc} ({opt.prix} €)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
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


                                        </div>
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