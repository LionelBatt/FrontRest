import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/glassmorphism.css';

const AccParam = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardHolder: '',
        secretNumber: '',
    });
    const [cardError, setCardError] = useState('');
    const [isProcessingCard, setIsProcessingCard] = useState(false);

    // Charger le profil utilisateur au montage du composant
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://13.39.150.189:8080/travel/users/profil', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                
                if (data.success) {
                    setUserProfile(data.data);
                    setFormData({
                        username: data.data.username,
                        email: data.data.email,
                        phoneNumber: data.data.phoneNumber,
                        name: data.data.name,
                        surname: data.data.surname,
                        address: data.data.address
                    });
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
    }, [navigate]);

    // Fonction pour récupérer les commandes
    const fetchUserOrders = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoadingOrders(true);
        try {
            const response = await fetch('http://13.39.150.189:8080/travel/orders/mine', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                setOrders(data.data || []);
            } else {
                console.error('Erreur lors du chargement des commandes:', data.message);
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        // Préparer le body complet avec tous les champs obligatoires
        const updatedProfile = {
            userId: userProfile.userId,
            username: userProfile.username,
            password: userProfile.password,
            email: formData.email || userProfile.email,
            phoneNumber: formData.phoneNumber || userProfile.phoneNumber,
            name: formData.name || userProfile.name,
            surname: formData.surname || userProfile.surname,
            address: formData.address || userProfile.address,
            cardInfo: userProfile.cardInfo, // Préserver les infos de carte existantes
            version: userProfile.version
        };

        try {
            const response = await fetch('http://15.188.48.92:8080/travel/users/profil', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            });

            if (response.ok) {
                setUserProfile(updatedProfile);
                setSuccess('Profil mis à jour avec succès !');
                setIsEditing(false);
            } else {
                setError('Erreur lors de la mise à jour du profil');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            console.error('Erreur:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate('/');
    };

    // Fonction pour ouvrir la modal de détail de commande
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    // Fonction pour fermer la modal
    const closeOrderModal = () => {
        setShowOrderModal(false);
        setSelectedOrder(null);
    };

    // Fonction pour formater le prix
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Fonction pour formater la destination
    const formatDestination = (city, country) => {
        return `${city}, ${country}`;
    };

    // Fonctions pour la gestion des cartes bancaires
    const formatCardNumber = (value) => {
        return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
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

    const handleCardSubmit = async () => {
        setCardError('');
        setIsProcessingCard(true);

        // Validation
        if (!cardData.cardNumber || !cardData.cardHolder || !cardData.secretNumber) {
            setCardError('Tous les champs sont obligatoires');
            setIsProcessingCard(false);
            return;
        }

        if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
            setCardError('Le numéro de carte doit contenir 16 chiffres');
            setIsProcessingCard(false);
            return;
        }

        if (!/^\d{3}$/.test(cardData.secretNumber)) {
            setCardError('Le code CVV doit contenir 3 chiffres');
            setIsProcessingCard(false);
            return;
        }

        try {
            // Préparer le body complet avec tous les champs obligatoires
            const updatedProfile = {
                userId: userProfile.userId,
                username: userProfile.username,
                password: userProfile.password,
                email: userProfile.email,
                phoneNumber: userProfile.phoneNumber,
                name: userProfile.name,
                surname: userProfile.surname,
                address: userProfile.address,
                cardInfo: {
                    cardNumber: cardData.cardNumber.replace(/\s/g, ''),
                    cardHolder: cardData.cardHolder,
                    secretNumber: parseInt(cardData.secretNumber)
                },
                version: userProfile.version
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
                setSuccess('Carte bancaire mise à jour avec succès !');
            } else {
                setCardError('Erreur lors de la mise à jour de la carte');
            }
        } catch (err) {
            setCardError('Erreur de connexion au serveur');
            console.error('Erreur:', err);
        } finally {
            setIsProcessingCard(false);
        }
    };

    const handleEditCard = () => {
        // Pré-remplir avec les données existantes si disponibles
        if (userProfile?.cardInfo) {
            setCardData({
                cardNumber: userProfile.cardInfo.maskedCardNumber || '',
                cardHolder: userProfile.cardInfo.cardHolder || '',
                secretNumber: ''
            });
        } else {
            setCardData({
                cardNumber: '',
                cardHolder: '',
                secretNumber: ''
            });
        }
        setCardError('');
        setShowCardModal(true);
    };

    if (isLoading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#fff',
            paddingTop: '100px',
            paddingBottom: '50px'
        }}>
            <div className="container">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb glass-breadcrumb-white p-3">
                        <li className="breadcrumb-item">
                            <a href="/" className="glass-link">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <span className="text-primary">User</span>
                        </li>
                        <li className="breadcrumb-item active glass-text-muted" aria-current="page">
                            User Profile
                        </li>
                    </ol>
                </nav>

                <div className="row g-4">
                    {/* Colonne de gauche - Profil utilisateur */}
                    <div className="col-lg-4">
                        {/* Card profil principal */}
                        <div className="glass-card-white-bg p-4 text-center mb-4">
                            <div className="mb-4">
                                <div className="position-relative d-inline-block">
                                    <div className="bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center" 
                                         style={{ 
                                             width: '120px', 
                                             height: '120px',
                                             background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                             border: '4px solid rgba(255,255,255,0.8)'
                                         }}>
                                        <i className="fas fa-user fa-3x text-white"></i>
                                    </div>
                                </div>
                            </div>
                            <h3 className="glass-text-dark mb-1">
                                {userProfile?.name || 'John'} {userProfile?.surname || 'Doe'}
                            </h3>
                            <p className="glass-text-muted mb-3">Voyageur passionné</p>
                            <p className="glass-text-muted small mb-4">
                                {userProfile?.address || 'Bay Area, San Francisco, CA'}
                            </p>
                            <div className="d-grid gap-2">
                                <button 
                                    className="btn glass-btn-primary-white glass-border-radius-lg"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    <i className="fas fa-user-plus me-2"></i>
                                    {isEditing ? 'Annuler' : 'Modifier'}
                                </button>
                            </div>
                        </div>

                        {/* Card actions utilisateur */}
                        <div className="glass-card-white-bg p-4 mb-4">
                            <div className="d-grid gap-2">
                                <button className="btn glass-btn-warning glass-border-radius">
                                    <i className="fas fa-key me-2"></i>
                                    Changer le mot de passe
                                </button>
                                <button 
                                    className="btn glass-btn-danger glass-border-radius"
                                    onClick={handleLogout}
                                >
                                    <i className="fas fa-sign-out-alt me-2"></i>
                                    Se déconnecter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Colonne de droite - Informations détaillées */}
                    <div className="col-lg-8">
                        {/* Messages d'état */}
                        {error && (
                            <div className="alert alert-danger mb-4">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {error}
                            </div>
                        )}
                        
                        {success && (
                            <div className="alert alert-success mb-4">
                                <i className="fas fa-check-circle me-2"></i>
                                {success}
                            </div>
                        )}

                        {/* Card informations personnelles */}
                        <div className="glass-card-white-bg p-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="glass-text-dark mb-0">Informations personnelles</h5>
                                {!isEditing && (
                                    <button 
                                        className="btn glass-btn-info glass-border-radius"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <i className="fas fa-edit me-2"></i>
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label glass-text-dark">Nom complet</label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                name="name"
                                                value={formData.name || ''}
                                                onChange={handleInputChange}
                                                placeholder="Prénom"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label glass-text-dark">Nom de famille</label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                name="surname"
                                                value={formData.surname || ''}
                                                onChange={handleInputChange}
                                                placeholder="Nom"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label glass-text-dark">Email</label>
                                            <input
                                                type="email"
                                                className="form-control glass-input"
                                                name="email"
                                                value={formData.email || ''}
                                                onChange={handleInputChange}
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label glass-text-dark">Téléphone</label>
                                            <input
                                                type="tel"
                                                className="form-control glass-input"
                                                name="phoneNumber"
                                                value={formData.phoneNumber || ''}
                                                onChange={handleInputChange}
                                                placeholder="+33 1 23 45 67 89"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label glass-text-dark">Adresse</label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                name="address"
                                                value={formData.address || ''}
                                                onChange={handleInputChange}
                                                placeholder="123 Rue de la Paix, Paris, France"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex gap-2">
                                                <button 
                                                    type="submit" 
                                                    className="btn glass-btn-success glass-border-radius-lg"
                                                    disabled={isLoading}
                                                >
                                                    <i className="fas fa-save me-2"></i>
                                                    Sauvegarder
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn glass-btn-white glass-border-radius-lg"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    <i className="fas fa-times me-2"></i>
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="info-item">
                                            <label className="text-primary small">Full Name</label>
                                            <div className="glass-text-dark">
                                                {userProfile?.name} {userProfile?.surname}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-item">
                                            <label className="text-primary small">Email</label>
                                            <div className="glass-text-dark">{userProfile?.email}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-item">
                                            <label className="text-primary small">Phone</label>
                                            <div className="glass-text-dark">{userProfile?.phoneNumber || 'Non renseigné'}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-item">
                                            <label className="text-primary small">Mobile</label>
                                            <div className="glass-text-dark">{userProfile?.phoneNumber || 'Non renseigné'}</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="info-item">
                                            <label className="text-primary small">Address</label>
                                            <div className="glass-text-dark">{userProfile?.address || 'Non renseignée'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card informations bancaires */}
                        <div className="glass-card-white-bg p-4 mb-4">
                            <h5 className="glass-text-dark mb-4">Informations de paiement</h5>
                            {userProfile?.cardInfo ? (
                                <div className="d-flex align-items-center justify-content-between p-3 rounded" 
                                     style={{ background: 'rgba(248,249,250,0.8)' }}>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-credit-card fa-2x text-primary me-3"></i>
                                        <div>
                                            <div className="glass-text-dark fw-bold">{userProfile.cardInfo.cardHolder}</div>
                                            <div className="glass-text-muted small">{userProfile.cardInfo.maskedCardNumber}</div>
                                        </div>
                                    </div>
                                    <button 
                                        className="btn glass-btn-warning glass-border-radius"
                                        onClick={handleEditCard}
                                    >
                                        <i className="fas fa-edit me-2"></i>
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fas fa-credit-card fa-3x text-muted mb-3"></i>
                                    <p className="glass-text-muted">Aucune carte de paiement enregistrée</p>
                                    <button 
                                        className="btn glass-btn-primary-white glass-border-radius-lg"
                                        onClick={handleEditCard}
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        Ajouter une carte
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Card historique des commandes */}
                        <div className="glass-card-white-bg p-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="glass-text-dark mb-0">Historique des commandes</h5>
                                <button 
                                    className="btn glass-btn-info glass-border-radius"
                                    onClick={fetchUserOrders}
                                    disabled={loadingOrders}
                                >
                                    {loadingOrders ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : (
                                        <i className="fas fa-refresh me-2"></i>
                                    )}
                                    Actualiser
                                </button>
                            </div>

                            {loadingOrders ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Chargement...</span>
                                    </div>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="row g-3">
                                    {orders.slice(0, 3).map((order) => (
                                        <div key={order.orderId} className="col-12">
                                            <div 
                                                className="d-flex align-items-center justify-content-between p-3 rounded cursor-pointer"
                                                style={{ 
                                                    background: 'rgba(248,249,250,0.8)',
                                                    border: '1px solid rgba(0,0,0,0.1)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onClick={() => handleOrderClick(order)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = 'rgba(233,236,239,0.9)';
                                                    e.target.style.transform = 'translateY(-1px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'rgba(248,249,250,0.8)';
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="me-3">
                                                        <img 
                                                            src={`/assets/images/${order.trip.destinationContinent}.jpg`}
                                                            className="rounded"
                                                            alt={order.trip.destinationCity}
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="glass-text-dark fw-bold">
                                                            {formatDestination(order.trip.destinationCity, order.trip.destinationCountry)}
                                                        </div>
                                                        <div className="glass-text-muted small">
                                                            {formatDate(order.creationDate)} • {order.numberOfPassagers} passager{order.numberOfPassagers > 1 ? 's' : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <div className="glass-text-dark fw-bold">{formatPrice(order.total)}</div>
                                                    <div className="glass-text-muted small">
                                                        <i className="fas fa-eye me-1"></i>Voir détails
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {orders.length > 3 && (
                                        <div className="col-12 text-center">
                                            <button className="btn glass-btn-white glass-border-radius">
                                                <i className="fas fa-plus me-2"></i>
                                                Voir toutes les commandes ({orders.length})
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                                    <p className="glass-text-muted">Aucune commande trouvée</p>
                                    <button 
                                        className="btn glass-btn-primary-white glass-border-radius-lg"
                                        onClick={() => navigate('/')}
                                    >
                                        <i className="fas fa-search me-2"></i>
                                        Découvrir nos voyages
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal détails de commande */}
                {showOrderModal && selectedOrder && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content glass-card-white-bg">
                                <div className="modal-header border-0">
                                    <h5 className="modal-title glass-text-dark">
                                        <i className="fas fa-receipt me-2"></i>
                                        Détails de la commande #{selectedOrder.orderId}
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={closeOrderModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-4">
                                        {/* Informations voyage */}
                                        <div className="col-md-8">
                                            <h6 className="glass-text-dark mb-3">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                Informations du voyage
                                            </h6>
                                            <div className="d-flex mb-3">
                                                <img 
                                                    src={`/assets/images/${selectedOrder.trip.destinationContinent}.jpg`}
                                                    className="rounded me-3"
                                                    alt={selectedOrder.trip.destinationCity}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                                <div className="flex-grow-1">
                                                    <h5 className="glass-text-dark mb-2">
                                                        {formatDestination(selectedOrder.trip.destinationCity, selectedOrder.trip.destinationCountry)}
                                                    </h5>
                                                    <p className="glass-text-muted mb-2">{selectedOrder.trip.description}</p>
                                                    <div className="row text-sm">
                                                        <div className="col-6">
                                                            <strong>Durée min:</strong> {selectedOrder.trip.minimumDuration} jours
                                                        </div>
                                                        <div className="col-6">
                                                            <strong>Date départ:</strong> {formatDate(selectedOrder.tripStartDate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Informations commande */}
                                        <div className="col-md-4">
                                            <h6 className="glass-text-dark mb-3">
                                                <i className="fas fa-info-circle me-2"></i>
                                                Informations commande
                                            </h6>
                                            <div className="mb-2">
                                                <strong>Commande:</strong> #{selectedOrder.orderId}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Date:</strong> {formatDate(selectedOrder.creationDate)}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Passagers:</strong> {selectedOrder.numberOfPassagers}
                                            </div>
                                        </div>

                                        {/* Options sélectionnées */}
                                        {selectedOrder.options && selectedOrder.options.length > 0 && (
                                            <div className="col-12">
                                                <h6 className="glass-text-dark mb-3">
                                                    <i className="fas fa-plus-circle me-2"></i>
                                                    Options sélectionnées
                                                </h6>
                                                <div className="row g-2">
                                                    {selectedOrder.options.map((option, index) => (
                                                        <div key={index} className="col-md-6">
                                                            <div className="p-3 rounded" style={{ background: 'rgba(248,249,250,0.8)' }}>
                                                                <div className="d-flex justify-content-between">
                                                                    <div>
                                                                        <div className="fw-bold glass-text-dark">{option.desc}</div>
                                                                        <small className="glass-text-muted">{option.category}</small>
                                                                    </div>
                                                                    <div className="fw-bold text-primary">
                                                                        {formatPrice(option.prix * selectedOrder.numberOfPassagers)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Récapitulatif des prix */}
                                        <div className="col-12">
                                            <h6 className="glass-text-dark mb-3">
                                                <i className="fas fa-calculator me-2"></i>
                                                Récapitulatif
                                            </h6>
                                            <div className="p-3 rounded" style={{ background: 'rgba(248,249,250,0.8)' }}>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Voyage ({selectedOrder.numberOfPassagers} pers.)</span>
                                                    <span>{formatPrice(selectedOrder.trip.unitPrice * selectedOrder.numberOfPassagers)}</span>
                                                </div>
                                                {selectedOrder.options && selectedOrder.options.map((option, index) => (
                                                    <div key={index} className="d-flex justify-content-between mb-2 small glass-text-muted">
                                                        <span>{option.desc} ({selectedOrder.numberOfPassagers} pers.)</span>
                                                        <span>{formatPrice(option.prix * selectedOrder.numberOfPassagers)}</span>
                                                    </div>
                                                ))}
                                                <hr className="my-2" />
                                                <div className="d-flex justify-content-between fw-bold fs-5">
                                                    <span className="glass-text-dark">Total</span>
                                                    <span className="text-primary">{formatPrice(selectedOrder.total)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button 
                                        type="button" 
                                        className="btn glass-btn-white glass-border-radius" 
                                        onClick={closeOrderModal}
                                    >
                                        <i className="fas fa-times me-2"></i>
                                        Fermer
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn glass-btn-primary-white glass-border-radius"
                                        onClick={() => {
                                            // Rediriger vers une page de réservation similaire ou d'évaluation
                                            closeOrderModal();
                                        }}
                                    >
                                        <i className="fas fa-repeat me-2"></i>
                                        Commander à nouveau
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal pour modifier/ajouter une carte bancaire */}
                {showCardModal && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content glass-card-white-bg">
                                <div className="modal-header border-0">
                                    <h5 className="modal-title glass-text-dark">
                                        <i className="fas fa-credit-card me-2"></i>
                                        {userProfile?.cardInfo ? 'Modifier la carte bancaire' : 'Ajouter une carte bancaire'}
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setShowCardModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {userProfile?.cardInfo ? (
                                        <div className="alert alert-info">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Modifiez les informations de votre carte bancaire.
                                        </div>
                                    ) : (
                                        <div className="alert alert-info">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Ajoutez une carte bancaire pour faciliter vos futurs achats.
                                        </div>
                                    )}
                                    
                                    {cardError && (
                                        <div className="alert alert-danger">
                                            <i className="fas fa-exclamation-triangle me-2"></i>
                                            {cardError}
                                        </div>
                                    )}

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="cardNumber" className="form-label glass-text-dark">
                                                Numéro de carte *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={cardData.cardNumber}
                                                onChange={handleCardInputChange}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="cardHolder" className="form-label glass-text-dark">
                                                Nom du porteur *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                id="cardHolder"
                                                name="cardHolder"
                                                value={cardData.cardHolder}
                                                onChange={handleCardInputChange}
                                                placeholder="JOHN DOE"
                                                style={{ textTransform: 'uppercase' }}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="secretNumber" className="form-label glass-text-dark">
                                                Code CVV *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                id="secretNumber"
                                                name="secretNumber"
                                                value={cardData.secretNumber}
                                                onChange={handleCardInputChange}
                                                placeholder="123"
                                                maxLength="3"
                                            />
                                            <small className="glass-text-muted">
                                                Code à 3 chiffres au dos de votre carte
                                            </small>
                                        </div>
                                    </form>

                                    <div className="mt-3 p-3 rounded" style={{ background: 'rgba(248,249,250,0.8)' }}>
                                        <small className="glass-text-muted">
                                            <i className="fas fa-lock me-1"></i>
                                            Vos informations bancaires sont sécurisées et chiffrées.
                                        </small>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button 
                                        type="button" 
                                        className="btn glass-btn-white glass-border-radius" 
                                        onClick={() => setShowCardModal(false)}
                                    >
                                        <i className="fas fa-times me-2"></i>
                                        Annuler
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn glass-btn-primary-white glass-border-radius" 
                                        onClick={handleCardSubmit}
                                        disabled={isProcessingCard}
                                    >
                                        {isProcessingCard ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Traitement...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-save me-2"></i>
                                                {userProfile?.cardInfo ? 'Modifier la carte' : 'Ajouter la carte'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AccParam;
