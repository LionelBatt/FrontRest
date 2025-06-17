

function Home() {
    return (
        <>
        <div className="position-relative">
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../assets/images/pexels-lkloeppel-466685.jpg" class="d-block w-100" alt="Photo 1"></img>
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>New-York 🗽</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p><a class="btn btn-lg btn-primary" href="#">Réserver</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/images/pexels-pixabay-248195.jpg" class="d-block w-100" alt="Photo 2"></img>
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>Tokyo 🌆</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p><a class="btn btn-lg btn-primary" href="fiche-Tokyo.html">Réserver</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item text-start">
                        <img src="../assets/images/20160828_164425.jpg" class="d-block w-100" alt="Photo 3"></img>
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>Paris🗼</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales.</p>
                                <p><a class="btn btn-lg btn-primary" href="#">Réserver</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Precedent</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Suivant</span>
                </button>
            </div>
            <div class="p-5 mb-4 bg-light rounded-3">
                <div class="container-fluid py-5">
                    <h1 class="display-5 fw-bold">Qui sommes nous</h1>
                    <p class="col-md-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales. Nulla egestas orci et nibh pulvinar vehicula. Fusce volutpat mi ac sem maximus vehicula. In aliquam egestas ex, at malesuada nulla vehicula quis. Etiam consectetur metus nisi, sit amet pharetra nibh laoreet ut. Sed cursus eros molestie metus vulputate, et porta turpis viverra. Vivamus nec vehicula arcu.
                        Donec ut nisl id orci auctor aliquet quis non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat diam at rutrum luctus. Vivamus sapien augue, tempor ut imperdiet sed, congue in felis. Sed ex lorem, aliquet eu condimentum non, fermentum et erat. Duis convallis orci ut dignissim sollicitudin. Fusce vel tempus arcu, pharetra volutpat nisl. </p>
                </div>
            </div>
            <div class="p-5 mb-4 bg-light rounded-3">
                <div class="container-fluid py-5">
                    <div class="d-flex justify-content-end">
                        <h1 class="display-5 fw-bold">Lorem ipsum</h1>
                    </div>
                    <p class="text-end">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac velit tincidunt, euismod nisi dignissim, sodales tellus. Praesent tincidunt turpis non sem imperdiet, eget sollicitudin purus ultricies. Mauris id felis in nisi tincidunt sodales. Nulla egestas orci et nibh pulvinar vehicula. Fusce volutpat mi ac sem maximus vehicula. In aliquam egestas ex, at malesuada nulla vehicula quis. Etiam consectetur metus nisi, sit amet pharetra nibh laoreet ut. Sed cursus eros molestie metus vulputate, et porta turpis viverra. Vivamus nec vehicula arcu.
                        Donec ut nisl id orci auctor aliquet quis non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat diam at rutrum luctus. Vivamus sapien augue, tempor ut imperdiet sed, congue in felis. Sed ex lorem, aliquet eu condimentum non, fermentum et erat. Duis convallis orci ut dignissim sollicitudin. Fusce vel tempus arcu, pharetra volutpat nisl.
                    </p>
                </div>
            </div>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" class="rounded-circle img-fluid" alt="Photo de profil"></img>
                        <h2 class="mt-3">Jean Dupont</h2>
                        <p>"Ce service est incroyable ! Je le recommande vivement à tous ceux qui cherchent une solution fiable et efficace."</p>
                    </div>
                    <div class="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" class="rounded-circle img-fluid" alt="Photo de profil"></img>
                        <h2 class="mt-3">Marie Martin</h2>
                        <p>"J'ai été très satisfaite de l'expérience. Le support client est excellent et les résultats sont au rendez-vous."</p>
                    </div>
                    <div class="col-lg-4 text-center">
                        <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" class="rounded-circle img-fluid" alt="Photo de profil"></img>
                        <h2 class="mt-3">Paul Durand</h2>
                        <p>"Un service rapide et efficace. Je n'hésiterai pas à l'utiliser à nouveau pour mes futurs projets."</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;