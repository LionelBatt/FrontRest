import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state?.orderData) {
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!location.state?.orderData) {
        return null;
    }

    const { orderData, message } = location.state;

    const formatPrice = (price) => {
        return `${price.toLocaleString('fr-FR')} €`;
    };

    const formatDestination = (city, country) => {
        return `${city}, ${country}`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* Message de succès */}
                    <div className="card shadow mb-4">
                        <div className="card-body text-center py-5">
                            <div className="mb-4">
                                <i className="fas fa-check-circle fa-5x text-success"></i>
                            </div>
                            <h2 className="text-success mb-3">Commande confirmée !</h2>
                            <p className="lead mb-4">{message}</p>
                            <p className="text-muted">
                                Vous allez recevoir un email de confirmation à l'adresse : 
                                <strong> {orderData.user.email}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Détails de la commande */}
                    <div className="card shadow">
                        <div className="card-header">
                            <h4 className="mb-0">
                                <i className="fas fa-receipt me-2"></i>
                                Détails de votre commande
                            </h4>
                        </div>
                        <div className="card-body">
                            {/* Informations du voyage */}
                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <img 
                                        src={`/assets/images/${orderData.trip.destinationContinent}.jpg`}
                                        className="img-fluid rounded"
                                        alt={orderData.trip.destinationCity}
                                        style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h5 className="text-primary">
                                        {formatDestination(orderData.trip.destinationCity, orderData.trip.destinationCountry)}
                                    </h5>
                                    <p className="text-muted mb-2">{orderData.trip.description}</p>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Date de départ:</strong><br />
                                            {formatDate(orderData.tripStartDate)}
                                        </div>
                                        <div className="col-sm-6">
                                            <strong>Nombre de passagers:</strong><br />
                                            {orderData.numberOfPassagers} personne{orderData.numberOfPassagers > 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Informations client */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h6 className="fw-bold mb-2">Informations client</h6>
                                    <p className="mb-1">
                                        <strong>{orderData.user.name} {orderData.user.surname}</strong>
                                    </p>
                                    <p className="mb-1 text-muted">{orderData.user.email}</p>
                                    <p className="mb-1 text-muted">{orderData.user.phoneNumber}</p>
                                    <p className="mb-0 text-muted small">{orderData.user.address}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="fw-bold mb-2">Informations de paiement</h6>
                                    {orderData.user.cardInfo ? (
                                        <div>
                                            <p className="mb-1">{orderData.user.cardInfo.cardHolder}</p>
                                            <p className="mb-0 text-muted">{orderData.user.cardInfo.maskedCardNumber}</p>
                                        </div>
                                    ) : (
                                        <p className="text-warning">
                                            <i className="fas fa-exclamation-triangle me-1"></i>
                                            Aucune carte enregistrée
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Options sélectionnées */}
                            {orderData.options.length > 0 && (
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">Options sélectionnées</h6>
                                    <div className="row">
                                        {orderData.options.map((option, index) => (
                                            <div key={index} className="col-md-6 mb-2">
                                                <div className="card bg-light">
                                                    <div className="card-body py-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <small className="text-muted">{option.category}</small>
                                                                <div className="fw-semibold">{option.desc}</div>
                                                            </div>
                                                            <div className="fw-bold text-primary">
                                                                {formatPrice(option.prix * orderData.numberOfPassagers)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Résumé financier */}
                            <div className="border-top pt-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Voyage ({orderData.numberOfPassagers} personne{orderData.numberOfPassagers > 1 ? 's' : ''})</span>
                                            <span>{formatPrice(orderData.trip.unitPrice * orderData.numberOfPassagers)}</span>
                                        </div>
                                        
                                        {orderData.options.map((option, index) => (
                                            <div key={index} className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">
                                                    {option.desc} ({orderData.numberOfPassagers} pers.)
                                                </span>
                                                <span>{formatPrice(option.prix * orderData.numberOfPassagers)}</span>
                                            </div>
                                        ))}
                                        
                                        <hr />
                                        <div className="d-flex justify-content-between fw-bold fs-4">
                                            <span>Total payé</span>
                                            <span className="text-success">{formatPrice(orderData.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="d-flex gap-3 mt-4">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => navigate('/')}
                                >
                                    <i className="fas fa-home me-2"></i>
                                    Retour à l'accueil
                                </button>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate('/account')}
                                >
                                    <i className="fas fa-user me-2"></i>
                                    Mon compte
                                </button>
                                <button 
                                    className="btn btn-outline-secondary"
                                    onClick={() => window.print()}
                                >
                                    <i className="fas fa-print me-2"></i>
                                    Imprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
