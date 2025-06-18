import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Package } from 'lucide-react';
import CacheService from '../services/CacheService';


const Search = () => {
    const location = useLocation();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(location.search);
    const [selectedContinent, setSelectedContinent] = useState(params.get("continent") || "null");
    const [selectedCountry, setSelectedCountry] = useState(params.get("country") || "null");
    const [selectedCity, setSelectedCity] = useState(params.get("city") || "null");
    const [selectedMinPrice, setSelectedMinPrice] = useState(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(9999999);
    const [selectedOpt1, setSelectedOpt1] = useState(0);
    const [selectedOpt2, setSelectedOpt2] = useState(0);
    const [selectedOpt3, setSelectedOpt3] = useState(0);
    const [minimumDuration, setMinimumDuration] = useState(0);
    const [maximumDuration, setMaximumDuration] = useState(9999);


    const [price, setPrice] = useState(2500);
    const [continents, setContinents] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [options, setOptions] = useState();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchTripDetails = async () => {
        try {
            setLoading(true);
            

            const data = await CacheService.fetchWithCache(
                // `http://15.188.48.92:8080/travel/trips/filter/null/null/null/1/9999/1/2/3/1/9999999`,
                // `http://15.188.48.92:8080/travel/trips/filter/null/null/null/1/9999/1/2/3/1/9999999`,
                `http://13.39.150.189:8080/travel/trips/filter/${selectedContinent}/${selectedCountry}/${selectedCity}/${minimumDuration}/${maximumDuration}/${selectedOpt1}/${selectedOpt2}/${selectedOpt3}/${selectedMinPrice}/${selectedMaxPrice}`,
                `http://13.39.150.189:8080/travel/trips/filter/${selectedContinent}/${selectedCountry}/${selectedCity}/${minimumDuration}/${maximumDuration}/${selectedOpt1}/${selectedOpt2}/${selectedOpt3}/${selectedMinPrice}/${selectedMaxPrice}`,
                60
            );
            console.log("Data:", data);
            setTrips(data);
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

        fetchTripDetails();


    }, []);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        fetchTripDetails();

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
                <h1 className="text-center mb-4">Voyages</h1>

                {/* <!-- Carousel --> */}
                <form onSubmit={handleSubmit}>
                    <div id="demo" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="0"
                                className="active" title="Slide 1"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"
                                title="Slide 2"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"
                                title="Slide 3"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="3"
                                title="Slide 4"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="4"
                                title="Slide 5"></button>
                        </div>

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="../assets/images/asie.jpg" alt="Asie"
                                    className="carousel-image"></img>
                            </div>
                            <div className="carousel-item">
                                <img src="../assets/images/AmeriqueN.jpg" alt="Amerique du Nord"
                                    className="carousel-image"></img>
                            </div>
                            <div className="carousel-item">
                                <img src="../assets/images/AmeriqueS.jpg" alt="Amerique du Sud"
                                    className="carousel-image"></img>
                            </div>
                            <div className="carousel-item">
                                <img src="../assets/images/Europe.jpg" alt="Europe"
                                    className="carousel-image"></img>
                            </div>
                            <div className="carousel-item">
                                <img src="../assets/images/Oceanie.jpg" alt="Oceanie"
                                    className="carousel-image"></img>
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button"
                            data-bs-target="#demo" data-bs-slide="prev" title="Previous Slide">
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button"
                            data-bs-target="#demo" data-bs-slide="next" title="Next Slide">
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>

                    <h2 className="text-center mb-4">Choisissez votre continent et votre
                        pays de destination</h2>

                    <div>
                        {/* Select Continent */}
                        <select
                            value={selectedContinent}
                            onChange={(e) => {
                                setSelectedContinent(e.target.value);
                                setSelectedCountry(""); // reset pays & ville si continent change
                                setSelectedCity("");
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

                        {/* Select Pays, filtré selon continent */}
                        {selectedContinent && (
                            <select
                                value={selectedCountry}
                                onChange={(e) => {
                                    setSelectedCountry(e.target.value);
                                    setSelectedCity(""); // reset ville si pays change
                                }}
                            >
                                <option value="" disabled>
                                    Choisissez un pays
                                </option>
                                {country
                                    ?.filter((c) => Math.floor(c.id / 10) === Number(selectedContinent))
                                    .map((pays) => (
                                        <option key={pays.id} value={pays.id}>
                                            {pays.name}
                                        </option>
                                    ))}
                            </select>
                        )}

                        {/* Select Ville, filtrée selon pays */}
                        {selectedCountry && (
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="" disabled>
                                    Choisissez une ville
                                </option>
                                {city
                                    ?.filter((v) => Math.floor(v.id / 10) === Number(selectedCountry))
                                    .map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.name}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </div>
                    <h2 className="text-center mb-4">Choisissez votre budget pour votre
                        voyage</h2>
                    <div className="price-slider d-flex justify-content-center align-items-center gap-3">
                        <label htmlFor="prix" className="form-label mb-0">
                            Prix maximum :
                        </label>
                        <input
                            type="range"
                            id="prix"
                            name="prix"
                            min="500"
                            max="5000"
                            value={price}
                            step="100"
                            className="form-range"
                            style={{ width: "200px" }}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <output name="outputPrix" id="outputPrix">
                            {price} €
                        </output>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Rechercher</button>
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