import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Authenfication = () => {
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
            const response = await fetch("http://13.39.150.189:8080/travel/auth/signin", {
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
            
            if (data.success && data.admin) {
                localStorage.setItem("token", data.data);
                console.log("Connexion réussie :", data);
                window.dispatchEvent(new Event('loginStatusChanged'));
                navigate('/admin/crudT');
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
                </div>
            </div>
        </>
    )
}


export default Authenfication;