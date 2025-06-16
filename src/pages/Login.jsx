import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        fetch("http://localhost:8080/travel/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: inputs.login,
                password: inputs.pwd
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Stockage du token
                    localStorage.setItem("token", data.data);

                    console.log("Connexion réussie :", data);
                } else {
                    alert("Erreur de connexion : " + data.message || data.error);
                }
            })
            .catch(err => console.error("Erreur lors de la connexion :", err));

        // Envoyer les info user vers la page Home
        navigate(`/`);
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="border rounded p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center mb-4">Identifiez-vous</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">Login:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="login"
                                placeholder="Enter login"
                                name="login"
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
                            <button type="submit" className="btn btn-primary">Connexion</button>
                        </div>
                    </form>

                    <div className="text-center">
                        <Link to="/createacc">Pas de compte ? Inscrivez-vous</Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;