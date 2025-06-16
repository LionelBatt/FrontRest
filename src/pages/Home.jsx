import SearchBar from '../components/SearchBar';

function Home() {
    return (
        <>
            <div id="myCarousel" className="carousel slide position-relative" data-bs-ride="carousel">
                <SearchBar />
                
                {/* Indicateurs du carousel */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                
                {/* Contenu du carousel */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../assets/images/pexels-lkloeppel-466685.jpg" className="d-block w-100" alt="Photo 1" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>New-York 🗽</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p><a className="btn btn-lg btn-primary" href="#">Réserver</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="../assets/images/pexels-pixabay-248195.jpg" className="d-block w-100" alt="Photo 2" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Tokyo 🌆</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p><a className="btn btn-lg btn-primary" href="fiche-Tokyo.html">Réserver</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="../assets/images/20160828_164425.jpg" className="d-block w-100" alt="Photo 3" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Paris 🗼</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p><a className="btn btn-lg btn-primary" href="#">Réserver</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Contrôles du carousel */}
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Précédent</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Suivant</span>
                </button>
            </div>
            
            {/* Section "Qui sommes nous" */}
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Qui sommes nous</h1>
                    <p className="col-md-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales. Nulla egestas orci et nibh pulvinar vehicula. Fusce volutpat mi ac sem maximus vehicula. In aliquam egestas ex, at malesuada nulla vehicula quis. Etiam consectetur metus nisi, sit amet pharetra nibh laoreet ut. Sed cursus eros molestie metus vulputate, et porta turpis viverra. Vivamus nec vehicula arcu.
                        Donec ut nisl id orci auctor aliquet quis non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat diam at rutrum luctus. Vivamus sapien augue, tempor ut imperdiet sed, congue in felis. Sed ex lorem, aliquet eu condimentum non, fermentum et erat. Duis convallis orci ut dignissim sollicitudin. Fusce vel tempus arcu, pharetra volutpat nisl.
                    </p>
                </div>
            </div>
            
            {/* Section Lorem ipsum */}
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <div className="d-flex justify-content-end">
                        <h1 className="display-5 fw-bold">Lorem ipsum</h1>
                    </div>
                    <p className="text-end">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales. Nulla egestas orci et nibh pulvinar vehicula. Fusce volutpat mi ac sem maximus vehicula. In aliquam egestas ex, at malesuada nulla vehicula quis. Etiam consectetur metus nisi, sit amet pharetra nibh laoreet ut. Sed cursus eros molestie metus vulputate, et porta turpis viverra. Vivamus nec vehicula arcu.
                        Donec ut nisl id orci auctor aliquet quis non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat diam at rutrum luctus. Vivamus sapien augue, tempor ut imperdiet sed, congue in felis. Sed ex lorem, aliquet eu condimentum non, fermentum et erat. Duis convallis orci ut dignissim sollicitudin. Fusce vel tempus arcu, pharetra volutpat nisl.
                    </p>
                </div>
            </div>
            
            {/* Section témoignages */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" className="rounded-circle img-fluid" alt="Photo de profil" />
                        <h2 className="mt-3">Jean Dupont</h2>
                        <p>"Ce service est incroyable ! Je le recommande vivement à tous ceux qui cherchent une solution fiable et efficace."</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" className="rounded-circle img-fluid" alt="Photo de profil" />
                        <h2 className="mt-3">Marie Martin</h2>
                        <p>"J'ai été très satisfaite de l'expérience. Le support client est excellent et les résultats sont au rendez-vous."</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" className="rounded-circle img-fluid" alt="Photo de profil" />
                        <h2 className="mt-3">Paul Durand</h2>
                        <p>"Un service rapide et efficace. Je n'hésiterai pas à l'utiliser à nouveau pour mes futurs projets."</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
