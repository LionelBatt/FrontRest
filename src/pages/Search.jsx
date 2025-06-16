import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Search = () => {
    const location = useLocation();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(location.search);
    const [selectedContinent, setSelectedContinent] = useState(params.get("continent"));
    const [selectedCountry, setSelectedCountry] = useState(params.get("country"));
    const [selectedCity, setSelectedCity] = useState(params.get("city"));
    const [selectedMinPrice, setSelectedMinPrice] = useState(params.get("minprice"));
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(params.get("maxprice"));
    const [selectedOpt1, setSelectedOpt1] = useState(params.get("opt1"));
    const [selectedOpt2, setSelectedOpt2] = useState(params.get("opt2"));
    const [selectedOpt3, setSelectedOpt3] = useState(params.get("opt3"));
    const [minimumDuration, setMinimumDuration] = useState(params.get("mindur"));
    const [maximumDuration, setMaximumDuration] = useState(params.get("maxdur"));


    const [price, setPrice] = useState(2500);
    const [continents, setContinents] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [options, setOptions] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/travel/destination/continents", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setContinents(data))
            .catch(err => console.error("Erreur de chargement des continents", err));
        fetch("http://localhost:8080/travel/destination/countries", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
        fetch("http://localhost:8080/travel/destination/cities", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setCity(data))
            .catch(err => console.error("Erreur de chargement des villes", err));

        handleSubmit();


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let apiUrl = `http://localhost:8080/travel/search/`;

        if (selectedContinent) apiUrl += `${selectedContinent}/`;
        if (selectedCountry) apiUrl += `${selectedCountry}/`;
        if (selectedCity) apiUrl += `${selectedCity}/`;
        if (minimumDuration) apiUrl += `${minimumDuration}/`;
        if (maximumDuration) apiUrl += `${maximumDuration}/`;
        if (selectedOpt1) apiUrl += `${selectedOpt1}/`;
        if (selectedOpt2) apiUrl += `${selectedOpt2}/`;
        if (selectedOpt3) apiUrl += `${selectedOpt3}/`;
        if (selectedMinPrice) apiUrl += `${selectedMinPrice}/`;
        if (selectedMaxPrice) apiUrl += `${selectedMaxPrice}/`;

        // Enlève le dernier /
        apiUrl = apiUrl.slice(0, -1);

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setTrips(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    if (loading) return <p>Chargement...</p>;
    if (!trips.length) return <p>Aucun résultat trouvé.</p>;
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

                    {/* <ul className="dropdown-menu dropdown-menu-center">
                    <li><h6 className="dropdown-header">Continents</h6></li>
                    {continents?.map((continent) => (
                        <li key={continent.id}>
                            <a
                                className="dropdown-item"
                                href="#"
                                data-bs-toggle="collapse"
                                data-bs-target={`#continent-${continent.id}`}
                            >
                                {continent.name}
                            </a>
                        </li>
                    ))}
                </ul> */}

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


            <div class="container">
                <h1 class="text-center mb-5 text-primary">Résultat de Recherche</h1>

                <ul>
                    {trips.map(trip => (
                        <li key={trip.id}>{trip.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Search;