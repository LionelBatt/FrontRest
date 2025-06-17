import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ResetPwd = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!email) {
            setError('Veuillez saisir votre adresse email');
            return;
        }

        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Veuillez saisir une adresse email valide');
            return;
        }

        setIsLoading(true);

        try {
            // Ici vous pouvez ajouter l'appel API pour envoyer le code de réinitialisation
            // Pour l'instant, on simule l'envoi
            setTimeout(() => {
                setIsLoading(false);
                navigate('/verification', { state: { email } });
            }, 1000);
        } catch (err) {
            setError('Erreur lors de l\'envoi du code de vérification');
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card shadow" style={{ maxWidth: "500px", width: "100%" }}>
                    <div className="card-body p-5">
                        <h2 className="card-title text-center mb-4">Retrouver votre compte</h2>
                        <p className="text-center text-muted mb-4">
                            Nous vous enverrons un code par email pour confirmer votre identité.
                        </p>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Adresse email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Entrez votre adresse email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <small className="form-text text-muted mt-2">
                                    Un code de vérification sera envoyé à cette adresse
                                </small>
                            </div>

                            <div className="d-grid">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        'Envoyer le code'
                                    )}
                                </button>
                            </div>

                            <div className="text-center mt-3">
                                <button 
                                    type="button"
                                    className="btn btn-link"
                                    onClick={() => navigate('/login')}
                                >
                                    Retour à la connexion
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPwd;