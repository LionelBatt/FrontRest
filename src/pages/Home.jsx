import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Globe, Plane, Heart, Users, Award, Clock } from 'lucide-react';
import '../styles/glassmorphism.css';



function Home() {
    const navigate = useNavigate();

    
    const handleReservation = (tripId) => {
        navigate(`/trip/${tripId}`);
    };

    return (
        <>
        <div className="position-relative">
            {/* Hero Section avec Carousel Moderne */}
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" style={{ height: '100vh' }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner h-100">
                    <div className="carousel-item active h-100">
                        <img src="../assets/images/pexels-lkloeppel-466685.jpg" className="d-block w-100 h-100" alt="Vue de New York" style={{ objectFit: 'cover' }}></img>
                        <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-lg-6">
                                        <div className="glass-card p-5" style={{
                                            background: 'rgba(255, 255, 255, 0.35)',
                                            backdropFilter: 'blur(15px)',
                                            WebkitBackdropFilter: 'blur(15px)',
                                            border: '1px solid rgba(255, 255, 255, 0.5)',
                                            borderRadius: '20px'
                                        }}>
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <MapPin size={32} className="text-warning" />
                                                <h1 className="glass-text-white mb-0 display-4 fw-bold">New York</h1>
                                            </div>
                                            <p className="glass-text-white fs-5 mb-4">
                                                Découvrez la ville qui ne dort jamais ! Explorez Times Square, Central Park, 
                                                et les gratte-ciels emblématiques dans une aventure urbaine inoubliable.
                                            </p>
                                            <div className="d-flex gap-3">
                                                <button 
                                                    className="glass-btn-primary glass-border-radius-lg px-4 py-3 d-flex align-items-center gap-2"
                                                    onClick={() => handleReservation(16)}
                                                >
                                                    <Plane size={20} />
                                                    Réserver maintenant
                                                </button>
                                                <div className="glass-badge-price px-3 py-2 d-flex align-items-center">
                                                    À partir de 1,299€
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="carousel-item h-100">
                        <img src="../assets/images/pexels-pixabay-248195.jpg" className="d-block w-100 h-100" alt="Vue de Tokyo" style={{ objectFit: 'cover' }}></img>
                        <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">
                                        <div className="glass-card p-5" style={{
                                            background: 'rgba(255, 255, 255, 0.35)',
                                            backdropFilter: 'blur(15px)',
                                            WebkitBackdropFilter: 'blur(15px)',
                                            border: '1px solid rgba(255, 255, 255, 0.5)',
                                            borderRadius: '20px'
                                        }}>
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <Globe size={32} className="text-danger" />
                                                <h1 className="glass-text-white mb-0 display-4 fw-bold">Tokyo</h1>
                                            </div>
                                            <p className="glass-text-white fs-5 mb-4">
                                                Plongez dans l'harmonie parfaite entre tradition et modernité. 
                                                Temples ancestraux, technologie futuriste et gastronomie raffinée vous attendent.
                                            </p>
                                            <div className="d-flex gap-3">
                                                <button 
                                                    className="glass-btn-primary glass-border-radius-lg px-4 py-3 d-flex align-items-center gap-2"
                                                    onClick={() => handleReservation(9)}
                                                >
                                                    <Plane size={20} />
                                                    Réserver maintenant
                                                </button>
                                                <div className="glass-badge-price px-3 py-2 d-flex align-items-center">
                                                    À partir de 1,599€
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="carousel-item h-100">
                        <img src="../assets/images/20160828_164425.jpg" className="d-block w-100 h-100" alt="Vue de Paris" style={{ objectFit: 'cover' }}></img>
                        <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                            <div className="container">
                                <div className="row justify-content-end">
                                    <div className="col-lg-6">
                                        <div className="glass-card p-5" style={{
                                            background: 'rgba(255, 255, 255, 0.35)',
                                            backdropFilter: 'blur(15px)',
                                            WebkitBackdropFilter: 'blur(15px)',
                                            border: '1px solid rgba(255, 255, 255, 0.5)',
                                            borderRadius: '20px'
                                        }}>
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <Heart size={32} className="text-info" />
                                                <h1 className="glass-text-white mb-0 display-4 fw-bold">Paris</h1>
                                            </div>
                                            <p className="glass-text-white fs-5 mb-4">
                                                La Ville Lumière vous dévoile ses secrets : Tour Eiffel, Louvre, 
                                                Champs-Élysées... Romance, art et gastronomie au rendez-vous.
                                            </p>
                                            <div className="d-flex gap-3">
                                                <button 
                                                    className="glass-btn-primary glass-border-radius-lg px-4 py-3 d-flex align-items-center gap-2"
                                                    onClick={() => handleReservation(1)}
                                                >
                                                    <Plane size={20} />
                                                    Réserver maintenant
                                                </button>
                                                <div className="glass-badge-price px-3 py-2 d-flex align-items-center">
                                                    À partir de 899€
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Précédent</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Suivant</span>
                </button>
            </div>

            {/* Section À Propos Moderne */}
            <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, rgba(56, 142, 60, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)' }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="glass-card p-5" style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '20px'
                            }}>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <Users size={40} className="text-primary" />
                                    <h2 className="glass-text-dark-green display-6 fw-bold mb-0">Qui sommes-nous ?</h2>
                                </div>
                                <p className="fs-5 text-muted mb-4">
                                    Depuis plus de 15 ans, nous sommes votre passerelle vers les plus belles destinations du monde. 
                                    Notre expertise et notre passion du voyage nous permettent de créer des expériences uniques et mémorables.
                                </p>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="text-center p-3">
                                            <h3 className="text-primary fw-bold mb-1">10k+</h3>
                                            <small className="text-muted">Voyageurs satisfaits</small>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-center p-3">
                                            <h3 className="text-success fw-bold mb-1">150+</h3>
                                            <small className="text-muted">Destinations</small>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-center p-3">
                                            <h3 className="text-warning fw-bold mb-1">15</h3>
                                            <small className="text-muted">Années d'expérience</small>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-center p-3">
                                            <h3 className="text-info fw-bold mb-1">4.9/5</h3>
                                            <small className="text-muted">Note moyenne</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500" 
                                 alt="Notre équipe" className="img-fluid rounded-3 shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Services Premium */}
            <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(103, 58, 183, 0.05) 100%)' }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="glass-card p-5" style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '20px'
                            }}>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <Award size={40} className="text-warning" />
                                    <h2 className="glass-text-dark-green display-6 fw-bold mb-0">Services Premium</h2>
                                </div>
                                <p className="fs-5 text-muted mb-4">
                                    Découvrez notre gamme complète de services haut de gamme pour enrichir votre expérience de voyage.
                                </p>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Users size={20} className="text-primary" />
                                            <span className="fw-medium">Guide privé multilingue</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Heart size={20} className="text-danger" />
                                            <span className="fw-medium">Demi-pension premium</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Clock size={20} className="text-success" />
                                            <span className="fw-medium">Conciergerie 24h/24</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Plane size={20} className="text-info" />
                                            <span className="fw-medium">Classe affaires</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Globe size={20} className="text-warning" />
                                            <span className="fw-medium">Tours en hélicoptère</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Award size={20} className="text-purple" />
                                            <span className="fw-medium">Expériences exclusives</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=500" 
                                 alt="Services premium" className="img-fluid rounded-3 shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Témoignages Modernisée */}
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="glass-text-dark-green display-6 fw-bold mb-3">Ce que disent nos voyageurs</h2>
                    <p className="fs-5 text-muted">Plus de 10 000 aventuriers nous font confiance</p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="glass-card p-4 h-100 text-center" style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '20px'
                        }}>
                            <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" 
                                 className="rounded-circle mb-3" alt="Jean Dupont" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                            <div className="d-flex justify-content-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="text-warning" fill="currentColor" />
                                ))}
                            </div>
                            <h5 className="glass-text-dark-green mb-3">Jean Dupont</h5>
                            <p className="text-muted">
                                "Une expérience extraordinaire ! L'organisation était parfaite et les guides 
                                exceptionnels. Je recommande vivement cette agence."
                            </p>
                            <small className="text-muted">Voyage à Tokyo • Décembre 2024</small>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="glass-card p-4 h-100 text-center" style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '20px'
                        }}>
                            <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" 
                                 className="rounded-circle mb-3" alt="Marie Martin" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                            <div className="d-flex justify-content-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="text-warning" fill="currentColor" />
                                ))}
                            </div>
                            <h5 className="glass-text-dark-green mb-3">Marie Martin</h5>
                            <p className="text-muted">
                                "Service client remarquable et attention aux détails. Mon voyage à Paris 
                                était magique grâce à leur expertise."
                            </p>
                            <small className="text-muted">Voyage à Paris • Janvier 2025</small>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="glass-card p-4 h-100 text-center" style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '20px'
                        }}>
                            <img src="../assets/images/five-stars-review-half-shadow-style_78370-4561.avif" 
                                 className="rounded-circle mb-3" alt="Paul Durand" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                            <div className="d-flex justify-content-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="text-warning" fill="currentColor" />
                                ))}
                            </div>
                            <h5 className="glass-text-dark-green mb-3">Paul Durand</h5>
                            <p className="text-muted">
                                "Processus de réservation simple et rapide. L'expérience New York 
                                était au-delà de mes attentes !"
                            </p>
                            <small className="text-muted">Voyage à New York • Mars 2025</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section CTA Finale */}
            <div className="container-fluid py-5" style={{ 
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(56, 142, 60, 0.1) 100%)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div className="container py-5">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <div className="glass-card p-5" style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '20px'
                            }}>
                                <h2 className="glass-text-dark-green display-5 fw-bold mb-4">
                                    Prêt pour votre prochaine aventure ?
                                </h2>
                                <p className="fs-5 text-muted mb-4">
                                    Découvrez nos destinations exclusives et créez des souvenirs inoubliables. 
                                    L'aventure commence ici !
                                </p>
                                <div className="d-flex gap-3 justify-content-center flex-wrap">
                                    <button 
                                        className="glass-btn-primary glass-border-radius-lg px-5 py-3 d-flex align-items-center gap-2"
                                        onClick={() => navigate('/search')}
                                    >
                                        <Globe size={20} />
                                        Explorer nos destinations
                                    </button>
                                    <button 
                                        className="glass-btn-success glass-border-radius-lg px-5 py-3 d-flex align-items-center gap-2"
                                        onClick={() => navigate('/search')}
                                    >
                                        <Plane size={20} />
                                        Réserver maintenant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home; 