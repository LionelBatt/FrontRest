import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CartService from '../services/CartService';
import '../styles/glassmorphism.css';

const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartData, setCartData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [tripStartDate, setTripStartDate] = useState('');
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);

    useEffect(() => {
        // Récupérer les données du panier depuis la navigation ou le localStorage
        if (location.state?.cartData) {
            setCartData(location.state.cartData);
        } else {
            // Essayer de récupérer depuis le localStorage
            const savedCart = CartService.getCart();
            if (savedCart) {
                setCartData(savedCart);
            } else {
                // Rediriger si pas de données de panier
                navigate('/');
                return;
            }
        }

        // Charger le profil utilisateur
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://15.188.48.92:8080/travel/users/profil', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                
                if (data.success) {
                    setUserProfile(data.data);
                } else {
                    setError('Erreur lors du chargement du profil');
                }
            } catch (err) {
                setError('Erreur de connexion au serveur');
                console.error('Erreur:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [location.state, navigate]);

    const calculateTotal = () => {
        if (!cartData) return 0;
        
        const tripPrice = cartData.trip.unitPrice * numberOfPassengers;
        const optionsPrice = cartData.selectedOptions.reduce((total, option) => 
            total + (option.prix * numberOfPassengers), 0
        );
        
        return tripPrice + optionsPrice;
    };

    const handlePlaceOrder = async () => {
        if (!tripStartDate) {
            setError('Veuillez sélectionner une date de départ');
            return;
        }

        setIsProcessingOrder(true);
        setError('');

        const orderData = {
            orderId: 0,
            user: {
                userId: userProfile.userId,
                username: userProfile.username,
                password: userProfile.password,
                email: userProfile.email,
                phoneNumber: userProfile.phoneNumber,
                name: userProfile.name,
                surname: userProfile.surname,
                address: userProfile.address,
                cardInfo: userProfile.cardInfo || null,
                role: userProfile.role,
                version: userProfile.version
            },
            trip: cartData.trip,
            numberOfPassagers: numberOfPassengers,
            options: cartData.selectedOptions,
            tripStartDate: new Date(tripStartDate).toISOString(),
            travelTime: new Date(tripStartDate).toISOString(),
            creationDate: new Date().toISOString(),
            total: calculateTotal(),
            version: 0
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://15.188.48.92:8080/travel/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                // Vider le panier après commande réussie
                CartService.clearCart();
                
                // Rediriger vers une page de confirmation
                navigate('/order-confirmation', { 
                    state: { 
                        orderData,
                        message: 'Commande passée avec succès !' 
                    } 
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur lors de la commande');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            console.error('Erreur:', err);
        } finally {
            setIsProcessingOrder(false);
        }
    };

    const formatDestination = (city, country) => {
        return `${city}, ${country}`;
    };

    const formatPrice = (price) => {
        return `${price.toLocaleString('fr-FR')} €`;
    };

    const handleClearCart = () => {
        if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
            CartService.clearCart();
            navigate('/');
        }
    };

    const handleRemoveOption = (optionIndex) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette option ?')) {
            const updatedOptions = cartData.selectedOptions.filter((_, index) => index !== optionIndex);
            const updatedCartData = {
                ...cartData,
                selectedOptions: updatedOptions,
                totalPrice: cartData.trip.unitPrice + updatedOptions.reduce((total, option) => total + option.prix, 0)
            };
            
            setCartData(updatedCartData);
            CartService.saveCart(updatedCartData);
        }
    };

    if (isLoading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!cartData) {
        return (
            <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card shadow text-center">
                            <div className="card-body py-5">
                                <i className="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
                                <h3 className="mb-3">Votre panier est vide</h3>
                                <p className="text-muted mb-4">
                                    Découvrez nos destinations de voyage et ajoutez vos favoris au panier.
                                </p>
                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn glass-btn-primary glass-border-radius-lg btn-lg"
                                        onClick={() => navigate('/')}
                                        style={{
                                            fontWeight: '500',
                                            padding: '0.75rem 1.5rem',
                                        }}
                                    >
                                        <i className="fas fa-home me-2"></i>
                                        Découvrir nos voyages
                                    </button>
                                    <button 
                                        className="btn glass-btn-success glass-border-radius-lg"
                                        onClick={() => navigate('/search')}
                                        style={{
                                            fontWeight: '500',
                                            padding: '0.5rem 1rem',
                                        }}
                                    >
                                        <i className="fas fa-search me-2"></i>
                                        Rechercher une destination
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
            <div className="row">
                <div className="col-lg-8">
                    {/* En-tête du panier */}
                    <div className="card shadow mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">
                                <i className="fas fa-shopping-cart me-2"></i>
                                Récapitulatif de votre voyage
                            </h2>
                            <button 
                                className="btn glass-btn-danger glass-border-radius-lg"
                                onClick={handleClearCart}
                                title="Vider le panier"
                                style={{
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                }}
                            >
                                <i className="fas fa-trash me-1"></i>
                                Vider le panier
                            </button>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {/* Informations du voyage */}
                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <img 
                                        src={`/assets/images/${cartData.trip.destinationContinent}.jpg`}
                                        className="img-fluid rounded"
                                        alt={cartData.trip.destinationCity}
                                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h4 className="text-primary">
                                        {formatDestination(cartData.trip.destinationCity, cartData.trip.destinationCountry)}
                                    </h4>
                                    <p className="text-muted mb-3">{cartData.trip.description}</p>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Durée minimum:</strong> {cartData.trip.minimumDuration} jours
                                        </div>
                                        <div className="col-sm-6">
                                            <strong>Prix unitaire:</strong> {formatPrice(cartData.trip.unitPrice)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Configuration du voyage */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="passengers" className="form-label fw-bold">
                                        Nombre de passagers
                                    </label>
                                    <select 
                                        className="form-select"
                                        id="passengers"
                                        value={numberOfPassengers}
                                        onChange={(e) => setNumberOfPassengers(parseInt(e.target.value))}
                                    >
                                        {[1,2,3,4,5,6,7,8].map(num => (
                                            <option key={num} value={num}>{num} passager{num > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="startDate" className="form-label fw-bold">
                                        Date de départ
                                    </label>
                                    <input 
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        value={tripStartDate}
                                        onChange={(e) => setTripStartDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Options sélectionnées */}
                            {cartData.selectedOptions.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-3">
                                        <i className="fas fa-plus-circle me-2"></i>
                                        Options sélectionnées
                                    </h5>
                                    <div className="row">
                                        {cartData.selectedOptions.map((option, index) => (
                                            <div key={index} className="col-md-6 mb-2">
                                                <div className="card bg-light">
                                                    <div className="card-body py-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="flex-grow-1">
                                                                <small className="text-muted">{option.category}</small>
                                                                <div className="fw-semibold">{option.desc}</div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="fw-bold text-primary">
                                                                    {formatPrice(option.prix * numberOfPassengers)}
                                                                </div>
                                                                <button 
                                                                    className="btn glass-btn-danger glass-border-radius"
                                                                    onClick={() => handleRemoveOption(index)}
                                                                    title="Supprimer cette option"
                                                                    style={{
                                                                        padding: '0.3rem 0.5rem',
                                                                        fontSize: '0.8rem',
                                                                    }}
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Résumé de la commande */}
                <div className="col-lg-4">
                    <div className="card shadow sticky-top" style={{ top: '100px' }}>
                        <div className="card-header">
                            <h5 className="mb-0">Résumé de la commande</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Voyage ({numberOfPassengers} pers.)</span>
                                <span>{formatPrice(cartData.trip.unitPrice * numberOfPassengers)}</span>
                            </div>
                            
                            {cartData.selectedOptions.map((option, index) => (
                                <div key={index} className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">
                                        {option.desc} ({numberOfPassengers} pers.)
                                    </span>
                                    <span className="small">{formatPrice(option.prix * numberOfPassengers)}</span>
                                </div>
                            ))}
                            
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Total</span>
                                <span className="text-primary">{formatPrice(calculateTotal())}</span>
                            </div>
                            
                            {/* Informations de paiement */}
                            {userProfile?.cardInfo ? (
                                <div className="mt-3 p-3 bg-light rounded">
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="fas fa-credit-card me-2"></i>
                                        <strong>Paiement</strong>
                                    </div>
                                    <div className="small text-muted">
                                        {userProfile.cardInfo.cardHolder}<br />
                                        {userProfile.cardInfo.maskedCardNumber}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-3 p-3 bg-warning bg-opacity-10 border border-warning rounded">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
                                        <small>Aucune carte de paiement enregistrée</small>
                                    </div>
                                </div>
                            )}
                            
                            <div className="d-grid gap-2 mt-4">
                                <button 
                                    className="btn glass-btn-primary glass-border-radius-lg btn-lg"
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessingOrder || !tripStartDate}
                                    style={{
                                        fontWeight: '500',
                                        padding: '0.75rem 1.5rem',
                                    }}
                                >
                                    {isProcessingOrder ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Traitement...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-check me-2"></i>
                                            Confirmer la commande
                                        </>
                                    )}
                                </button>
                                <button 
                                    className="btn glass-btn glass-border-radius-lg"
                                    onClick={() => navigate(-1)}
                                    style={{
                                        fontWeight: '500',
                                        padding: '0.5rem 1rem',
                                    }}
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Retour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
