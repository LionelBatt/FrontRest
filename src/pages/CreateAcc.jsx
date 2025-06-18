

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/glassmorphism.css';

const CreateAcc = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        name: '',
        surname: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

        try {
            const response = await fetch('http://13.39.150.189:8080/travel/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess('Compte créé avec succès! Redirection vers la page de connexion...');
                setTimeout(() => {
                    navigate('/login', { state: { username: formData.username } });
                }, 2000);
            } else {
                const errorData = await response.json();
                if (errorData.data && typeof errorData.data === 'string') {
                    setError(errorData.data);
                } else {
                    setError(errorData.message || errorData.error || 'Erreur lors de la création du compte');
                }
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            console.error('Erreur:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow">
                            <div className="row g-0">
                                {/* Image Column */}
                                <div className="col-md-4">
                                    <img 
                                        src="/assets/images/pexels-lkloeppel-466685.jpg" 
                                        className="img-fluid rounded-start h-100" 
                                        alt="Travel"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                
                                {/* Form Column */}
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h1 className="card-title h3 mb-3">Création du compte</h1>
                                        <p className="card-text text-muted mb-4">
                                            Veuillez saisir vos informations personnelles pour créer votre compte.
                                        </p>
                                        
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        
                                        {success && (
                                            <div className="alert alert-success" role="alert">
                                                {success}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit}>
                                            {/* Première ligne: Username + Password */}
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Nom d'utilisateur"
                                                        value={formData.username}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                                    <input 
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Mot de passe"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Deuxième ligne: Nom + Prénom */}
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="name" className="form-label">Nom</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        name="name"
                                                        placeholder="Votre nom"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="surname" className="form-label">Prénom</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        id="surname"
                                                        name="surname"
                                                        placeholder="Votre prénom"
                                                        value={formData.surname}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Troisième ligne: Email + Téléphone */}
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input 
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        placeholder="votre@email.com"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="phoneNumber" className="form-label">Téléphone</label>
                                                    <input 
                                                        type="tel"
                                                        className="form-control"
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        placeholder="+33612345678"
                                                        value={formData.phoneNumber}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Quatrième ligne: Adresse (pleine largeur) */}
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Adresse complète</label>
                                                <textarea 
                                                    className="form-control"
                                                    id="address"
                                                    name="address"
                                                    rows="2"
                                                    placeholder="Votre adresse complète"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Bouton de soumission */}
                                            <div className="d-grid">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary btn-lg"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Création en cours...
                                                        </>
                                                    ) : (
                                                        'Créer le compte'
                                                    )}
                                                </button>
                                            </div>

                                            {/* Lien vers la connexion */}
                                            <div className="text-center mt-3">
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        Vous avez déjà un compte ? 
                                                        <button 
                                                            type="button"
                                                            className="btn btn-link p-0 ms-1"
                                                            onClick={() => navigate('/login')}
                                                        >
                                                            Se connecter
                                                        </button>
                                                    </small>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAcc;