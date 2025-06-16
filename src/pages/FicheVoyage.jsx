

const FicheVoyage = () => {


    return (
        <>
            <div class="container">
                <h1 class="text-center mb-4 text-primary">Fiche de Voyage : Tokyo</h1>

                <div id="carouselTokyo" class="carousel slide mb-4"
                    data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img
                                src="https://wikiwandv2-19431.kxcdn.com/_next/image?url=https:%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc5%2FTokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg%2F1500px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg&w=3840&q=50"
                                class="d-block w-100 carousel-image" alt="Skyline Tokyo"></img>
                        </div>
                        <div class="carousel-item">
                            <img
                                src="https://www.papillesetpupilles.fr/wp-content/uploads/2012/10/Temple-Senjo-Ji-%C2%A9Richie-Chan.-shutterstock.jpg"
                                class="d-block w-100 carousel-image" alt="Shibuya"></img>
                        </div>
                        <div class="carousel-item">
                            <img
                                src="https://discoverist.changirecommends.com/wp-content/uploads/2023/01/shawn-tung-vvkMLy9GJUM-unsplash-1024x683.jpg"
                                class="d-block w-100 carousel-image" alt="Tokyo Tower"></img>
                        </div>
                        <div class="carousel-item">
                            <img
                                src="https://tse2.mm.bing.net/th/id/OIP.J_ku7QlAYnZadheUE72OBwHaEW?cb=iwc1&rs=1&pid=ImgDetMain"
                                class="d-block w-100 carousel-image" alt="Tokyo Tower"></img>
                        </div>
                        <div class="carousel-item">
                            <img
                                src="https://tse2.mm.bing.net/th/id/OIP.J_ku7QlAYnZadheUE72OBwHaEW?cb=iwc1&rs=1&pid=ImgDetMain"
                                class="d-block w-100 carousel-image" alt="Tokyo Tower"></img>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button"
                        data-bs-target="#carouselTokyo" data-bs-slide="prev"
                        title="Previous slide">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button"
                        data-bs-target="#carouselTokyo" data-bs-slide="next"
                        title="Next slide">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="info-box mb-4">
                            <h4>Description générale</h4>
                            <p>Tokyo est la capitale du Japon, connue pour son mélange
                                unique de modernité et de traditions. Entre gratte-ciels
                                futuristes, sanctuaires shinto anciens, et culture pop
                                omniprésente, la ville offre une expérience incomparable.</p>
                            <h5 class="mt-4">Spots touristiques</h5>
                            <ul>
                                <li>Shibuya Crossing</li>
                                <li>Temple Senso-ji</li>
                                <li>Tour de Tokyo</li>
                                <li>Parc d'Ueno</li>
                                <li>Odaiba</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info-box">
                            <h5>Options de voyage</h5>
                            <ul>
                                <li>Vol A/R à partir de 800 €</li>
                                <li>Hôtels dès 60 €/nuit</li>
                                <li>Visites guidées disponibles</li>
                                <li>Pass Métro Tokyo illimité</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default FicheVoyage;