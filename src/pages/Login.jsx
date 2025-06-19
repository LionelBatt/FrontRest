import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartService from '../services/CartService';


const Login = () => {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.username) {
            setInputs(prev => ({
                ...prev,
                login: location.state.username || ''
            }));
        }

        const cleanup = setTimeout(() => {
            sessionStorage.removeItem('pendingCart');
            sessionStorage.removeItem('redirectAfterLogin');
        }, 10 * 60 * 1000);

        return () => clearTimeout(cleanup);
    }, [location.state]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        console.log(inputs);

        try {
            const response = await fetch("http://13.38.218.50:8080/travel/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputs.login,
                    password: inputs.pwd
                })
            });

            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem("token", data.data);
                console.log("Connexion réussie :", data);
                window.dispatchEvent(new Event('loginStatusChanged'));
                
                const pendingCart = sessionStorage.getItem('pendingCart');
                const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
                
                if (pendingCart) {
                    const cartData = JSON.parse(pendingCart);
                    CartService.saveCart(cartData);
                    
                    sessionStorage.removeItem('pendingCart');
                    sessionStorage.removeItem('redirectAfterLogin');
                    navigate('/cart', { state: { cartData } });
                } else if (redirectAfterLogin) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    navigate(redirectAfterLogin);
                } else if (location.state?.redirectTo) {
                    navigate(location.state.redirectTo);
                } else {
                    navigate('/');
                }
            } else {
                if (data.data && typeof data.data === 'string') {
                    setError(data.data);
                } else {
                    setError(data.message || data.error || 'Erreur de connexion');
                }
            }
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            setError('Erreur de connexion au serveur');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="border rounded p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center mb-4">Identifiez-vous</h2>

                    {/* Message d'information si redirection depuis panier */}
                    {location.state?.message && (
                        <div className="alert alert-info" role="alert">
                            <i className="fas fa-info-circle me-2"></i>
                            {location.state.message}
                        </div>
                    )}

                    {/* Message de panier en attente */}
                    {sessionStorage.getItem('pendingCart') && (
                        <div className="alert alert-warning" role="alert">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Vous avez un voyage en attente d'ajout au panier. Connectez-vous pour continuer.
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">Login:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="login"
                                placeholder="Enter login"
                                name="login"
                                value={inputs.login || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="pwd"
                                placeholder="Enter password"
                                name="pwd"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3 text-end">
                            <Link to="/resetpwd">Mot de passe oublié ?</Link>
                        </div>

                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="remember"
                                id="remember"
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="remember">
                                Remember me
                            </label>
                        </div>

                        <div className="d-grid mb-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Connexion...
                                    </>
                                ) : (
                                    'Connexion'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <Link to="/signup">Pas de compte ? Inscrivez-vous</Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;