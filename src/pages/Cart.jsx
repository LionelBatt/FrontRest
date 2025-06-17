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
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardHolder: '',
        secretNumber: '',
    });
    const [cardError, setCardError] = useState('');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

    const simulatePaymentVerification = async () => {
        setIsProcessingPayment(true);
        
        // Simuler un délai de vérification bancaire (2-3 secondes)
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
        
        // Simuler 95% de succès
        const success = Math.random() > 0.05;
        
        if (!success) {
            setIsProcessingPayment(false);
            throw new Error('Échec de la vérification bancaire. Veuillez réessayer.');
        }
        
        setIsProcessingPayment(false);
    };

    const handleCardSubmit = async () => {
        setCardError('');
        
        // Validation des champs
        if (!cardData.cardNumber || !cardData.cardHolder || !cardData.secretNumber) {
            setCardError('Veuillez remplir tous les champs');
            return;
        }

        // Validation du numéro de carte (16 chiffres)
        if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
            setCardError('Le numéro de carte doit contenir 16 chiffres');
            return;
        }

        // Validation du code secret (3 chiffres)
        if (!/^\d{3}$/.test(cardData.secretNumber)) {
            setCardError('Le code secret doit contenir 3 chiffres');
            return;
        }

        try {
            setIsProcessingPayment(true);
            
            // Mettre à jour le profil utilisateur avec la carte
            const updatedProfile = {
                ...userProfile,
                cardInfo: {
                    cardNumber: cardData.cardNumber.replace(/\s/g, ''),
                    cardHolder: cardData.cardHolder,
                    secretNumber: parseInt(cardData.secretNumber)
                }
            };

            const token = localStorage.getItem('token');
            const response = await fetch('http://15.188.48.92:8080/travel/users/profil', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            });

            if (response.ok) {
                // Ajouter le maskedCardNumber pour l'affichage local seulement
                const updatedProfileWithMask = {
                    ...updatedProfile,
                    cardInfo: {
                        ...updatedProfile.cardInfo,
                        maskedCardNumber: `**** **** **** ${cardData.cardNumber.slice(-4)}`
                    }
                };
                
                setUserProfile(updatedProfileWithMask);
                setShowCardModal(false);
                setCardData({ cardNumber: '', cardHolder: '', secretNumber: '' });
                // Relancer la commande
                handlePlaceOrder();
            } else {
                setCardError('Erreur lors de l\'ajout de la carte');
            }
        } catch (err) {
            setCardError('Erreur de connexion au serveur');
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const formatCardNumber = (value) => {
        // Supprimer tous les caractères non numériques
        const numericValue = value.replace(/\D/g, '');
        // Ajouter des espaces tous les 4 chiffres
        return numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'cardNumber') {
            const formattedValue = formatCardNumber(value);
            if (formattedValue.replace(/\s/g, '').length <= 16) {
                setCardData(prev => ({ ...prev, [name]: formattedValue }));
            }
        } else if (name === 'secretNumber') {
            if (/^\d{0,3}$/.test(value)) {
                setCardData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setCardData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePlaceOrder = async () => {
        if (!tripStartDate) {
            setError('Veuillez sélectionner une date de départ');
            return;
        }

        // Vérifier si l'utilisateur a une carte bancaire
        if (!userProfile?.cardInfo) {
            setShowCardModal(true);
            return;
        }

        setIsProcessingOrder(true);
        setError('');

        // Simuler la vérification bancaire
        await simulatePaymentVerification();

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

            {/* Modal pour ajouter une carte bancaire */}
            {showCardModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="fas fa-credit-card me-2"></i>
                                    Ajouter une carte bancaire
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowCardModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-info">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Vous devez ajouter une carte bancaire pour finaliser votre commande.
                                </div>
                                
                                {cardError && (
                                    <div className="alert alert-danger">
                                        {cardError}
                                    </div>
                                )}

                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="cardNumber" className="form-label">
                                            Numéro de carte *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={cardData.cardNumber}
                                            onChange={handleCardInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="cardHolder" className="form-label">
                                            Nom du porteur *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cardHolder"
                                            name="cardHolder"
                                            value={cardData.cardHolder}
                                            onChange={handleCardInputChange}
                                            placeholder="JOHN DOE"
                                            style={{ textTransform: 'uppercase' }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="secretNumber" className="form-label">
                                            Code CVV *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="secretNumber"
                                            name="secretNumber"
                                            value={cardData.secretNumber}
                                            onChange={handleCardInputChange}
                                            placeholder="123"
                                            maxLength="3"
                                        />
                                    </div>
                                </form>

                                <div className="mt-3 p-3 bg-light rounded">
                                    <small className="text-muted">
                                        <i className="fas fa-lock me-1"></i>
                                        Vos informations bancaires sont sécurisées et chiffrées.
                                    </small>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowCardModal(false)}
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={handleCardSubmit}
                                    disabled={isProcessingPayment}
                                >
                                    {isProcessingPayment ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Traitement...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus me-2"></i>
                                            Ajouter la carte
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
