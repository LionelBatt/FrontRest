

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccParam = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Charger le profil utilisateur au montage du composant
    useEffect(() => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setError('');
        setSuccess('');

        try {
            // Ici vous pourrez ajouter l'appel API pour sauvegarder les modifications
            // const token = localStorage.getItem('token');
            // const response = await fetch('http://15.188.48.92:8080/travel/users/profil', {
            //     method: 'PUT',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData)
            // });
            
            // Pour l'instant, on simule la sauvegarde
            setTimeout(() => {
                setUserProfile(prev => ({ ...prev, ...formData }));
                setIsEditing(false);
                setSuccess('Profil mis à jour avec succès !');
            }, 500);
        } catch (err) {
            setError('Erreur lors de la sauvegarde');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate('/login');
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

    if (!userProfile) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    Erreur lors du chargement du profil
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
            <div className="row">
                <div className="col-12 col-lg-11 col-xl-10">
                    {/* En-tête du profil */}
                    <div className="card shadow mb-4">
                        <div className="card-body text-center p-4">
                            <div className="mb-3">
                                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <i className="fas fa-user fa-2x text-white"></i>
                                </div>
                            </div>
                            <h2 className="card-title mb-1">{userProfile.name} {userProfile.surname}</h2>
                            <p className="text-muted mb-3">@{userProfile.username}</p>
                            <span className="badge bg-success">{userProfile.role}</span>
                        </div>
                    </div>

                    {/* Messages d'état */}
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="alert alert-success">
                            {success}
                        </div>
                    )}

                    {/* Informations du profil */}
                    <div className="card shadow">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Informations personnelles</h5>
                            <button 
                                className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                            >
                                {isEditing ? 'Sauvegarder' : 'Modifier'}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* Nom d'utilisateur */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Nom d'utilisateur</label>
                                    {isEditing ? (
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userProfile.username}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    {isEditing ? (
                                        <input 
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userProfile.email}</p>
                                    )}
                                </div>

                                {/* Nom */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Nom</label>
                                    {isEditing ? (
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userProfile.name}</p>
                                    )}
                                </div>

                                {/* Prénom */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Prénom</label>
                                    {isEditing ? (
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userProfile.surname}</p>
                                    )}
                                </div>

                                {/* Téléphone */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Téléphone</label>
                                    {isEditing ? (
                                        <input 
                                            type="tel"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userProfile.phoneNumber}</p>
                                    )}
                                </div>

                                {/* Adresse (pleine largeur) */}
                                <div className="col-12 mb-3">
                                    <label className="form-label fw-bold">Adresse</label>
                                    {isEditing ? (
                                        <textarea 
                                            className="form-control"
                                            name="address"
                                            rows="2"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{userProfile.address}</p>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="text-end">
                                    <button 
                                        className="btn btn-secondary me-2"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                username: userProfile.username,
                                                email: userProfile.email,
                                                phoneNumber: userProfile.phoneNumber,
                                                name: userProfile.name,
                                                surname: userProfile.surname,
                                                address: userProfile.address
                                            });
                                        }}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informations de carte bancaire */}
                    {userProfile.cardInfo && (
                        <div className="card shadow mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="fas fa-credit-card me-2"></i>
                                    Informations de paiement
                                </h5>
                                <span className="badge bg-success">Carte enregistrée</span>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Titulaire de la carte</label>
                                        <p className="form-control-plaintext">
                                            <i className="fas fa-user me-2 text-muted"></i>
                                            {userProfile.cardInfo.cardHolder}
                                        </p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Numéro de carte</label>
                                        <p className="form-control-plaintext">
                                            <i className="fas fa-credit-card me-2 text-muted"></i>
                                            {userProfile.cardInfo.maskedCardNumber}
                                        </p>
                                    </div>
                                </div>
                                <div className="alert alert-info d-flex align-items-center">
                                    <i className="fas fa-info-circle me-2"></i>
                                    <small>
                                        Vos informations de paiement sont sécurisées et chiffrées. 
                                        Seuls les 4 derniers chiffres de votre carte sont affichés.
                                    </small>
                                </div>
                                <div className="text-end">
                                    <button className="btn btn-outline-primary me-2">
                                        <i className="fas fa-edit me-1"></i>
                                        Modifier la carte
                                    </button>
                                    <button className="btn btn-outline-danger">
                                        <i className="fas fa-trash me-1"></i>
                                        Supprimer la carte
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Si aucune carte enregistrée */}
                    {!userProfile.cardInfo && (
                        <div className="card shadow mt-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="fas fa-credit-card me-2"></i>
                                    Informations de paiement
                                </h5>
                            </div>
                            <div className="card-body text-center py-4">
                                <i className="fas fa-credit-card fa-3x text-muted mb-3"></i>
                                <h6 className="text-muted mb-3">Aucune carte enregistrée</h6>
                                <p className="text-muted mb-3">
                                    Ajoutez une carte de paiement pour faciliter vos réservations de voyages.
                                </p>
                                <button className="btn btn-primary">
                                    <i className="fas fa-plus me-2"></i>
                                    Ajouter une carte
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Actions du compte */}
                    <div className="card shadow mt-4">
                        <div className="card-header">
                            <h5 className="mb-0">Actions du compte</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-warning w-100">
                                        <i className="fas fa-key me-2"></i>
                                        Changer le mot de passe
                                    </button>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-info w-100">
                                        <i className="fas fa-history me-2"></i>
                                        Historique des voyages
                                    </button>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <button className="btn btn-success w-100">
                                        <i className="fas fa-heart me-2"></i>
                                        Mes favoris
                                    </button>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <button 
                                        className="btn btn-danger w-100"
                                        onClick={handleLogout}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Se déconnecter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccParam;