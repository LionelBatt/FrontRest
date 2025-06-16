import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { useState } from "react";

const continents = [
    { name: 'Asie', id: 'asie' },
    { name: 'Europe', id: 'europe' },
    { name: 'Amérique du Nord', id: 'amerique-nord' },
    { name: 'Amérique du Sud', id: 'amerique-sud' },
    { name: 'Afrique', id: 'afrique' },
    { name: 'Océanie', id: 'oceanie' }
];

function Search() {
    const [price, setPrice] = useState(2500);
    return (
        <div className="container">
            <h1 className="text-center mb-4">Voyages</h1>

            {/* <!-- Carousel --> */}
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

            {/* <!-- Menu déroulant principal centré --> */}
            <div className="d-flex justify-content-center continent-dropdown">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Sélectionnez un continent</button>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Continents
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Header>Continents</Dropdown.Header>
                            <Dropdown.Item href="#asie">Asie</Dropdown.Item>
                            <Dropdown.Item href="#europe">Europe</Dropdown.Item>
                            <Dropdown.Item href="#amerique-nord">Amérique du Nord</Dropdown.Item>
                            <Dropdown.Item href="#amerique-sud">Amérique du Sud</Dropdown.Item>
                            <Dropdown.Item href="#afrique">Afrique</Dropdown.Item>
                            <Dropdown.Item href="#oceanie">Océanie</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {/* <!-- Conteneur pour les menus déroulants de destinations --> */}
            <div className="destination-selector">
                <div id="asie" className="collapse">
                    <select className="form-select" title="Sélectionnez une destination">
                        <option selected disabled>Destinations en Asie</option>
                        <option>Japon</option>
                        <option>Chine</option>
                        <option>Thaïlande</option>
                        <option>Vietnam</option>
                    </select>
                </div>

                <div id="europe" className="collapse">
                    <select className="form-select"
                        title="Sélectionnez une destination en Amérique du Sud">
                        <option selected disabled>Destinations en Europe</option>
                        <option>France</option>
                        <option>Italie</option>
                        <option>Espagne</option>
                        <option>Allemagne</option>
                    </select>
                </div>

                <div id="amerique-nord" className="collapse">
                    <select className="form-select"
                        title="Sélectionnez une destination en Amérique du Sud">
                        <option selected disabled>Destinations en Amérique du Nord</option>
                        <option>États-Unis</option>
                        <option>Canada</option>
                        <option>Mexique</option>
                    </select>
                </div>
                <div id="amerique-sud" className="collapse">
                    <select className="form-select"
                        title="Sélectionnez une destination en Amérique du Sud">
                        <option selected disabled>Destinations en Amérique du Sud</option>
                        <option>Brésil</option>
                        <option>Argentine</option>
                        <option>Chili</option>
                    </select>
                </div>
                <div id="afrique" className="collapse">
                    <select className="form-select"
                        title="Sélectionnez une destination en Afrique">
                        <option selected disabled>Destinations en Afrique</option>
                        <option>Maroc</option>
                        <option>Égypte</option>
                        <option>Sénégal</option>
                    </select>
                </div>

                <div id="oceanie" className="collapse">
                    <select className="form-select"
                        title="Sélectionnez une destination en Océanie">
                        <option selected disabled>Destinations en Océanie</option>
                        <option>Australie</option>
                        <option>Nouvelle-Zélande</option>
                    </select>
                </div>
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
            <div className="text-center mt-4">
                <Link to="/villes" classNameName="btn btn-success btn-lg" role="button">
                    Recherche
                    des Villes
                </Link>
            </div>
        </div>
    )
}

export default Search