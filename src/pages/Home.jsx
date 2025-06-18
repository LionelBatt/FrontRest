import SearchBar from "../components/SearchBar";
import { useNavigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate();

    
    const handleReservation = (tripId) => {
        navigate(`/trip/${tripId}`);
    };

    return (
        <>
        <div className="position-relative">
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../assets/images/pexels-lkloeppel-466685.jpg" className="d-block w-100" alt="Photo 1"></img>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>New-York 🗽</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p>
                                    <button 
                                        className="btn btn-lg btn-primary" 
                                        onClick={() => handleReservation(16)}
                                    >
                                        Réserver
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="../assets/images/pexels-pixabay-248195.jpg" className="d-block w-100" alt="Photo 2"></img>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Tokyo 🌆</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p>
                                    <button 
                                        className="btn btn-lg btn-primary" 
                                        onClick={() => handleReservation(9)}
                                    >
                                        Réserver
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item text-start">
                        <img src="../assets/images/20160828_164425.jpg" className="d-block w-100" alt="Photo 3"></img>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Paris🗼</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p>
                                    <button 
                                        className="btn btn-lg btn-primary" 
                                        onClick={() => handleReservation(1)}
                                    >
                                        Réserver
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Precedent</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Suivant</span>
                </button>
            </div>
            <div class="p-5 mb-4 bg-light rounded-3">
                <div class="container-fluid py-5">
                    <h1 class="display-5 fw-bold">Qui sommes nous</h1><br/>
                    <p class="col-md-8">
                        Nous sommes une agence de voyage premium spécialisée dans la création d'expériences uniques et personnalisées. Forte de plus de 15 ans d'expertise dans le secteur du tourisme de luxe, notre équipe de conseillers passionnés vous accompagne dans la réalisation de vos rêves d'évasion. De la planification minutieuse à l'exécution parfaite, nous mettons tout en œuvre pour transformer chaque voyage en une aventure mémorable et authentique.
                            </p>
                </div>
            </div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <div className="d-flex justify-content-end">
                        <h1 className="display-5 fw-bold">Nos Services</h1>
                    </div>
                    <p className="text-end">
                      Pour enrichir votre expérience, nous proposons une gamme complète de services premium : guide privé multilingue pour des découvertes culturelles approfondies, demi-pension avec petit-déjeuner et dîner dans les meilleurs établissements, assurance voyage premium pour voyager l'esprit tranquille, participation à des cérémonies traditionnelles locales, cours de cuisine locale avec des chefs renommés, séances de hammam traditionnel, package culturel et patrimoine avec accès privilégié aux sites historiques, tour en hélicoptère de 30 minutes pour des vues spectaculaires, service de limousine avec chauffeur privé, conciergerie 24h/24 pour répondre à tous vos besoins, et surclassement en classe affaires pour un confort optimal durant vos vols.
                         </p>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" className="rounded-circle img-fluid" alt="Avis client Jean Dupont"></img>
                        <h2 className="mt-3">Jean Dupont</h2>
                        <p>"Ce service est incroyable ! Je le recommande vivement à tous ceux qui cherchent une solution fiable et efficace."</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" className="rounded-circle img-fluid" alt="Avis client Marie Martin"></img>
                        <h2 className="mt-3">Marie Martin</h2>
                        <p>"J'ai été très satisfaite de l'expérience. Le support client est excellent et les résultats sont au rendez-vous."</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" className="rounded-circle img-fluid" alt="Avis client Paul Durand"></img>
                        <h2 className="mt-3">Paul Durand</h2>
                        <p>"Un service rapide et efficace. Je n'hésiterai pas à l'utiliser à nouveau pour mes futurs projets."</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home; 