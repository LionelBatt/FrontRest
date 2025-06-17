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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        const updatedProfile = {
            ...userProfile,
            ...formData
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
                                <button className="btn glass-btn-white glass-border-radius-lg">
                                    <i className="fas fa-envelope me-2"></i>
                                    Message
                                </button>
                            </div>
                        </div>

                        {/* Card liens sociaux */}
                        <div className="glass-card-white-bg p-4">
                            <div className="d-flex align-items-center mb-3">
                                <i className="fas fa-globe text-primary me-3"></i>
                                <div>
                                    <h6 className="glass-text-dark mb-0">Website</h6>
                                    <a href="https://agencevoyage.com" className="glass-link small">
                                        https://agencevoyage.com
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <i className="fab fa-github text-primary me-3"></i>
                                <div>
                                    <h6 className="glass-text-dark mb-0">Github</h6>
                                    <span className="glass-text-muted small">@{userProfile?.username || 'johndoe'}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <i className="fab fa-twitter text-primary me-3"></i>
                                <div>
                                    <h6 className="glass-text-dark mb-0">Twitter</h6>
                                    <span className="glass-text-muted small">@{userProfile?.username || 'johndoe'}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="fab fa-instagram text-primary me-3"></i>
                                <div>
                                    <h6 className="glass-text-dark mb-0">Instagram</h6>
                                    <span className="glass-text-muted small">@{userProfile?.username || 'johndoe'}</span>
                                </div>
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
                                    <button className="btn glass-btn-warning glass-border-radius">
                                        <i className="fas fa-edit me-2"></i>
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fas fa-credit-card fa-3x text-muted mb-3"></i>
                                    <p className="glass-text-muted">Aucune carte de paiement enregistrée</p>
                                    <button className="btn glass-btn-primary-white glass-border-radius-lg">
                                        <i className="fas fa-plus me-2"></i>
                                        Ajouter une carte
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Card actions rapides */}
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="glass-card-white-bg p-4 text-center">
                                    <i className="fas fa-key fa-2x text-warning mb-3"></i>
                                    <h6 className="glass-text-dark mb-2">Sécurité</h6>
                                    <p className="glass-text-muted small mb-3">Changer votre mot de passe</p>
                                    <button className="btn glass-btn-warning glass-border-radius w-100">
                                        Modifier
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="glass-card-white-bg p-4 text-center">
                                    <i className="fas fa-history fa-2x text-info mb-3"></i>
                                    <h6 className="glass-text-dark mb-2">Historique</h6>
                                    <p className="glass-text-muted small mb-3">Vos voyages passés</p>
                                    <button 
                                        className="btn glass-btn-danger glass-border-radius w-100"
                                        onClick={handleLogout}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Déconnexion
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
