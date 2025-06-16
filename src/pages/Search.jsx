import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const continents = [
    { name: 'Asie', id: 'asie' },
    { name: 'Europe', id: 'europe' },
    { name: 'Amérique du Nord', id: 'amerique-nord' },
    { name: 'Amérique du Sud', id: 'amerique-sud' },
    { name: 'Afrique', id: 'afrique' },
    { name: 'Océanie', id: 'oceanie' }
];

const Search = () => {
    const [selectedContinent, setSelectedContinent] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedMinPrice, setSelectedMinPrice] = useState();
    const [selectedMaxPrice, setSelectedMaxPrice] = useState();
    const [selectedOpt1, setSelectedOpt1] = useState("");
    const [selectedOpt2, setSelectedOpt2] = useState("");
    const [selectedOpt3, setSelectedOpt3] = useState("");


    const [price, setPrice] = useState(2500);
    const [continents, setContinents] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [options, setOptions] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8080/travel/destination/continents")
            .then(res => res.json())
            .then(data => setContinents(data))
            .catch(err => console.error("Erreur de chargement des continents", err));
        fetch("http://localhost:8080/travel/destination/countries")
            .then(res => res.json())
            .then(data => setCountry(data))
            .catch(err => console.error("Erreur de chargement des pays", err));
        fetch("http://localhost:8080/travel/destination/cities")
            .then(res => res.json())
            .then(data => setCity(data))
            .catch(err => console.error("Erreur de chargement des villes", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (selectedContinent) params.append("continent", selectedContinent);
        if (selectedCountry) params.append("country", selectedCountry);
        if (selectedCity) params.append("city", selectedCity);
        if (selectedMinPrice) params.append("minprice", selectedMinPrice);
        if (selectedMaxPrice) params.append("maxprice", selectedMaxPrice);
        if (selectedOpt1) params.append("opt1", selectedOpt1);
        if (selectedOpt2) params.append("opt2", selectedOpt2);
        if (selectedOpt3) params.append("opt3", selectedOpt3);

        navigate(`/searchresult?${params.toString()}`);
    };
    return (
        <div className="container">
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
                                ?.filter((c) => Math.floor(c.id / 100) === Number(selectedContinent))
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
                <button type="submit" class="btn btn-primary">Rechercher</button>
            </form>
        </div>
    )
}

export default Search;